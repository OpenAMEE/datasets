// Set HFC23 to zero
var hfc23Emissions;
var hfc23Calculable = true;

function setHFC23ToZero() {
  hfc23Emissions = 0;
  // Declare that HFC23 cannot be calculated
  hfc23Calculable = false;
}

// Initialize note about missing value
function missingRequiredInputNote(gas,attr) {
  returnValues.addNote('error', gas+' emissions not calculated: a value for '+attr+' is required');
}

if (typeof(emissFlowRate) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','emissFlowRate');
}

if (typeof(flowConcentration) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','flowConcentration');
}

if (typeof(timeFlow) == 'undefined') {
  setHFC23ToZero();
  missingRequiredInputNote('HFC-23','timeFlow');
}

if (hfc23Calculable == true) {
  hfc23Emissions = emissFlowRate * flowConcentration * timeFlow / 1000;
  
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
