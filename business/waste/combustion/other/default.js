
var CO2Stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio'));
var biogenicFraction = 100.0 - fossilFraction;

fossilCO2Emissions = mass * (totalCarbonContent / 100) * (fossilFraction / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;
biogenicCO2Emissions = mass * (totalCarbonContent / 100) * (biogenicFraction / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;
totalCO2Emissions = mass * (totalCarbonContent / 100) * (oxidationFactor / 100) * CO2Stoich * 1000;

// this is required for legacy reasons
if (includeAllCarbon == 'true') {
  returnValues.putValue('fossilCO2', 'kg', null, totalCO2Emissions);
} else {
 returnValues.putValue('fossilCO2', 'kg', null, fossilCO2Emissions);
}

returnValues.putValue('biogenicCO2', 'kg', null, biogenicCO2Emissions);
returnValues.putValue('totalCO2', 'kg', null, totalCO2Emissions);
returnValues.setDefaultType('fossilCO2'); 
