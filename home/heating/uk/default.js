function getSpacekgCO2(eff) {	
	var kWh;
        if (fuel.equals("electricity") && heatingType.indexOf("room heaters") >= 0) {
		if(age.indexOf("pre")>=0) {
			wallOption='solidWallSpaceEnergy';
		} else if(age.indexOf("post")>=0) {
			wallOption='insulatedCavityWallSpaceEnergy';
		} else {
			wallOption='cavityWallSpaceEnergy';
		}
		kWh =dataFinder.getDataItemValue('home/heating/uk', 'homeType='+homeType+',fuel=gas', wallOption);
	}
	else {
		if(age.indexOf("pre")>=0) {
			kWh=solidWallSpaceEnergy;
		} else if(age.indexOf("post")>=0) {
			kWh=insulatedCavityWallSpaceEnergy;
		} else {
			kWh=cavityWallSpaceEnergy;
		}
	}
	ef=getEmissionFactor(false);
        sf=getScaleFactor("space");
	return sf*ef*kWh/eff;
}

function getWaterkgCO2(eff) {
	var kWh;
	if (fuel.equals("electricity") || (heatingType.indexOf("room heaters") < 0 && !heatingType.equals("open fires") && !heatingType.equals("stove"))) {
		if (fuel.equals("electricity")){
			profileFinder.setProfileItemValue('isWaterHeatingElectric','true');
		} else {
			profileFinder.setProfileItemValue('isWaterHeatingElectric','false');
		}

		if(age.indexOf("pre")>=0) {
			kWh=solidWallWaterEnergy;
		} else if(age.indexOf("post")>=0) {
			kWh=insulatedCavityWallWaterEnergy;
		} else {
			kWh=cavityWallWaterEnergy;
		}
		ef=getEmissionFactor(false);
	} else {
profileFinder.setProfileItemValue('isWaterHeatingElectric','true');

		if(age.indexOf("pre")>=0) {
			wallOption='solidWallWaterEnergy';
		} else if(age.indexOf("post")>=0) {
			wallOption='insulatedCavityWallWaterEnergy';
		} else {
			wallOption='cavityWallWaterEnergy';
		}
		kWh =dataFinder.getDataItemValue('home/heating/uk', 'homeType='+homeType+',fuel=electricity', wallOption);
		ef=getEmissionFactor(true);
		eff=1.; //elec is 100% efficient!
	}
        sf=getScaleFactor("water");
        waterEmissionFactor=ef;
	return sf*ef*kWh/eff;
}

function getEmissionFactor(forceElec){
	factor=-1;
	if(forceElec || fuel=="electricity"){
		factor=dataFinder.getDataItemValue('home/energy/electricity', 'country=United Kingdom', 'kgCO2PerKWh');		
	} else {
		factor=dataFinder.getDataItemValue('home/energy/quantity', 'type='+fuel, 'kgCO2PerKWh');
	}
	return factor;
}

function getScaleFactor(spaceOrWater) {
	if(spaceOrWater=="space" && numberOfBedrooms==baseNumberOfBedrooms){
		return 1.;
	}
	
	toTFA = dataFinder.getDataItemValue('home/heating/uk/floorareas', 'homeType='+homeType+',numberOfBedrooms='+numberOfBedrooms, 'floorArea');
	
	if(toTFA==null){
		return -1.;
	}

	fromTFA = dataFinder.getDataItemValue('home/heating/uk/floorareas', 'homeType='+homeType+',numberOfBedrooms='+baseNumberOfBedrooms, 'floorArea');
	
	if(spaceOrWater=="water"){
		fromOccupancy=getOccupancy(fromTFA);
		toOccupancy = profileFinder.getProfileItemValue('metadata', 'peopleInHousehold');
		if ((toOccupancy == null) || (toOccupancy == '')) {
			toOccupancy = getOccupancy(toTFA);
		}
		return getWaterFactor(toOccupancy)/getWaterFactor(fromOccupancy);
	} else {
		return toTFA / fromTFA;
	}
}

function getOccupancy(tfa){
	return 0.0365 * tfa - 0.00004145 * tfa * tfa;
}

function getWaterFactor(occupancy) {
	return 168. + 52. * occupancy;
}

