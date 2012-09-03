
co2Emissions = massCO2PerMass * mass;
ch4Emissions = massCH4PerMass * mass;
n2oEmissions = massN2OPerMass * mass;
directCO2eEmissions = massDirectCO2ePerMass * mass;
indirectCO2eEmissions = massIndirectCO2ePerMass * mass;
lifeCycleCO2eEmissions = massTotalCO2ePerMass * mass;

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalDirectCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('totalDirectCO2e');

returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
