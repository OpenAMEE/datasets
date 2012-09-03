
try {
  var e = energyConsumed;
} catch(error) {
  energyConsumed = null;
}

try {
  var v = volumeConsumed;
} catch(error) {
  volumeConsumed = null;
}

if (energyConsumed == null && volumeConsumed == null) {
  quantity = 0;
  returnValues.addNote('comment', 'Insufficient data provided. Energy or volume consumed must be specified');
} else if (energyConsumed == null) {
  quantity = volumeConsumed * energyPerVolume;
}  else {
  quantity = energyConsumed;
}

co2Emissions = massCO2PerEnergy * quantity;
ch4Emissions = massCH4PerEnergy * quantity;
n2oEmissions = massN2OPerEnergy * quantity;

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for CH4
n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
