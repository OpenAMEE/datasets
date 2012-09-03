
if (typeof(aluminiumQuantity) == 'undefined') {

  // cannot caluclate without a quantity of aluminium
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of aluminium produced is required');

} else if (typeof(anodeQuantity) == 'undefined') {

  // cannot caluclate without a rate of anode paste
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A rate of anode paste consumption is required');

} else {

  // proceed with calculation

  // validate and handle binder quantity parameter
  if (typeof(binderQuantity) == 'undefined') {
    binderQuantity = defBinQuantity;
  }

  // validate and handle cyclo quantity parameter
  if (typeof(cycloQuantity) == 'undefined') {
    cycloQuantity = defCycloQuantity;
  }

  // get and validate stoichiometric factor
  var cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');
  if (typeof(cToCo2) == 'null') {
    cToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the carbon to CO2 stoichiometric factor');
  }

  // calculate
  co2Emissions = ((aluminiumQuantity*anodeQuantity)-(cycloQuantity*aluminiumQuantity)-((binderQuantity/100)*anodeQuantity*aluminiumQuantity*((sulphurPitch+ashPitch+hydPitch)/100))-(((100-binderQuantity)/100)*anodeQuantity*aluminiumQuantity*((sulphurCoke+ashCoke)/100))-(aluminiumQuantity*carbonDust))*cToCo2;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
