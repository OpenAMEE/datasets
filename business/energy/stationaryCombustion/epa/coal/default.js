// Establish if mass or energy specified
try {
  var m = mass;
} catch(error) {
  mass = null;
}

try {
  var e = energyConsumed;
} catch(error) {
  energyConsumed = null;
}

// initialize computable quantity as either specified energy or energy derived from heatng value and mass
var quantity
if (mass == null && energyConsumed == null) {
    quantity = 0;
  returnValues.addNote('comment', 'No calculation made. Please specify an energy or mass quantity');
} else if (energyConsumed == null) {
  quantity = mass * energyPerMass;
  returnValues.addNote('comment', 'Calculation made on the basis of a mass quantity');
} else if (mass == null) {
  quantity = energyConsumed;
  returnValues.addNote('comment', 'Calculation made on the basis of an energy quantity');
}

// get CH4 emissions factor
massCH4PerEnergy = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/epa/ch4andn2ofactors', 'type=coal,context='+burningContext, 'massCH4PerEnergy'));
massCH4PerEnergy /= 1000.0; // convert g to kg
 
// get N2O emissions factor
massN2OPerEnergy = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/epa/ch4andn2ofactors', 'type=coal,context='+burningContext, 'massN2OPerEnergy'));
massN2OPerEnergy /= 1000.0; // convert g to kg

// get global warming potentials
ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); 

// calculate emissions
co2Emissions = massCO2PerEnergy * quantity;
ch4Emissions = massCH4PerEnergy * quantity;
n2oEmissions = massN2OPerEnergy * quantity;
co2eEmissions =  co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);

// for legacy reasons this switch between CO2 and CO2e must remain
if (includeNonCO2Gases == "true") {
  returnValues.putValue('CO2', 'kg',null, co2eEmissions);
} else {
  returnValues.putValue('CO2', 'kg',null, co2Emissions);
}

returnValues.setDefaultType('CO2'); // CO2 rather than CO2e assigned as default for legacy reasons
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
