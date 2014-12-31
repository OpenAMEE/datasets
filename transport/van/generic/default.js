//throws an error if country undeclared
try { 
  var c=country;
}
catch(err){
  country='';
}
// if car's country value isn't set, get country
// from metadata
if (country == ''){
  country = profileFinder.getProfileItemValue('metadata', 'country');
}

if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}

//Get the fuel factor, kgCO2 per litre
if(fuel=='diesel' || fuel=='diesel (by size class)'){
     fuelFac = dataFinder.getDataItemValue('home/energy/quantity', 'type=diesel', 'kgCO2PerLitre');
} else if(fuel=='lpg' || fuel=='cng'){
     fuelFac = dataFinder.getDataItemValue('home/energy/quantity', 'type=lpg', 'kgCO2PerLitre');
} else {
     fuelFac = dataFinder.getDataItemValue('home/energy/quantity', 'type=petrol', 'kgCO2PerLitre');
}
try {
     var f = fuelConsumed;
} catch(error) {
     fuelConsumed = null
}

// now calculate the kgCO2 emissions
if (fuelConsumed != null) {
     fuelConsumed * fuelFac;
} else {
     fac=0.;
     if(ownFuelConsumption!=null && ownFuelConsumption>0){
          fac=fuelFac/ownFuelConsumption;
     } else {
          if(fuelConsumption!=null && fuelConsumption>0){
               fac=1.15*fuelFac/fuelConsumption;
          } else if (country == 'United States' || country == 'Canada' || country == 'US' || country == 'CA') {
               fac = 1.15*kgCO2PerKmUS;
          } else {
               fac= kgCO2PerKm;
          }
     }
     var multiplier=1.;
     if(tyresUnderinflated=='true') {
          multiplier+=0.01;
     }
     if(airconFull=='true'){
          multiplier+=0.20;
     } else if(airconTypical=='false'){
          multiplier-=0.05;
     }
     if(ecoDriving=='true'){
          multiplier-=0.1;
     }
     //http://www.fueleconomy.gov/feg/maintain.shtml
     if(regularlyServiced=='false'){
          multiplier+=0.04;
     }
     fac*=multiplier;
     if(useTypicalDistance=='true') {
          distance=typicalDistance;
     }
     if(occupants>0) {
          fac * distance/occupants;
     } else {
          fac * distance;
     }
}
