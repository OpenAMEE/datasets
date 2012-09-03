// Define all variables
var co2Emissions;
var co2Calculable = true;

// Set CO2 to zero
function setCO2ToZero() {
  co2Emissions = 0;
  // Declare that CO2e cannot be calculated
  co2Calculable = false;
}

// Initialize note about missing value
function missingRequiredInputNote(gas,attr) {
  returnValues.addNote('error', gas+' emissions not calculated: a value for '+attr+' is required');
}
// Handle user-specified or default value
if (typeof(EF) == 'undefined') {
  EF = defEF;
  returnValues.addNote('comment', 'No carbonate specific emissions factor specified. Calculation made on the basis of a default factor');
}

if (typeof(carbonateQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','carbonateQuantity');
} 

if (typeof(lkdQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','lkdQuantity');
}

if (co2Calculable == true) {
  co2Emissions = (EF * carbonateQuantity * calcinationFrac) - (lkdQuantity * weightLkd * (1 - lkdCalcFrac) * EF)
}

returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2');
