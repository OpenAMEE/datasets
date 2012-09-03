var gwpCH4 = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); //global warming potential for CH4
var gwpN2O = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); //global warming potential for N2O

// establish if country specified
try { 
  var c=country;
}
catch(err){ // if not, define as blank string
  country='';
}

// if blank string, look in metadata for country
if (country == ''){
  country = profileFinder.getProfileItemValue('metadata', 'country');
} // if no country specified in metadata, assume UK
if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

// calculate per passenger energy from occupancy
var perVehicleEnergyUse = kWhPerSeatPerDistance * seatingCapacity;
var totalPassengers = seatingCapacity * (occupancy / 100);
var perPassengerEnergyUse = perVehicleEnergyUse / totalPassengers;

// calculate per passenger emissons factor
var perPassengerEmissionsFactor = perPassengerEnergyUse * countryElecValue;

// calculate emissions for journey
perPassengerEmissionsFactor * passengers * distance;
