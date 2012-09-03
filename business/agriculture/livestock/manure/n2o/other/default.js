var n2oGWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); //global warming potential for N2O
var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=N2O-NtoN2O','ratio');

try {
  var v = fractionVolatilised;
} catch(error) {
  fractionVolatilised = null;
}

if (fractionVolatilised == null) { // direct only calculation
  n2oEmissions = totalLiveweight * (massNExcretedPer1000kgLivestockPerTime * 365 / 1000) * massN2OPerMassNDirect * stoich;
} else { // direct plus indirect emissions calculation
  n2oEmissions = totalLiveweight * (massNExcretedPer1000kgLivestockPerTime * 365 / 1000) * (massN2OPerMassNDirect + (fractionVolatilised * massN2OPerMassNVolatilised)) * stoich;
}

co2eEmissions = n2oEmissions * n2oGWP;

returnValues.putValue('N2O', 'kg','year', n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg','year', co2eEmissions);
returnValues.setDefaultType('CO2e');
