//user or default Emission factors
try{
  cf4EM = cf4EmisFact
} catch (error) {
  cf4EM = defCf4EmisFact
}

try{
  c2f6EM = c2f6EmisFact
} catch (error) {
  c2f6EM = defC2f6EmisFact
}

cf4Emissions = alQuantity * cf4EM;
c2f6Emissions = alQuantity * c2f6EM;

// fetch GWP
cf4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CF4', 'GWP');
c2f6GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=C2F6', 'GWP');
co2eEmissions = (cf4Emissions * cf4GWP) + (c2f6Emissions * c2f6GWP);

returnValues.putValue('CF4', 'kg', null, cf4Emissions);
returnValues.addNote('comment', 'CF4 emissions converted to CO2e using a global warming potential of '+cf4GWP);
returnValues.putValue('C2F6', 'kg', null, c2f6Emissions);
returnValues.addNote('comment', 'C2F6 emissions converted to CO2e using a global warming potential of '+c2f6GWP);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
