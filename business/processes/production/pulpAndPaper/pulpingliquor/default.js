var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

// establish what basis calculation to be made on - mass or energy
try {
  var m = mass;
} catch(error) {
  mass = null;
}
try {
  var e = energy;
  var g = energyPerMassGross;
  var n = energyPerMassNet;
} catch(error) {
  energy = null;
}

// Calculate
if (mass) { // based on carbon content by weight only
  mass * (carbonContent / 100) * stoich * 1000 * oxidationCorrectionFactor; 
} else if (energy) { // based on carbon content and heating value
  var value;
  if (useGross == 'true') { // test whether higher or lower heating value required
    value = energyPerMassGross;
  } else {
    value = energyPerMassNet;
  }
  energy * ((carbonContent / 100) / value)  * stoich * 1000 * oxidationCorrectionFactor;
} else {
  0;
}
