
var co2Emissions;

if (typeof(anodeQuantity) == 'undefined') {

  // cannot caluclate without a quantity of baked anodes
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of baked anodes produced is required');

} else {

  // proceed with calculation

  // default or user Waste Tar?
  if (typeof(tarQuantity) == 'undefined') {
    if (typeof(greenWeight) == 'undefined') {
      returnValues.addNote('error', 'Cannot calculate. Must specify either a quantity of tar collected or a process quantity of green anodes');
    } else {
      tarQuantity = defTarQuantity*greenWeight;
    }
  }
  
  // get and validate stoichiometric factor
  var cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');
  if (typeof(cToCo2) == 'null') {
    cToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the carbon to CO2 stoichiometric factor');
  }

  // calculate weight of loaded green anodes
  var initialGreenWeight;
  if ((typeof(greenWeight) == 'undefined') || (typeof(bakedWeight) == 'undefined')) {
    initialGreenWeight = defaultGwBwRatio * anodeQuantity;
  } else {
    initialGreenWeight = (greenWeight/bakedWeight)*anodeQuantity;
  }

  // calculate
  var pitchVolatileEmissions = (initialGreenWeight - ((hydContent*initialGreenWeight)/100) - anodeQuantity - tarQuantity) * cToCo2;
  var packingMaterialEmissions = (cokeQuantity * anodeQuantity * ((100-sulphurQuantity-ashQuantity)/100)) * cToCo2;
  co2Emissions = pitchVolatileEmissions + packingMaterialEmissions;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
