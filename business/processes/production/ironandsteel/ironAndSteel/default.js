// Define all variables
var co2Emissions;
var stoich;
var ch4Emissions;
var ch4GWP;
var ch4CO2e;
var co2eEmissions;
var co2Calculable = true;
var ch4CO2eCalculable = true;

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
if (typeof(carbonContent) == 'undefined') {
  carbonContent = defCarbonContent;
  returnValues.addNote('comment', 'No carbon content specified. Calculation made on the basis of a default carbon content');
}

// Get C => CO2 stoichiometric factor
stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');

// Check required values for CO2 caluclation and handle accordingly. Calculate if appropriate
if (typeof(materialQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','materialQuantity');
} 

if (typeof(steelQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','steelQuantity');
}

if (typeof(ironQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','ironQuantity');
}

if (typeof(gasQuantity) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','gasQuantity');
}

if (stoich == 'null') {
  setCO2ToZero();
  returnValues.addNote('error', 'CO2 emissions not calculated: retrieval of C to CO2 stoichiometric factor failed');
} 

if (co2Calculable == true) {
  co2Emissions = ((materialQuantity * carbonContent) - (steelQuantity * steelCarbon) - (ironQuantity * ironCarbon) - (gasQuantity * gasCarbon)) * parseFloat(stoich);
}

// Check required values for CH4 calculation and handle accordingly. Calculate if appropriate
if (typeof(pigQuantity) == 'undefined') {
  ch4Emissions = 0;
  // Declare that CO2e cannot be calculated
  ch4CO2eCalculable = false;
  missingRequiredInputNote('CH4','pigQuantity');
} else {
  ch4Emissions = pigQuantity * ch4EM;
  ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); 
  // If GWP successfully found, calculate CH4 CO2e, otherwise set to zero
  if (ch4GWP == 'null') {
    ch4CO2e = 0;
    // Declare that CO2e cannot be calculated
    ch4CO2eCalculable = false;
    returnValues.addNote('error', 'CO2e emissions for CH4 cannot be calculated: retrieval of GWP failed');
  } else {
    ch4CO2e = (ch4Emissions * parseFloat(ch4GWP));
  }
}

// Calculate total CO2e if possible
if (co2Calculable == true && ch4CO2eCalculable == true) {
  co2eEmissions = co2Emissions + ch4CO2e;
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} else {
  co2eEmissions = 0;
  returnValues.addNote('error', 'Total CO2e emissions cannot be calculated: emissions of one or more greenhouse gases are missing');
}

returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.putValue('CH4', 'kg', null, ch4Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e');
