path='home/energy/electricity/realTimeElectricity/fuelEmissionFactors';

//get generated to supplied energy factors
name='generatedToSuppliedGrossFactor';
ccgtEFFac = dataFinder.getDataItemValue(path, 'fuel=CCGT', name);
ocgtEFFac = dataFinder.getDataItemValue(path, 'fuel=OCGT', name);
coalEFFac = dataFinder.getDataItemValue(path, 'fuel=Coal', name);
oilEFFac = dataFinder.getDataItemValue(path, 'fuel=Oil', name);
nuclearEFFac = dataFinder.getDataItemValue(path, 'fuel=Nuclear', name);
windEFFac = dataFinder.getDataItemValue(path, 'fuel=Wind', name);
pumpStorageEFFac = dataFinder.getDataItemValue(path, 'fuel=Pump Storage', name);
npshydEFFac = dataFinder.getDataItemValue(path, 'fuel=NPSHYD', name);
otherEFFac = dataFinder.getDataItemValue(path, 'fuel=Other', name);
intfrEFFac = dataFinder.getDataItemValue(path, 'fuel=INTFR', name);
intirlEFFac = dataFinder.getDataItemValue(path, 'fuel=INTIRL', name);

//total consumed energy, before losses
totalEnergyConsumed=0.;
totalEnergyConsumed+=ccgt*ccgtEFFac;
totalEnergyConsumed+=ocgt*ocgtEFFac;
totalEnergyConsumed+=coal*coalEFFac;
totalEnergyConsumed+=oil*oilEFFac;
totalEnergyConsumed+=nuclear*nuclearEFFac;
totalEnergyConsumed+=wind*windEFFac;
totalEnergyConsumed+=pumpStorage*pumpStorageEFFac;
totalEnergyConsumed+=npshyd*npshydEFFac;
totalEnergyConsumed+=other*otherEFFac;
totalEnergyConsumed+=intfr*intfrEFFac;
totalEnergyConsumed+=intirl*intirlEFFac;

//get fuel emission factors
name='kgCO2PerKWh';
ccgtEF = dataFinder.getDataItemValue(path, 'fuel=CCGT', name);
ocgtEF = dataFinder.getDataItemValue(path, 'fuel=OCGT', name);
coalEF = dataFinder.getDataItemValue(path, 'fuel=Coal', name);
oilEF = dataFinder.getDataItemValue(path, 'fuel=Oil', name);
nuclearEF = dataFinder.getDataItemValue(path, 'fuel=Nuclear', name);
windEF = dataFinder.getDataItemValue(path, 'fuel=Wind', name);
pumpStorageEF = dataFinder.getDataItemValue(path, 'fuel=Pump Storage', name);
npshydEF = dataFinder.getDataItemValue(path, 'fuel=NPSHYD', name);
otherEF = dataFinder.getDataItemValue(path, 'fuel=Other', name);
intfrEF = dataFinder.getDataItemValue('home/energy/electricity', 'country=France', name);
intirlEF = dataFinder.getDataItemValue('home/energy/electricity', 'country=Ireland', name);
intukEF = dataFinder.getDataItemValue('home/energy/electricity', 'country=United Kingdom', name);

//total kgCO2 for all generated power
totalkgCO2=0.;
totalkgCO2+=ccgt*ccgtEF;
totalkgCO2+=ocgt*ocgtEF;
totalkgCO2+=coal*coalEF;
totalkgCO2+=oil*oilEF;
totalkgCO2+=nuclear*nuclearEF;
totalkgCO2+=wind*windEF;
totalkgCO2+=pumpStorage*pumpStorageEF;
totalkgCO2+=npshyd*npshydEF;
totalkgCO2+=other*otherEF;
if(intfr>0){//import
  totalkgCO2+=intfr*intfrEF;
} else {//export - not sure if 5 min values are ever negative
  totalkgCO2+=intfr*intukEF;
}
if(intirl>0){//import
  totalkgCO2+=intirl*intirlEF;
} else {//export - not sure if 5 min values are ever negative
  totalkgCO2+=intirl*intukEF;
}

lossesFraction=0.07433; //in 2008 7.433% of generated power in the UK is lost in transmission, DUKES 2009
totalEnergyConsumed*=(1-lossesFraction);

kgCO2PerkWh=totalkgCO2/totalEnergyConsumed;

profileFinder.setProfileItemValue('massCO2PerEnergy',kgCO2PerkWh);

kgCO2PerkWh*energyUsed;

