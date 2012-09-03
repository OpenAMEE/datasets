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
elecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(elecValue==null){//try ISO code
  elecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

gasValue = dataFinder.getDataItemValue('home/energy/quantity', 'type=gas', 'kgCO2PerKWh');

if(numberOfPeople=="UKAverage (2.4)")
	numberOfPeople=2.28; //Despite label, occupancy in UK is 2.28

sanFuel = sanitiseString(fuel);
result=0.;
if(sanFuel == "mixed")
	result=gasValue*(240.33+numberOfPeople*48.389)
	+elecValue*(140.09+numberOfPeople*28.21);
else if(sanFuel == "gas")
	result=gasValue*(445.08+numberOfPeople*89.613);
else if(sanFuel == "gashobonly")
	result=gasValue*(240.33+numberOfPeople*48.389);
else if(sanFuel == "electric")
	result=elecValue*(334.35+numberOfPeople*67.3);
else if(sanFuel == "electrichobonly")
	result=elecValue*(194.26+numberOfPeople*39.1);
result;
//original algorithm was just this line: kgCO2PerYear / 12;