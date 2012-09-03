var co2Emissions;

if (typeof(limeQuantity) == 'undefined') {

  // cannot caluclate without a quantity of lime
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of lime is required');

} else {
  
  // proceed with calculation

  // validate and handle caoMgoRatio
  if (typeof(caoMgoRatio) == 'undefined') {
    caoMgoRatio = defCaoMgoRatio;
  }

  // validate and handle stoicRatio
  if (typeof(stoicRatio) == 'undefined') {
    stoicRatio = defStoicRatio;
  }

  // validate and handle lime kiln dust parameter
  var limeKilnDustFactor; 
  if ((typeof(lkdWeight) == 'undefined') || (typeof(fracLkd) == 'undefined') || (typeof(calcinationLKD) == 'undefined')) {
    limeKilnDustFactor = defLkdCorrection;
  } else { 
    limeKilnDustFactor = 1+ (lkdWeight / limeQuantity) * fracLkd * calcinationLKD;
  }

  co2Emissions = (caoMgoRatio * stoicRatio) * limeQuantity * (1 - (hydLime * waterLime)) * limeKilnDustFactor;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
