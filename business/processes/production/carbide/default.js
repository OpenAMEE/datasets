try {
  var m = massCH4PerMass;
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'));
  ch4Emissions = massCH4PerMass * mass;
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} catch(error) {
  ch4Emissions = 0;
  ch4GWP = 0;
  returnValues.addNote('comment', 'Cannot calculate CH4 emissions. No CH4 emissions factor provided');
}

try {
    var f = feedstockCarbon;
} catch(error) {
  feedstockCarbon = null;
}

if (basis == 'coke consumption' && feedstockCarbon != null) {
  var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');
  co2Emissions =  mass * (feedstockCarbon * feedstockOxidation * (1 - productCarbonContent) * stoich) * 1000;
  returnValues.addNote('comment', 'CO2 emissions calculated on the basis of carbon content');
} else {
  co2Emissions =  mass * massCO2PerMass * 1000;
  returnValues.addNote('comment', 'CO2 emissions calculated on the basis of emissions factor');
}

co2eEmissions = co2Emissions + (ch4Emissions * ch4GWP);

returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.putValue('CH4', 'kg', null, ch4Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
