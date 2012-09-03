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

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

//throws an error if country undeclared
try { 
  var d=energyConsumption;
}
catch(err){
  energyConsumption=1.15*kWhPerKm*distance;
}

kgCO2= countryElecValue*energyConsumption;

if(occupants>0)
    kgCO2/occupants;
else
    kgCO2;
