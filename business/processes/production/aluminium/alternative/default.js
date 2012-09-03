// validate inputs
if (typeof(pitchQuantity) == 'undefined') {

  // cannot caluclate without a quantity of pitch
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of pitch consumed is required');

} else if (typeof(cokeQuantity) == 'undefined') {

  // cannot caluclate without a quantity of coke
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of coke consumed is required');

} else if (typeof(packingQuantity) == 'undefined') {

  // cannot caluclate without a quantity of packing coke
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of packing coke consumed is required');

} else if (typeof(byprodQuantity) == 'undefined') {

  // cannot caluclate without a quantity of by-products
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of carbon-bearing by-products produced is required');

} else if (typeof(anodeQuantity) == 'undefined') {

  // cannot caluclate without a quantity of purchased anodes
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of anodes purchased is required');

} else if (typeof(soldQuantity) == 'undefined') {

  // cannot caluclate without a quantity of sold anodes
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of anodes sold is required');

} else {

  // proceed with calculation

  // get and validate stoichiometric factor
  var cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');
  if (typeof(cToCo2) == 'null') {
    cToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the carbon to CO2 stoichiometric factor');
  }

  // calculate
  co2Emissions = (((pitchQuantity*carbonPitch)/100)+((cokeQuantity*carbonCoke)/100)+((packingQuantity*carbonPacking)/100)-byprodQuantity+((anodeQuantity*carbonAnode)/100)-((soldQuantity*carbonSold)/100))*cToCo2;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
