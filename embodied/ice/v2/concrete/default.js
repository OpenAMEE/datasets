// initialize variables to hold the additional emissions 
// factor values for reinforcing steel and precasting
var supplementaryEnergyFactor = 0;
var supplementaryCO2Factor = 0;

// establish if reinforcing steel specified and adjust
// supplementary factors accordingly
try {
  var s = steelDensity;
  supplementaryEnergyFactor += (steelDensity * energyPerMassPerSteelDensity);
  supplementaryCO2Factor += (steelDensity * massPerMassPerSteelDensity);
} catch(error) {
  // do nothing
}

// establish if precasting specified and adjust
// supplementary factors accordingly
if (isPrecast == 'true') {
  supplementaryEnergyFactor += energyPerMassPrecast;
  supplementaryCO2Factor += massPerMassPrecast;
}

// calculate energy and emissions

energy = (energyPerMass + supplementaryEnergyFactor) * mass;
co2Emissions = (massCO2PerMass + supplementaryCO2Factor) * mass;

try {
  var m = massCO2ePerMass;
  co2eEmissions = (massCO2ePerMass + supplementaryCO2Factor) * mass;
} catch(error) {
  co2eEmissions = 0;
  returnValues.addNote('comment', 'CO2e emissions are not explicitly defined for this item');
}

returnValues.putValue('energy', 'MJ',null, energy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2');
