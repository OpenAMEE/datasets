
sf6Emissions = mgQuantity * massSF6PerMassProduct;

sf6GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=SF6', 'GWP')

co2eEmissions = sf6Emissions * sf6GWP;

returnValues.putValue('SF6', 'kg',null, sf6Emissions);
returnValues.addNote('comment', 'SF6 emissions converted to CO2e using a global warming potential of '+sf6GWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
