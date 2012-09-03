// Define all variables
var co2Emissions;
var ch4Emissions;
var ch4GWP;
var ch4CO2e;
var co2eEmissions;
var co2Calculable = true;
var ch4CO2eCalculable = true;

// Set CO2 to zero
function setCO2ToZero() {
  co2Emissions = 0;
  // Declare that CO2 cannot be calculated
  co2Calculable = false;
}

// Initialize note about missing value
function missingRequiredInputNote(gas,attr) {
  returnValues.addNote('error', gas+' emissions not calculated: a value for '+attr+' is required');
}

// Original GHGP methodology return tonnes and therefore uses 2204.6
// Convert to kgs using same factor
var lbsToKgs = 1000.0/poundsInTonne;

if (typeof(volume) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','volume');
  missingRequiredInputNote('CH4','volume');
}

if (typeof(gasHydrocarbonFraction) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','the fraction of hydrocarbon in the gas');
}

if (typeof(hydrocarbonCarbonFraction) == 'undefined') {
  setCO2ToZero();
  missingRequiredInputNote('CO2','the fraction of carbon in the hydrocarbon');
}

if (co2Calculable == true) {

  /* term-by-term explanation
   *
   * gas volume / molar volume                  = lb-moles of gas
   *
   * lb-moles x hydrocarbon fraction            = lb-moles of hydrocarbon
   *
   * lb-moles of hydrocarbon x carbon fraction  = lb-moles of carbon
   *
   * lb-moles of carbon x combustion efficieny  = lb-moles carbon oxidised
   *
   * lb-moles oxidised x C=>CO2 stoichiometry   = lb-moles CO2 produced
   *
   * lb-moles CO2 x molecular mass              = lbs CO2 produced
   *
   * lbs CO2 x lbs=>kg                          = kgs CO2 produced
   *
   */  

  co2Emissions = volume / molarVolume * (gasHydrocarbonFraction * hydrocarbonCarbonFraction) * combustionEfficiency * cToCO2Stoichiometry * molecularMassCO2 * lbsToKgs;
}

if (typeof(gasMethaneFraction) == 'undefined') {
  ch4Emissions = 0;
  // Declare that CO2e cannot be calculated
  ch4CO2eCalculable = false;
  missingRequiredInputNote('CH4','the fraction of methane in the gas');
} else {

  /* term-by-term explanation
   *
   * gas volume / molar volume                        = lb-moles of gas
   *
   * lb-moles x methane fraction                      = lb-moles of methane
   * 
   * lb-moles of methane x (1 - combustion efficieny) = lb-moles methane NOT oxidised
   *
   * lb-moles methane x molecular mass                = lbs methane emitted
   *
   * lbs methane x lbs=>kg                            = kgs methane emitted
   *
   */ 

  ch4Emissions = volume / molarVolume * (1 - combustionEfficiency) * molecularMassCH4 * lbsToKgs * gasMethaneFraction;
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

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
