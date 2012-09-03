// establish which profile item values set
try{
  var fC = fuelConsumed;
 } catch(error) {
  fuelConsumed = null;
}

try {
  var d = distance;
} catch(error) {
  distance = null;
  returnValues.addNote('comment', 'Distance not specified. Cannot calculate CH4 and N2O emissions');
}

try{
  var fE = fuelEfficiency;
 } catch(error) {
  fuelEfficiency = null;
}

// check if driving style parameters total to 1
var drivingParameters = urbanCold + urbanhot + highway + rural;
if (drivingParameters != 1) {
  returnValues.addNote('comment', 'Driving style parameters do not total 1. Cannot calculate CH4 and N2O emissions');
}

// ############### CO2 EMISSIONS ##################
// translate fuel to name used in lookup category
var ipccSynonym;
var defraSynonym;
if (fuel == "gasoline") {
  ipccSynonym = "motor gasoline";
  defraSynonym = "petrol";
} else if(fuel == "diesel") {
  ipccSynonym = "gas/diesel oil";
  defraSynonym = "diesel";
} else if(fuel == "lpg") {
  ipccSynonym = "liquefied petroleum gases";
  defraSynonym = "lpg";  
} else if(fuel == "cng") {
  ipccSynonym = "compressed natural gas";
  defraSynonym = "cng";
}         

// get fuel property data
var massCO2PerEnergy = dataFinder.getDataItemValue('transport/ipcc/fuel','fuel='+ipccSynonym,'massCO2PerEnergy');
var energyPerMass = dataFinder.getDataItemValue('transport/ipcc/fuel','fuel='+ipccSynonym,'netEnergyPerMass');
try { // if density specified, convert to litres per tonne
  var d = density; 
} catch(error) { // if no density specified, use DEFRA data
  var volumePerMass = dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/fuelproperties','fuel='+defraSynonym,'volumePerMass');
  density = 1000 / volumePerMass; // convert DEFRA litres-per-tonne into kg per L
}
// establish volumetric emissions factor for CO2 using fuel properties
var CO2VolumeFactor = (massCO2PerEnergy * energyPerMass / 1000000) * density; // 1000000 factor is conversion from per Gg to per kg
// calculate
if (fuelConsumed == null) {
  if (distance == null || fuelEfficiency == null){ //CO2 only, fuel-based calcualtion
    co2Emissions = 0;
    returnValues.addNote('comment', 'Cannot calculate CO2 emissions. Either fuel consumed OR distance AND fuel efficiency must be specified');
  } else { 
    co2Emissions = (distance * (CO2VolumeFactor / fuelEfficiency))/occupancy;
  }
} else {
  co2Emissions = (CO2VolumeFactor * fuelConsumed)/occupancy;
}


// ############### N2O EMISSIONS ##################

// establish N2O emissions factor
var n2oDistanceFactor;
try {
  if (distance == null) {
    throw "error";
  }
  var n2oUrbanCold = massN2OPerDistanceUrbanCold*urbanCold;
  var n2oUrbanHot = massN2OPerDistanceUrbanHot*urbanhot;
  var n2oHighway = massN2OPerDistanceHighway*highway;
  var n2oRural = massN2OPerDistanceRural*rural;
  n2oDistanceFactor = (n2oUrbanCold +n2oUrbanHot + n2oHighway + n2oRural)/1000000;
  n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O
  returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
} catch(error) { // if no data (i.e. cng buses and trucks) set to zero
  n2oDistanceFactor = 0;
  n2oGWP = 0;
}

if(distance == null){ //CO2 only, fuel-based calculation
  n2oEmissions = 0;
} else if (drivingParameters != 1) {
  n2oEmissions = 0;
} else {
  n2oEmissions = distance * n2oDistanceFactor / occupancy;
}

// ############### CH4 EMISSIONS ##################
// establish CH4 emissions factor
var ch4DistanceFactor;
try {
  if (distance == null) {
    throw "error";
  }
  var ch4UrbanCold = massCH4PerDistanceUrbanCold*urbanCold;
  var ch4UrbanHot = massCH4PerDistanceUrbanHot*urbanhot;
  var ch4Highway = massCH4PerDistanceHighway*highway;
  var ch4Rural = massCH4PerDistanceRural*rural;
  ch4DistanceFactor = (ch4UrbanCold +ch4UrbanHot + ch4Highway + ch4Rural)/1000000;
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for CH4
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} catch(error) { // if no data (i.e. cng buses and trucks) set to zero
  ch4DistanceFactor = 0;
  ch4GWP = 0;
}

if(distance == null){ //CO2 only, fuel-based calculation
  ch4Emissions = 0;
} else if (drivingParameters != 1) {
  ch4Emissions = 0;
} else {
  ch4Emissions = distance * ch4DistanceFactor / occupancy;
}


// ############### Return values ##################

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
