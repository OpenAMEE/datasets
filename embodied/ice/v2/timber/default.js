energy = energyPerMass * mass;

try {
  var m = massCO2PerMass;
  co2Emissions = massCO2PerMass * mass;
} catch(error) {
  co2Emissions = 0;
  returnValues.addNote('comment', 'CO2 emissions are not explicitly defined for this item');
}

try {
  var m = massCO2ePerMass;
  co2eEmissions = massCO2ePerMass * mass;
} catch(error) {
  co2eEmissions = 0;
  returnValues.addNote('comment', 'CO2e emissions are not explicitly defined for this item');
}

try {
  var m = massBioCO2PerMass;
  biogenicCO2Emissions = massBioCO2PerMass * mass;
} catch(error) {
  biogenicCO2Emissions = 0;
  returnValues.addNote('comment', 'Biogenic CO2 emissions are not explicitly defined for this item');
}

returnValues.putValue('energy', 'MJ',null, energy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2');
