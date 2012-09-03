//Get the fuel factor, kgCO2 per litre
kgCO2PerLitre=0.;

if(fuelType=='diesel'){
  kgCO2PerLitre = dataFinder.getDataItemValue('home/energy/quantity','type=diesel', 'kgCO2PerLitre');
} else {//either regular gas or premium gas
  kgCO2PerLitre = dataFinder.getDataItemValue('home/energy/quantity', 'type=petrol', 'kgCO2PerLitre');
}

kgCO2PerUSGallon=kgCO2PerLitre*3.785;

// now calculate the kgCO2 emissions
mpg=0.0;

if(drivingType=='own'){
    mpg=ownFuelConsumption/0.425143707;
} else if(drivingType=='city'){
    mpg=mpgCity; 
} else if(drivingType=='highway'){
    mpg=mpgHighway;
}
else if(drivingType=='combined'){
    mpg=mpgCombined;
}

co2Emissions = kgCO2PerUSGallon * distance /(mpg * 1.609344);

returnValues.putValue('CO2', 'kg',null, co2Emissions);
