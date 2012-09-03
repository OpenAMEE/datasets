var fuelUsed;

cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');

if (cToCo2 == null) {
  co2Emissions = 0;
  returnValues.addNote('error', 'CO2 emissions not calculated: retrieval of C to CO2 stoichiometric factor failed');
} else {

  // Establish if user specified or default value for carbon content should be used
  if (typeof(carbonContent) == 'undefined') {
    carbonContent = defCarbonContent;
  }

  // establish if (1) total fuel specified or (2) if fuel consumption is based on ammonia production
  if (typeof(totalFuelQuantity) == 'undefined') {
    // if total quantity not explicitly specified, it must be derived from ammonia production.
    if(typeof(fuelQuantity) == 'undefined') {
      fuelQuantity = defFuelQuantity;
    }
    if(typeof(nh3Quantity) == 'undefined') {
      totalFuelQuantity = null;
    } else {
      totalFuelQuantity = nh3Quantity * fuelQuantity;
    }
  }

  if (totalFuelQuantity == null) {
    co2Emissions = 0; 
    returnValues.addNote('error', 'CO2 emissions not calculated: either total fuel consumed or total ammonia produced must be specified');
  } else {
    // calculate
    // Establish if (1) total CO2 for urea production; or (2) quantity of urea production; or (3) neither, are provided
    if (typeof(ureaProd) == 'undefined') {
      if (typeof(quantityUrea) == 'undefined') {
        ureaProd = 0;
        returnValues.addNote('comment', 'No CO2 recovery for urea production or absolute level of urea production specified. Calculation made assuming no CO2 recovery for urea production');
      } else {
        // IPCC suggests a value of 44/60 converts a quantity of urea into its corresponding quantity of CO2
        // This is basically the net stoich ratio of urea to carbon (12/60) and carbon to CO2 (44/12) 
        // Since we already have the two basic values, both are used here to produce the net value 
        ureaToC = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=ureaToCarbon', 'ratio');
        if (ureaToC == null) {
          returnValues.addNote('error', 'Cannot calculate CO2 emissions recovered for urea production based on urea production: retrieval of urea to C stoichiometric factor failed');
          ureaProd = 0;
        } else {
          ureaProd = quantityUrea * parseFloat(ureaToC) * parseFloat(cToCo2);
          returnValues.addNote('comment', 'CO2 recovered for urea production calculated on the basis of the specified urea production');
        }
      } 
    }
    co2Emissions = (totalFuelQuantity * carbonContent * oxidationFact * cToCo2) - (ureaProd + css);
  }
}

returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2');
