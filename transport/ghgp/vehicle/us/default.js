// establish name fo fuel which is used in lookup categories
function getFuelSynonym(fuelType) {
  var fuelSynonym;
  if (fuelType == "diesel") {
    fuelSynonym = "on-road diesel fuel";
  } else if (fuelType == "gasoline") {
    fuelSynonym = "gasoline/petrol";
  } else if (fuelType == "ethanol") {
    fuelSynonym = "ethanol";
  } else if (fuelType == "lpg") {
    fuelSynonym = "lpg";
  } else if (fuelType == "lng") {
    fuelSynonym = "lng";
  }
  return fuelSynonym
}

// get CO2 fuel volume based emissions factor
function CO2ByFuelFactor() {
  if (fuel == "ethanol") {
    factor = 0;
    returnValues.addNote('comment', 'There are no fossil CO2 emissions associated with this item');
  } else {
    factor = parseFloat(dataFinder.getDataItemValue('transport/ghgp/fuel', 'fuel='+getFuelSynonym(fuel)+',region=us', 'massCO2PerVolume'));
  }
  return factor;
}

// get biogenic CO2 fuel volume based emissions factor
function biogenicCO2ByFuelFactor() {
  if (fuel != "ethanol") {
    factor = 0;
    returnValues.addNote('comment', 'There are no biogenic CO2 emissions associated with this item');
  } else {
    factor = parseFloat(dataFinder.getDataItemValue('transport/ghgp/fuel', 'fuel='+getFuelSynonym(fuel)+',region=us', 'massBiogenicCO2PerVolume'));
  }
 return factor;
} 

try {
  var d = distance;
} catch(error) {
  distance = null;
}

try {
  var v = volume;
} catch(error) {
  volume = null;
}



ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for CH4
n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O

if (distance && volume) {
  co2Emissions = CO2ByFuelFactor() * volume / occupancy;
  
  biogenicCO2Emissions = biogenicCO2ByFuelFactor() * volume / occupancy;

  ch4Emissions = (massCH4PerDistance / 1000) * distance / occupancy;

  n2oEmissions = (massN2OPerDistance / 1000) * distance / occupancy;
  
  co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
  
} else if (distance) {
  try {
    var m = massCO2PerDistance;
  } catch(error) {
    massCO2PerDistance = 0;
    returnValues.addNote('comment', 'There are no fossil CO2 emissions associated with this item');
  }
  try {
    var b = massBiogenicCO2PerDistance;
  } catch(error) {
    massBiogenicCO2PerDistance = 0;
    returnValues.addNote('comment', 'There are no biogenic CO2 emissions associated with this item');
  }
  
  co2Emissions = massCO2PerDistance * distance / occupancy;
  
  biogenicCO2Emissions = massBiogenicCO2PerDistance * distance / occupancy;

  ch4Emissions = (massCH4PerDistance / 1000) * distance / occupancy;

  n2oEmissions = (massN2OPerDistance / 1000) * distance / occupancy;
  
  co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
  
} else if (volume) {
  co2Emissions = CO2ByFuelFactor() * volume / occupancy;
  
  biogenicCO2Emissions = biogenicCO2ByFuelFactor() * volume / occupancy;

  ch4Emissions = (massCH4PerVolume / 1000) * volume / occupancy;

  n2oEmissions = (massN2OPerVolume / 1000) * volume / occupancy;
  
  co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
  
} else {
  0;
}

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
  
