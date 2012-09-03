
stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=N2O-NtoN2O','ratio'));
n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'));

n2oEmissions = massPerArea * area * stoich;

co2eEmissions = n2oEmissions * n2oGWP;

returnValues.putValue('N2O', 'kg', null, n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e');
