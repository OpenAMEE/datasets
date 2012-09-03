try {
  var c = massCO2PerVolume;
  co2Emissions = massCO2PerVolume * volume;
} catch(error) {
  co2Emissions = 0;
  returnValues.addNote('comment', 'CO2 emissions unavailable for this item');
}

try {
  var m = massCH4PerVolume;
  ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
  ch4Emissions = massCH4PerVolume * volume;
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} catch(error) {
  ch4Emissions = 0;
  ch4GWP = 0;
  returnValues.addNote('comment', 'CH4 emissions unavailable for this item');
}

try {
  var n = massN2OPerVolume;
  n2oGWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP');
  n2oEmissions = massN2OPerVolume * volume;
  returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
} catch(error) {
  n2oEmissions = 0;
  n2oGWP = 0;
  returnValues.addNote('comment', 'N2O emissions unavailable for this item');
}

co2eEmissions = co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);

returnValues.putValue('CO2', 'kg', 'year', co2Emissions);
returnValues.putValue('CH4', 'kg', 'year', ch4Emissions);
returnValues.putValue('N2O', 'kg', 'year', n2oEmissions);
returnValues.putValue('CO2e', 'kg', 'year', co2eEmissions);
returnValues.setDefaultType('CO2e'); 
