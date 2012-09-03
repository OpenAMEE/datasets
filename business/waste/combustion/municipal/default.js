
// establish wet or dry weight basis, and define appropriate emissions factors
var dryWeight;
if (isWetWeight == 'true') {
  dryWeight = mass * (dryMatterContent / 100.0);
} else {
  dryWeight = mass;
}

var CO2Stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio'));
var biogenicFraction = 100.0 - fossilFraction

fossilCO2Emissions = dryWeight * (totalCarbonContent / 100.0) * (fossilFraction / 100.0) * (oxidationFactor / 100) * CO2Stoich * 1000;
biogenicCO2Emissions = dryWeight * (totalCarbonContent / 100.0) * (biogenicFraction / 100.0) * (oxidationFactor / 100) * CO2Stoich * 1000;
totalCO2Emissions = dryWeight * (totalCarbonContent / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;

// caluclation other ghg emissions and convert from g to kg
ch4Emissions = dryWeight * massCH4PerMass / 1000.0;
n2oEmissions = dryWeight * massN2OPerMass / 1000.0;

// global warming potential
var ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'));
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
var n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'));
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);

// this is required for legacy reasons
if (includeAllCarbon == 'true') {
  co2eEmissions = totalCO2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
} else {
 co2eEmissions = fossilCO2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
}

returnValues.putValue('fossilCO2', 'kg', null, fossilCO2Emissions);
returnValues.putValue('biogenicCO2', 'kg', null, biogenicCO2Emissions);
returnValues.putValue('totalCO2', 'kg', null, totalCO2Emissions);
returnValues.putValue('CH4', 'kg', null, ch4Emissions);
returnValues.putValue('N2O', 'kg', null, n2oEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