function applySpaceInsulationSavings(baseCO2){
	spaceSaveFac=1.;
//if hasLoftInsulation=true add "loft" else add "subtractLoft100mm"
	if(hasLoftInsulation=="true")
		spaceSaveFac*=(1-loft);
	else
		spaceSaveFac*=(1-subtractLoft100mm);

//deal with solid and cavity walls, watching for pre1995 and post1995 cases
	if(hasSolidWallInsulation=="true" && age.indexOf("pre")>=0){
		spaceSaveFac*=(1-solidWall);
	} else {//deal with cavity wall, but watch post 1995 case
		if(hasCavityWallInsulation=="true"){
			if(age.indexOf("post")<0)//don't apply to post1995 as already assumed
				spaceSaveFac*=(1-cavityWall);
		} 
/* NOTE TO BE USED else if(age.indexOf("post")>=0) //subtract if post1995 doesn't have it
			spaceSaveFac*=(1-subtractCavityWall); */
	}

	if(hasUnderFloorInsulation=="true")
		spaceSaveFac*=(1-underFloor);
//if hasDoubleGlazing=false add "subtractDoubleGlazing" else 0.
	if(hasDoubleGlazing=="false")
		spaceSaveFac*=(1-subtractDoubleGlazing);

	if(hasDraftExclusion=="true")
		spaceSaveFac*=(1-draftExclusion);
	
	return spaceSaveFac*baseCO2;
}

function applySpaceRenewablesSavings(baseCO2){
	spaceSaveFac=1.;
	if(fuel=="biomass" && hasGroundSourceHeatPump=="true" && hasAirSourceHeatPump=="true"){
		if(groundSourceHeatPump<airSourceHeatPump)
			spaceSaveFac=(1-groundSourceHeatPump);
		else
			spaceSaveFac=(1-airSourceHeatPump);
	} else {//usual case
		if(hasGroundSourceHeatPump=="true")
			spaceSaveFac*=(1-groundSourceHeatPump);
	
		if(hasAirSourceHeatPump=="true")
			spaceSaveFac*=(1-airSourceHeatPump);
	}
	return spaceSaveFac*baseCO2;
}

function applyWaterRenewablesSavings(baseCO2){
	baseCO2=applySpaceRenewablesSavings(baseCO2);
	if(hasSolarHotWater=="true")
		baseCO2-= solarHotWaterEnergySaved*waterEmissionFactor;
	return baseCO2;
}

function doElectricityRenewables(){
	energySaved=0;
	if(hasPhotovoltaic=="true"){
		kWh =dataFinder.getDataItemValue('home/heating/uk/renewable', 'type=photovoltaic solar panels', 'energyGenerated');
		energySaved -= kWh*getEmissionFactor(true);		
	} else if(hasHydro=="true"){
		kWh =dataFinder.getDataItemValue('home/heating/uk/renewables', 'type=hydro', 'energyGenerated');
		energySaved -= kWh*getEmissionFactor(true);
	}
	//Note this will be kWh saved per year and will be negative.
	profileFinder.setProfileItemValue('renewableElectricitySavedCO2',energySaved);
}

if(numberOfBedrooms=="more than 5"){
	numberOfBedrooms="6";
} else if(numberOfBedrooms=="0"){
	numberOfBedrooms="1";
} 

if(fuel=="biomass"){
	profileFinder.setProfileItemValue('hasBiomass',"true");
}

try{
  efficiency = dataFinder.getDataItemValue('home/heating/uk/heatingTypes', 'fuel='+fuel+',heatingType='+heatingType, 'efficiency');
}
catch(error){
  efficiency = 0;
}
if(efficiency>0){
waterEmissionFactor=0.;//gets set in getWaterkgCO2
spaceCO2=getSpacekgCO2(efficiency);
waterCO2=getWaterkgCO2(efficiency);

profileFinder.setProfileItemValue('comment',spaceCO2+","+waterCO2+","+waterEmissionFactor);


if(hasNoInsulation=="false") {
	spaceCO2=applySpaceInsulationSavings(spaceCO2);
	//insulation savings don't affect water
}

if(hasNoRenewables=="false"){
	spaceCO2=applySpaceRenewablesSavings(spaceCO2);
	waterCO2=applyWaterRenewablesSavings(waterCO2);
        doElectricityRenewables();	
}

profileFinder.setProfileItemValue('spaceHeatingCO2',Math.round(spaceCO2));
profileFinder.setProfileItemValue('waterHeatingCO2',Math.round(waterCO2));

Math.round(spaceCO2+waterCO2)
}
else{
  profileFinder.setProfileItemValue('comment',"Invalid heating type");
  efficiency
}