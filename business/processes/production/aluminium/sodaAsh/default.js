var co2Emissions;

if (typeof(sodaQuantity) == 'undefined') {

  // cannot caluclate without a quantity of soda ash
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of soda ash consumed is required');

} else {
  
  // proceed with calculation

  // get and validate carbon => CO2 stoich factor
  var na2Co3ToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=Na2Co3ToCo2', 'ratio');
  if (typeof(na2Co3ToCo2) == 'null') {
    na2Co3ToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the sodium carbonate to CO2 stoichiometric factor');
  }
 
  // calculate
  co2Emissions = sodaQuantity * sodaFrac * calcFrac * na2Co3ToCo2;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
