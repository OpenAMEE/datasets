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
}

// get fuel property data
var massCO2PerEnergy = dataFinder.getDataItemValue('transport/ipcc/fuel','fuel='+ipccSynonym,'massCO2PerEnergy'); // kg / TJ
var energyPerMass = dataFinder.getDataItemValue('transport/ipcc/fuel','fuel='+ipccSynonym,'netEnergyPerMass'); // TJ / Gg

try { // if density specified, convert to litres per tonne
  var d = density; //kg / L
} catch(error) { // if no density specified, use DEFRA data
  var volumePerMass = dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/fuelproperties','fuel='+defraSynonym,'volumePerMass'); // L / t
  density = 1000 / volumePerMass; // kg / L (this converts litres per tonne into kg per litre)
}

// establish volumetric emissions factor for CO2 using fuel properties
var CO2VolumeFactor = (massCO2PerEnergy * energyPerMass / 1000000) * density; // 1000000 factor is conversion from per Gg to per kg

// calculate
if (fuelConsumed == null) {
  if (distance == null || fuelEfficiency == null){ //CO2 only, fuel-based calcualtion
    returnValues.addNote('comment', 'Cannot calculate CO2 emissions. Either fuel consumed OR distance AND fuel efficiency must be specified');
  } else { 
    co2Emissions = (distance * (CO2VolumeFactor / fuelEfficiency)) / occupancy;
  }
} else {
  co2Emissions = (CO2VolumeFactor * fuelConsumed) / occupancy;
}


// ############### N2O EMISSIONS ##################

// convert mg to kg
var n2oDistanceFactor = massN2OPerDistance / 1000000.0;
var n2oStartFactor = massN2OPerStart / 1000000.0;

if(distance == null){ 
  n2oEmissions = 0;
  n2oGWP = 0;
} else {
  n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O
  returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
  n2oEmissions = ((distance * n2oDistanceFactor) + (n2oStartFactor * coldStarts)) / occupancy;
}


// ############### CH4 EMISSIONS ##################

// convert mg to kg
var ch4DistanceFactor = massCH4PerDistance / 1000000.0;
var ch4StartFactor = massCH4PerStart / 1000000.0;

if(distance == null){
  ch4Emissions = 0;
  ch4GWP = 0;
} else {
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for N2O
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
  ch4Emissions = ((distance * ch4DistanceFactor) + (ch4StartFactor * coldStarts)) / occupancy;
}


// ############### Return values ##################

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
