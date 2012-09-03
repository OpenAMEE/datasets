var fuelSynonym;
if (fuel == "diesel") {
  fuelSynonym = "on-road diesel fuel";
} else if (fuel == "gasoline") {
  fuelSynonym = "gasoline/petrol";
} else if (fuel == "residual fuel oil") {
  fuelSynonym = "residual fuel oil (3s 5 and 6)";
}
CO2Factor = parseFloat(dataFinder.getDataItemValue('transport/ghgp/fuel', 'fuel='+fuelSynonym+',region='+region, 'massCO2PerVolume'));
co2Emissions = CO2Factor * volume;
returnValues.putValue('CO2', 'kg',null, co2Emissions);

ch4Emissions = massCH4PerVolume / 1000 * volume;
returnValues.putValue('CH4', 'kg',null, ch4Emissions);

n2oEmissions = massN2OPerVolume / 1000 * volume;
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
  
var ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); //global warming potential for CH4
var n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); //global warming potential for N2O
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
