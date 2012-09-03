
energy = energyPerArea * area;

co2Emissions = massCO2PerArea * area;

try {
  var m = massCO2ePerArea;
  co2eEmissions = massCO2ePerArea * area;
} catch(error) {
  co2eEmissions = 0;
  returnValues.addNote('comment', 'CO2e emissions are not explicitly defined for this item');
}

returnValues.putValue('energy', 'MJ',null, energy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2');
