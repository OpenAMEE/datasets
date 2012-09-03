//if numberOfPeople isn't set, get peopleInHousehold from metadata
try { 
  var c=numberOfPeople;
}
catch(err){
  numberOfPeople=profileFinder.getProfileItemValue('metadata', 'peopleInHousehold') || 1;
}

// get country from metadata
country = profileFinder.getProfileItemValue('metadata', 'country');
if ((country == null) || (country == '')) {
	country = 'United States';
}

// get gas factor
gasValue = dataFinder.getDataItemValue('home/energy/quantity', 'type=gas', 'kgCO2PerKWh');

// get electricity factor
elecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(elecValue==null){//try ISO code
  elecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

// calc CO2 for gas, elec or mixed fuel

gas = gasValue * (gasBaseKWhPerYear + numberOfPeople * gasPerPersonKWhPerYear)
elec = elecValue * (elecBaseKWhPerYear + numberOfPeople * elecPerPersonKWhPerYear)

CO2 = gas + elec
