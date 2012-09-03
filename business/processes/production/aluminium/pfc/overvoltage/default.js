// user or default cf4 coefficient
try{
  overvoltageCoefficient = ovCoef
} catch (error) {
  overvoltageCoefficient = defOvCoef
}

// user or default weight fraction
try{
  weightFraction = weightFrac
} catch (error) {
  weightFraction = defWeightFrac
}

cf4Emissions = overvoltageCoefficient * (aeo/curEff) * (alQuantity / 1000); // convert kg mass into tonnes so compatible with emissions factor
c2f6Emissions = weightFraction * cf4Emissions;

cf4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CF4', 'GWP');
c2f6GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=C2F6', 'GWP');
co2eEmissions = (cf4Emissions * cf4GWP) + (c2f6Emissions * c2f6GWP);

returnValues.putValue('CF4', 'kg', null, cf4Emissions);
returnValues.addNote('comment', 'CF4 emissions converted to CO2e using a global warming potential of '+cf4GWP);
returnValues.putValue('C2F6', 'kg', null, c2f6Emissions);
returnValues.addNote('comment', 'C2F6 emissions converted to CO2e using a global warming potential of '+c2f6GWP);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
