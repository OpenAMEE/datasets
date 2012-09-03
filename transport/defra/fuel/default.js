try {
  var v = volume;
} catch(error) {
  try {
    var m = mass;
    var density = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/fuelproperties','fuel='+fuel,'volumePerMass'));
    volume = (mass / 1000.0) * density;
  } catch(error) {
    volume = 0;
  } 
}

co2Emissions = massCO2PerVolume * volume;
ch4Emissions = massCH4PerVolume * volume;
n2oEmissions = massN2OPerVolume * volume;
directCO2eEmissions = massDirectCO2ePerVolume * volume;
indirectCO2eEmissions = massIndirectCO2ePerVolume * volume;
lifeCycleCO2eEmissions = massTotalCO2ePerVolume * volume;

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalDirectCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('totalDirectCO2e');

returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
