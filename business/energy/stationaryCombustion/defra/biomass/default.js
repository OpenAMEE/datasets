var factor;

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

if (mass) {
  indirectCO2eEmissions = mass * massIndirectCO2ePerMass;
  biogenicCO2Emissions = mass * massBiogenicCO2ePerMass; 
} else if (energy) {
  indirectCO2eEmissions = energy * massIndirectCO2ePerEnergy;
  biogenicCO2Emissions = energy * massBiogenicCO2ePerEnergy; 
} else {
  indirectCO2eEmissions = 0;
  biogenicCO2Emissions = 0;
  returnValues.addNote('comment', 'No energy or mass quantity specified');
}

returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
returnValues.setDefaultType('indirectCO2e');
