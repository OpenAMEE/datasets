
try {
  var energy;
} catch(err) {
  energy = null;
}

try {
  var mass;
} catch(err) {
  mass = null;
}

try {
  var volume;
  var d = density; 
} catch(err) {
  volume = null;
}

if (volume) {
  co2Emissions = volume * massCO2PerEnergy * netEnergyPerMass * density; 
} else if (mass) {
  co2Emissions = mass * massCO2PerEnergy * netEnergyPerMass; 
} else if (energy) {
  co2Emissions = energy * massCO2PerEnergy; 
} else {
  0;
}

returnValues.putValue('CO2', 'kg',null, co2Emissions);
co2eEmissions =  co2Emissions;
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2');
