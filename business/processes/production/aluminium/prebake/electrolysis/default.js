
if (typeof(aluminiumQuantity) == 'undefined') {

  // cannot caluclate without a quantity of aluminium
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of aluminium produced is required');

} else if (typeof(anodeQuantity) == 'undefined') {

  // cannot caluclate without a quantity of baked anodes
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A rate of baked anode consumption is required');

} else {

  // get and validate stoichiometric factor
  var cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');
  if (typeof(cToCo2) == 'null') {
    cToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the carbon to CO2 stoichiometric factor');
  }
  co2Emissions = aluminiumQuantity * anodeQuantity * ((100 - sulphurQuantity - ashQuantity)/100) * cToCo2;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
