
withNitrificationDenitrificationEmissions = (populationWith * massN2OPerPersonWith * industryFactor) * 0.001;
withoutNitrificationDenitrificationEmissions = ((totalPopulation - populationWith) * massN2OPerPersonWithout * industryFactor) * 0.001;

n2oEmissions = withNitrificationDenitrificationEmissions + withoutNitrificationDenitrificationEmissions;

n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); 
co2eEmissions = n2oEmissions * n2oGWP;

returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
