ch4Emissions = massCH4PerMassProduct * productQuantity;

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'));
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
co2eEmissions = ch4Emissions * ch4GWP;

returnValues.putValue('CH4', 'kg', null, ch4Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
