try {
  var f = massCO2PerDistance;
  co2Emissions = massCO2PerDistance * distance / occupancy;
} catch(error) {
  co2Emissions = 0;
  returnValues.addNote('comment', 'There are no fossil CO2 emissions associated with this item');
}

try {
  var b = massBiogenicCO2PerDistance;
  biogenicCO2Emissions = massBiogenicCO2PerDistance * distance / occupancy;
} catch(error) {
  biogenicCO2Emissions = 0;
  returnValues.addNote('comment', 'There are no biogenic CO2 emissions associated with this item');
}

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2Emissions);
returnValues.setDefaultType('CO2');
