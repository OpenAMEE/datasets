gwpCH4 = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 

var productionBased = true;
var consumptionBased = true;

try {
  var m = mass;
} catch(error) {
  productionBased = false;
}

try {
  var f = massFeedstock;
  var F = massFeedstockPerMass;
} catch(error) {
  consumptionBased = false;
}

var quantity;
if (productionBased) {
  quantity = mass;
  returnValues.addNote('comment', 'Calculation made on the basis of mass produced');
} else if (consumptionBased) {
  quantity = massFeedstock / massFeedstockPerMass;
  returnValues.addNote('comment', 'Calculation made on the basis of feedstock consumption');
} else {
  quantity = 0;
  returnValues.addNote('comment', 'Insufficient data provided. Either mass produced or feedstock quantity/factor must be specified');
}

co2Emissions = quantity * massCO2PerMass * 1000;
ch4Emissions = quantity * massCH4PerMass;

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 

co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP);

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');


