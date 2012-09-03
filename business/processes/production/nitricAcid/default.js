var abatementFactor;
// establish abatement and destruction factor
if (typeof(destrFact) == 'undefined' || typeof(abateFact) == 'undefined') {
  abatementFactor = 1;
} else {
  abatementFactor = 1 - (destrFact * abateFact);
} 

// establish emission factor (specified or default?)
if (typeof(specEmFact) == 'undefined') {
  specEmFact = defEmFact;
}

if (typeof(acidQuantity) == 'undefined') {
  n2oEmissions = 0;
  co2eEmissions = 0;
  returnValues.addNote('error', 'N2O emissions not calculated: a value for acidQuantity is required');
  returnValues.addNote('error', 'Total CO2e emissions cannot be calculated: N2O emissions are missing');
} else {
  n2oEmissions = acidQuantity * specEmFact * abatementFactor;
  n2oGWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');
  // If GWP successfully found, calculate CH4 CO2e, otherwise set to zero
  if (n2oGWP == 'null') {
    co2eEmissions = 0;
    returnValues.addNote('error', 'CO2e emissions for N2O cannot be calculated: retrieval of GWP failed');
  } else {
    co2eEmissions = n2oEmissions * parseFloat(n2oGWP);
    returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP); 
  }
}
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
