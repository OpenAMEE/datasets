
co2Emissions = massCO2PerEnergy * energy;
ch4Emissions = massCH4PerEnergy * energy;
n2oEmissions = massN2OPerEnergy * energy;
directCO2eEmissions = massDirectCO2ePerEnergy * energy;
indirectCO2eEmissions = massIndirectCO2ePerEnergy * energy;
lifeCycleCO2eEmissions = massTotalCO2ePerEnergy * energy;

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalDirectCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('totalDirectCO2e');

returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
