
rawEmissions = mass * massPerMass * 1000;

try {
  var c = compound;
} catch(error) {
  compound = null;
}

if (type == 'SF6 (dilute)' || type == 'SF6 (highly purified)') {
  gwp = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=SF6','GWP'));
  returnValues.addNote('comment', 'SF6 emissions converted to CO2e using a global warming potential of '+gwp);
} else {
  gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+compound,'GWP');
  if (gwp == null) {
    gwp = 0;
    returnValues.addNote('comment', 'Specific compound not know. Cannot calculate CO2e emissions');
  } else {
    returnValues.addNote('comment', compound+' emissions converted to CO2e using a global warming potential of '+gwp);
  }
}

co2eEmissions = rawEmissions * gwp;

if (returnCO2e == 'false') { // this switch is required for legacy support
  returnValues.putValue('rawQuantity', 'kg', null, rawEmissions);
} else {
  returnValues.putValue('rawQuantity', 'kg', null, co2eEmissions);
}

returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('rawQuantity'); 
