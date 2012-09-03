var conversionFactor = 0.67; // converts cubic metres to kg

// establish mine pre-drainage for in situ gas-based post-mining emissions factor
var inSituGasFactor;
if (isPreDrained == 'false'){
  inSituGasFactor = 0.3;
} else {
  inSituGasFactor = 0.1;
}

// establish custom (in situ gas-based) or generic post-mining emissions factor
var postMiningEmissionsFactor;
try {
  postMiningEmissionsFactor = inSituGasContent * inSituGasFactor;
} catch(error) {
  postMiningEmissionsFactor = volumeCH4PerMassPostMining;
}

// calculation
ch4Emissions = (((coalProduction * (volumeCH4PerMassMining + postMiningEmissionsFactor)) - recoveredMethane) * conversionFactor);

// fetch GWPs
ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
co2eEmissions = ch4Emissions * ch4GWP;

returnValues.putValue('CH4', 'kg', 'year', ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg', 'year', co2eEmissions);
returnValues.setDefaultType('CO2e'); 
