
// establish wet or dry weight basis, and define appropriate emissions factors
var dryWeight;
if (isWetWeight == 'true') {
  dryWeight = mass * (1 - (waterContent / 100));
} else {
  dryWeight = mass;
}

var CO2Stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio'));
var biogenicCarbonContent = totalCarbonContent - fossilCarbonContent

fossilCO2Emissions = dryWeight * (fossilCarbonContent / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;
biogenicCO2Emissions = dryWeight * (biogenicCarbonContent / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;
totalCO2Emissions = dryWeight * (totalCarbonContent / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;

// this is required for legacy reasons
if (includeAllCarbon == 'true') {
  returnValues.putValue('fossilCO2', 'kg', null, totalCO2Emissions);
} else {
 returnValues.putValue('fossilCO2', 'kg', null, fossilCO2Emissions);
}

returnValues.putValue('biogenicCO2', 'kg', null, biogenicCO2Emissions);
returnValues.putValue('totalCO2', 'kg', null, totalCO2Emissions);
returnValues.setDefaultType('fossilCO2'); 
