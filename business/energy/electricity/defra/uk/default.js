try {
  var C = massCO2PerEnergy;
  co2Emissions = massCO2PerEnergy.multiply(energyConsumed).integrate();
} catch(error) {
  co2Emissions = 0;
  returnValues.addNote('comment', 'Differentiated CO2 emissions are not available for this item');
}

try {
  var c = massCH4PerEnergy;
  ch4Emissions = massCH4PerEnergy.multiply(energyConsumed).integrate();
  comment = returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
} catch(error) {
  ch4Emissions = 0;
  returnValues.addNote('comment', 'Differentiated CH4 emissions are not available for this item');
}

try {
  var n = massN2OPerEnergy;
  n2oEmissions = massN2OPerEnergy.multiply(energyConsumed).integrate();
} catch(error) {
  n2oEmissions = 0;
  returnValues.addNote('comment', 'Differentiated N2O emissions are not available for this item');
}

totalCO2eEmissions = massCO2ePerEnergy.multiply(energyConsumed).integrate();

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalCO2e', 'kg',null, totalCO2eEmissions);
returnValues.setDefaultType('totalCO2e');
