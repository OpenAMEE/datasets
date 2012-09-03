
co2Emissions = mass * massCO2PerMass * 1000;
ch4Emissions = mass * massCH4PerMass;

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP);

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
