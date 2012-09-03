if(type=='electricity'){
  // get country from metadata
  country = profileFinder.getProfileItemValue('metadata', 'country');
  if ((country == null) || (country == '')) {
	country = 'United Kingdom';
  }
  // get electricity value based on country
  kgCO2PerKWh = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');
  if(kgCO2PerKWh==null){//try ISO code
    kgCO2PerKWh = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
  }
}

seasonFac=1.;
try {//see if season exists
  var s = season;
  if(type=='coal' || type=='coking coal' || type=='biomass') {
    fuel='solidFuel';
  }
  else if(type=='gas' || type=='lpg'){
    fuel='gas';
  }
  else if(type=='electricity'){
    fuel='electricity';
    if(includesHeating=='true'){
       fuel='electricityWithHeating';
    }
  }
  else {
    fuel='oil';
  }

  var fac = dataFinder.getDataItemValue('home/energy/uk/seasonal', 'name='+season+',energy='+fuel, 'percentage');

  if (fac != null) {
    seasonFac = 0.25 / fac;
  } else {
    seasonFac = 1.;
  }
  
}
catch(err){
  seasonFac=1.;
}


if(currentReading>0 || lastReading>0){
  if(currentReading>=0 && lastReading>=0) {
    ret=(currentReading-lastReading) * kgCO2PerKWh;
  }
  else {
    ret=0.;
  }
} else if (energyConsumption != 0) {
  ret=energyConsumption * kgCO2PerKWh;
} else if (volumePerTime != 0) {
  ret=volumePerTime * kgCO2PerLitre;
} else if (massPerTime != 0) {
  ret=massPerTime * kgCO2PerKg;
} else {
  ret=0;
}
ret*seasonFac;