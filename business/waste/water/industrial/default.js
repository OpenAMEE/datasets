//global warming potential for CH4
var gwpCH4 = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'));

// establish if typical values required, get them and assign to profile item values
// 'industry' must be specified, and 'useTypical' switches set to 'true'
try {
  var i = industry;
  if (useTypicalOxygenDemand == 'true') {
    massOrganicPerVolumeWasteWater = parseFloat(dataFinder.getDataItemValue('business/waste/water/industrial/industryfactors','industry='+industry,'massOrganicPerVolumeWasteWater'));
  }
  if (useTypicalWater == 'true') {
    volumeWasteWaterPerMassProduction = parseFloat(dataFinder.getDataItemValue('business/waste/water/industrial/industryfactors','industry='+industry,'volumeWasteWaterPerMassProduction'));
  }
} catch(error) {
  // do nothing
}

// establish which profile item values have been set - this determines how the quantity of organic material is set
try {
  var t = massOrganicWaste;
} catch(error) {
  massOrganicWaste = null;
}

try {
  var t = volume;
} catch(error) {
  volume = null;
}

try {
  var t = massOrganicPerVolumeWasteWater;
} catch(error) {
  massOrganicPerVolumeWasteWater = null;
}

try {
  var t = volumeWasteWaterPerMassProduction;
} catch(error) {
  volumeWasteWaterPerMassProduction = null;
}

try {
  var t = massProduced;
} catch(error) {
  massProduced = null;
}

// define the quantity to be used for calculation based on which profile item values are set
var quantity;
if (massOrganicWaste) {
  quantity = massOrganicWaste;
} else if (volume && massOrganicPerVolumeWasteWater) {
  quantity = volume * massOrganicPerVolumeWasteWater;
} else if (massOrganicPerVolumeWasteWater && volumeWasteWaterPerMassProduction && massProduced) {
  quantity = massOrganicPerVolumeWasteWater * volumeWasteWaterPerMassProduction * massProduced;
} else {
  quantity = null;
}

// make calculation
if (quantity == null) { // if quantity is 'null' give error message
  returnValues.addNote('comment', 'Invalid combination of profile item values specifed');  
  ch4Emissions = 0;
  co2eEmissions = 0;
} else {
  grossCH4Emissions = ( quantity - massSludge ) * massPerMassCODMax * methaneConversionFactor;
  if (grossCH4Emissions > recoveredMethane) { // check recovered not greater than emitted (methane)
    ch4Emissions = grossCH4Emissions - recoveredMethane;
    ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
    co2eEmissions = ch4Emissions * ch4GWP;
    returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
  } else {
    ch4Emissions = 0;
    co2eEmissions = 0;
    returnValues.addNote('comment', 'Recovered CH4 quantity specified exceeds emitted CH4');
  }
}

returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
