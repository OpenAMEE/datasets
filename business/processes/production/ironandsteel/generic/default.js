co2Emissions = mass * massCO2PerMass * 1000; // convert tonnes to kgs

try {
  var m = massCH4PerMass;
  ch4Emissions = mass * massCH4PerMass;
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} catch(error) {
  ch4Emissions = 0;
  ch4GWP = 0;
  returnValues.addNote('comment', 'CH4 emissions not specified for this item');
}

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP);

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
