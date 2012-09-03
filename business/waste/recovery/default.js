ch4Emissions = collected*methaneContent*standardDensity*((1-collectionEfficiency)*(1-fractionUncollectedOxidising)/collectionEfficiency+(1-fractionCollectedBurned))

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
co2eEmissions =  ch4Emissions * ch4GWP;

returnValues.putValue('CH4', 'kg','year', ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg','year', co2eEmissions);
returnValues.setDefaultType('CO2e');
