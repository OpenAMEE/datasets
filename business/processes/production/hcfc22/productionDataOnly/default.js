// Establish if user specified or default value for carbon content should be used
if (typeof(emissFact) == 'undefined') {
  emissFact = defEmissFact;
}

if (typeof(quantityHCFC22) == 'undefined') {
  hfc23Emissions = 0;
  co2eEmissions = 0;
  returnValues.addNote('error', 'HFC-23 emissions not calculated: a value for quantityHCFC22 is required');
  returnValues.addNote('error', 'Total CO2e emissions cannot be calculated: emissions of HFC-23 are missing');
} else {
  hfc23Emissions = quantityHCFC22 * emissFact * timeHFC23;
  hfc23GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=HFC-23', 'GWP');
  if (hfc23GWP == null) {
    co2eEmissions = 0;
    returnValues.addNote('error', 'CO2e emissions for HFC-23 cannot be calculated: retrieval of GWP failed');
  } else {
    co2eEmissions = hfc23Emissions * parseFloat(hfc23GWP);
    returnValues.addNote('comment', 'HFC-23 emissions converted to CO2e using a global warming potential of '+hfc23GWP);
  }
}

returnValues.putValue('HFC23', 'kg', null, hfc23Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
