// area or none
try {
  area=responsibleArea/totalArea
} catch(error) {
  area=1
}

// calculate individual emissions
co2Emissions = massCO2PerEnergy * area * energyPerTime;
ch4Emissions = massCH4PerEnergy / 1000 * area * energyPerTime;
n2oEmissions = massN2OPerEnergy / 1000 * area * energyPerTime;

// fetch GWPs
ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2oGWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');
co2eEmissions = co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP)

returnValues.putValue('CO2', 'kg','year', co2Emissions);
returnValues.putValue('CH4', 'kg','year', ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('N2O', 'kg','year', n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg','year', co2eEmissions);
returnValues.setDefaultType('CO2e'); 
