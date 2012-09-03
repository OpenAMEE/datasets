var n2oEmissions;
var co2eEmissions;

// Handle user-specified or default value
if (typeof(abateFact) == 'undefined') {
  abateFact = defAbateFact;
  returnValues.addNote('comment', 'No abatement utilization factor specified. Calculation made on the basis of a default abatement utilization factor');
}

// Handle user-specified or default value
if (typeof(destrFact) == 'undefined') {
  destrFact = defDestrFact;
  returnValues.addNote('comment', 'No abatement efficiency factor specified. Calculation made on the basis of a default abatement efficiency factor');
}

// Check required values for CO2 caluclation and handle accordingly. Calculate if appropriate
if (typeof(adipicQuantity) == 'undefined') {
  n2oEmissions = 0;
  co2eEmissions = 0;
  returnValues.addNote('error', 'N2O emissions not calculated: a value for adipicQuantity is required');
  returnValues.addNote('error', 'Total CO2e emissions cannot be calculated: N2O emissions are missing');
} else {
  n2oEmissions = adipicQuantity * emFact * (1 - (abateFact*destrFact));
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

returnValues.putValue('N2O', 'kg', null, n2oEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
