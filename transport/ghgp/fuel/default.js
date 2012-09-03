try {
  var f = massCO2PerVolume;
  co2Emissions = massCO2PerVolume * volume;
} catch(error) {
  co2Emissions = 0;
  returnValues.addNote('comment', 'There are no fossil CO2 emissions associated with this item');
}

try {
  var b = massBiogenicCO2PerVolume;
  biogenicCO2Emissions = massBiogenicCO2PerVolume * volume;
} catch(error) {
  biogenicCO2Emissions = 0;
  returnValues.addNote('comment', 'There are no biogenic CO2 emissions associated with this item');
}

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
