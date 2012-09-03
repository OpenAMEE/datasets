
var CH4PercentIncreaseWithAge = 1.5;
try {
     var v = vehicleAge;
} catch(error) {
     vehicleAge = "";
}

if (vehicleAge != "") {
     massCH4PerEnergy *= Math.pow((1 + (CH4PercentIncreaseWithAge / 100)), vehicleAge);
} 

co2Emissions = energyConsumed * massCO2PerEnergy;
ch4Emissions = energyConsumed * massCH4PerEnergy * CH4WeightingFactor;
n2oEmissions = energyConsumed * massN2OPerEnergy * N2OWeightingFactor;

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
