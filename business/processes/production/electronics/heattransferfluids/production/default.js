gwp =  parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=C6F14','GWP'));
returnValues.addNote('comment', 'C6F14 emissions converted to CO2e using a global warming potential of '+gwp);

c6f14Emissions = massC6F14PerArea * capacity * fractionCapacityUtilised;
co2eEmissions = c6f14Emissions * gwp;

returnValues.putValue('C6F14', 'kg', null, c6f14Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
