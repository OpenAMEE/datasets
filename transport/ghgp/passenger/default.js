co2Emissions = massCO2PerDistance * distance * passengers;
returnValues.putValue('CO2', 'kg',null, co2Emissions);

try {
  var c = massCH4PerDistance;
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for CH4
  massCH4PerDistance /= 1000.0;
  ch4Emissions = massCH4PerDistance * distance * passengers;
  returnValues.putValue('CH4', 'kg',null, ch4Emissions);
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} catch(error) {
  ch4Emissions = 0;
  ch4GWP = 0;
  returnValues.putValue('CH4', 'kg',null, ch4Emissions);
  returnValues.addNote('comment', 'CH4 emissions not available for this item');
}

try {
  var n = massN2OPerDistance;
  n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O
  massN2OPerDistance /= 1000.0;
  n2oEmissions = massN2OPerDistance * distance * passengers;
  returnValues.putValue('N2O', 'kg',null, n2oEmissions);
  returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
} catch(error) {
  n2oEmissions = 0;
  n2oGWP = 0;
  returnValues.putValue('N2O', 'kg',null, n2oEmissions);
  returnValues.addNote('comment', 'N2O emissions not available for this item');
}

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
