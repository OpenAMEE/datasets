function sanitiseString(theString) {
  var noSpacesString = "";
  theString = '' + theString;
  splitString = theString.split(" ");
  for(i = 0; i < splitString.length; i++)
    noSpacesString += splitString[i];
  
  var finalString = noSpacesString.toLowerCase();
  return finalString;
}

// get country from metadata
country = profileFinder.getProfileItemValue('metadata', 'country');
if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

if (sanitiseString(type) == "lel" && noOfLowEnergyLightBulbs !=0) {
  (noOfLowEnergyLightBulbs * kWhPerYear * countryElecValue);
} else {
  (noOfLightBulbs * kWhPerYear * countryElecValue);
}