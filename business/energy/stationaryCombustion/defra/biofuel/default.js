
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
} catch(err) {
  volume = null;
}

if (mass) {
  directCO2eEmissions = mass * massDirectCO2ePerMass;
  indirectCO2eEmissions = mass * massIndirectCO2ePerMass;  
  lifeCycleCO2eEmissions = mass * massTotalCO2ePerMass;
  biogenicCO2Emissions = mass * massBiogenicCO2ePerMass; 
  returnValues.addNote('comment', 'Calculation made on the basis of mass');
} else if (volume) {
  directCO2eEmissions = volume * massDirectCO2ePerVolume;
  indirectCO2eEmissions = volume * massIndirectCO2ePerVolume;  
  lifeCycleCO2eEmissions = volume * massTotalCO2ePerVolume;
  biogenicCO2Emissions = volume * massBiogenicCO2ePerVolume; 
  returnValues.addNote('comment', 'Calculation made on the basis of volume');
} else if (energy) {
  directCO2eEmissions = energy * massDirectCO2ePerEnergy;
  indirectCO2eEmissions = energy * massIndirectCO2ePerEnergy;  
  lifeCycleCO2eEmissions = energy * massTotalCO2ePerEnergy;
  biogenicCO2Emissions = energy * massBiogenicCO2ePerEnergy; 
  returnValues.addNote('comment', 'Calculation made on the basis of energy');
} else {
  directCO2eEmissions = 0;
  indirectCO2eEmissions = 0;  
  lifeCycleCO2eEmissions = 0;
  biogenicCO2Emissions = 0; 
  returnValues.addNote('comment', 'No mass, energy or volume quantity specified');
}

returnValues.putValue('directCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
returnValues.setDefaultType('directCO2e');
