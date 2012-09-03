try {
  var h = heatConsumed;
} catch(error) {
  heatConsumed = 0;
}

try {
  var e = electricityConsumed;
} catch(error) {
  electricityConsumed = 0;
}

electricityEmissions = electricityConsumed * (2 * plantEmissions) / ((2 * electricityProduced) + heatProduced);
heatEmissions = heatConsumed * (plantEmissions / ((2 * electricityProduced) + heatProduced));
totalEmissions = electricityEmissions + heatEmissions;

returnValues.putValue('heatCO2e', 'kg',null, heatEmissions);
returnValues.putValue('electricityCO2e', 'kg',null, electricityEmissions);
returnValues.putValue('totalCO2e', 'kg',null, totalEmissions);
returnValues.setDefaultType('totalCO2e');
