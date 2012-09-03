
if (typeof(aluminiumQuantity) == 'undefined') {

  // cannot caluclate without a quantity of aluminium
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of aluminium produced is required');

} else {

  // proceed with calculation

  // validate and handle emissons factor
  var emissionFactor;
  if (typeof(emisFact) == 'undefined') {
    emissionFactor = defEmisFact;
  } else {
    emissionFactor = emisFact;
  }

  // calculate
  co2Emissions = aluminiumQuantity*emissionFactor;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
