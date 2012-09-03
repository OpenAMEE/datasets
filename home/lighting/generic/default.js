// get country from metadata
try {
  var c = country
} catch(error) {
  try {
    country =  profileFinder.getProfileItemValue('metadata', 'country');
  } catch(error) {
    country = null;
  }
}

if (country == null) {
  country = location
}

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

number * energyPerTime * countryElecValue;