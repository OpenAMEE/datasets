var hfc23Emissions;
var hfc23Calculable = true;

// Set HFC23 to zero
function setHFC23ToZero() {
  hfc23Emissions = 0;
  // Declare that HFC23 cannot be calculated
  hfc23Calculable = false;
}

// Initialize note about missing value
function missingRequiredInputNote(gas,attr) {
  returnValues.addNote('error', gas+' emissions not calculated: a value for '+attr+' is required');
}

if (typeof(carbonBalEff) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','carbonBalEff');
}

if (typeof(fluorineBalEff) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','fluorineBalEff');
}

if (typeof(quantityHCFC22) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','quantityHCFC22');
}

if (hfc23Calculable == true) {
  emissionsRate = ((((100 - carbonBalEff) / 100) * carbonContFact * lossHCFC22) + (((100 - fluorineBalEff) / 100) * fluorineContFact * lossHCFC22)) / 2;
  hfc23Emissions = emissionsRate * quantityHCFC22 * timeHFC23;

  hfc23GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=HFC-23', 'GWP');
  if (hfc23GWP == null) {
    co2eEmissions = 0;
    returnValues.addNote('error', 'CO2e emissions for HFC-23 cannot be calculated: retrieval of GWP failed');
  } else {
    co2eEmissions = hfc23Emissions * parseFloat(hfc23GWP);
    returnValues.addNote('comment', 'HFC-23 emissions converted to CO2e using a global warming potential of '+hfc23GWP);
  }
} else {
  co2eEmissions = 0;
  returnValues.addNote('error', 'Total CO2e emissions cannot be calculated: emissions of HFC-23 are missing');
}

returnValues.putValue('HFC23', 'kg', null, hfc23Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
