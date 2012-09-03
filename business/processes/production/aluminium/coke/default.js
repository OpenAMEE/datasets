var co2Emissions;

if (typeof(massGreenCoke) == 'undefined') {

  // cannot caluclate without a quantity of green coke
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of green coke consumed is required');

} else {
  
  // proceed with calculation

  // get and validate carbon => CO2 stoich factor
  var cToCo2 = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio'));
  if (typeof(cToCo2) == 'null') {
    cToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the carbon to CO2 stoichiometric factor');
  }

  // get and validate methane => CO2 stoich factor
  var ch4ToCo2 = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=Ch4ToCo2', 'ratio'));
  if (typeof(cToCo2) == 'null') {
    ch4ToCo2 = 0;
    returnValues.addNote('error', 'Cannot calculate. Failed to find the methane to CO2 stoichiometric factor');
  }

  // validate coke dust parameter, handle accordingly
  if (typeof(massCokeDust) == 'undefined') {
    massCokeDust = massGreenCoke * massCokeDustPerMass;
  }

  // validate calcined coke parameter, handle accordingly
  if (typeof(massCalcinedCokeProduced) == 'undefined') {
    massCalcinedCokeProduced = massGreenCoke * massCalcinedCokeProducedPerMass;
  }

  greenCokeCarbonContent = ((100.0 - greenCokeMoistureContent - greenCokeVolatilesContent - greenCokeSulphurContent) / 100.0);

  totalCarbon = massGreenCoke * greenCokeCarbonContent;

  retainedCarbon = (massCalcinedCokeProduced + underCalcinedCokeCollected + massCokeDust) * ((100.0 - calcinedCokeSulphur)/100.0);

  methaneCarbon = massGreenCoke * greenCokeMethaneContent * ch4ToCo2;

  // calculate and convert from tonnes to kgs
  co2Emissions = (((totalCarbon - retainedCarbon) * cToCo2) + methaneCarbon) * 1000;
}

// assign
returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.setDefaultType('CO2'); 
