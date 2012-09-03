// establish which profile item values specified
try {
  var energy;
} catch(err) {
  energy = null;
}

try {
  var mass;
} catch(err) {
  mass = null;
}

try {
  var volume;
} catch(err) {
  volume = null;
}

// establish separate fuel names
var biofuel;
var conventionalFuel;

if (fuel == 'biodiesel/diesel') {
  biofuel = 'biodiesel';
  conventionalFuel = 'diesel';
} else if (fuel == 'bioethanol/petrol') {
  biofuel = 'bioethanol';
  conventionalFuel = 'petrol';
} else if (fuel == 'biomethane/cng') {
  biofuel = 'biomethane';
  conventionalFuel = 'cng';
}
// I've no doubt there is a more elegant way of doing this...
if (mass) {

  directBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massDirectCO2ePerMass'));
  directConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massDirectCO2ePerMass'));
  directCO2eEmissions = mass * ((biofuelPercentage * directBioFactor) + ((1 - biofuelPercentage) * directConvFactor));
  
  indirectBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massIndirectCO2ePerMass'));
  indirectConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massIndirectCO2ePerMass'));
  indirectCO2eEmissions = mass * ((biofuelPercentage * indirectBioFactor) + ((1 - biofuelPercentage) * indirectConvFactor));
  
  lifeCycleBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massTotalCO2ePerMass'));
  lifeCycleConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massTotalCO2ePerMass'));
  lifeCycleCO2eEmissions = mass * ((biofuelPercentage * lifeCycleBioFactor) + ((1 - biofuelPercentage) * lifeCycleConvFactor));
  
  biogenicBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massBiogenicCO2ePerMass'));
  biogenicConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massBiogenicCO2ePerMass'));
  biogenicCO2eEmissions = mass * ((biofuelPercentage * biogenicBioFactor) + ((1 - biofuelPercentage) * biogenicConvFactor));
  
  returnValues.addNote('comment', 'Calculation made on the basis of mass');
  
} else if (volume) {

  if (fuel == 'biomethane/cng') {
    
    directCO2eEmissions = 0;
    indirectCO2eEmissions = 0;  
    lifeCycleCO2eEmissions = 0;
    biogenicCO2eEmissions = 0; 
    returnValues.addNote('comment', 'Biomethane/CNG emissions cannot be determined on the basis of volume');
  
  } else {
  
    directBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massDirectCO2ePerVolume'));
    directConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massDirectCO2ePerVolume'));
    directCO2eEmissions = volume * ((biofuelPercentage * directBioFactor) + ((1 - biofuelPercentage) * directConvFactor));
  
    indirectBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massIndirectCO2ePerVolume'));
    indirectConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massIndirectCO2ePerVolume'));
    indirectCO2eEmissions = volume * ((biofuelPercentage * indirectBioFactor) + ((1 - biofuelPercentage) * indirectConvFactor));
  
    lifeCycleBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massTotalCO2ePerVolume'));
    lifeCycleConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massTotalCO2ePerVolume'));
    lifeCycleCO2eEmissions = volume * ((biofuelPercentage * lifeCycleBioFactor) + ((1 - biofuelPercentage) * lifeCycleConvFactor));
  
    biogenicBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massBiogenicCO2ePerVolume'));
    biogenicConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massBiogenicCO2ePerVolume'));
    biogenicCO2eEmissions = volume * ((biofuelPercentage * biogenicBioFactor) + ((1 - biofuelPercentage) * biogenicConvFactor));
  
    returnValues.addNote('comment', 'Calculation made on the basis of volume');
  
  }
  
} else if (energy) {

  directBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massDirectCO2ePerEnergy'));
  directConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massDirectCO2ePerEnergy'));
  directCO2eEmissions = energy * ((biofuelPercentage * directBioFactor) + ((1 - biofuelPercentage) * directConvFactor));
  
  indirectBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massIndirectCO2ePerEnergy'));
  indirectConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massIndirectCO2ePerEnergy'));
  indirectCO2eEmissions = energy * ((biofuelPercentage * indirectBioFactor) + ((1 - biofuelPercentage) * indirectConvFactor));
  
  lifeCycleBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massTotalCO2ePerEnergy'));
  lifeCycleConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massTotalCO2ePerEnergy'));
  lifeCycleCO2eEmissions = energy * ((biofuelPercentage * lifeCycleBioFactor) + ((1 - biofuelPercentage) * lifeCycleConvFactor));
  
  biogenicBioFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/biofuel', 'fuel='+biofuel, 'massBiogenicCO2ePerEnergy'));
  biogenicConvFactor = parseFloat(dataFinder.getDataItemValue('business/energy/stationaryCombustion/defra/blends/conventional', 'fuel='+conventionalFuel, 'massBiogenicCO2ePerEnergy'));
  biogenicCO2eEmissions = energy * ((biofuelPercentage * biogenicBioFactor) + ((1 - biofuelPercentage) * biogenicConvFactor));
  
  returnValues.addNote('comment', 'Calculation made on the basis of energy');
  
} else {

  directCO2eEmissions = 0;
  indirectCO2eEmissions = 0;  
  lifeCycleCO2eEmissions = 0;
  biogenicCO2eEmissions = 0; 
  returnValues.addNote('comment', 'No mass, energy or volume quantity specified');
  
}

// set values
returnValues.putValue('directCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.putValue('bioCO2', 'kg',null, biogenicCO2eEmissions);
returnValues.setDefaultType('directCO2e');
