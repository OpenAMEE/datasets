// get efficiency factors for desctructive emissions control technologies (if required, and if valid for specific gas)
function emissionsDestruction(gasType) {
     var efficiencyFactor;
     if (destroyedFraction > 0) {
          if (gasType == "CF4" || gasType == "C2F6" || gasType == "CHF3" || gasType == "C3F8" || gasType == "c-C4F8" || gasType == "NF3" || gasType == "remote NF3" || gasType == "SF6") {
               efficiencyFactor = parseFloat(dataFinder.getDataItemValue('business/processes/production/electronics/etchingandcvdcleaning/emissionscontrol','gas='+gasType,'destructionEfficiency'));
          } else {
               efficiencyFactor = 0;
          }
     } else {
          efficiencyFactor = 0;
     }
     return efficiencyFactor;
}
// get efficiency factors for capture/recovery emissions control technologies (if required, and if valid for specific gas)
function emissionsCapture(gasType) {
     var efficiencyFactor;
     if (capturedFraction > 0) {
          if (gasType == "CF4" || gasType == "C2F6" || gasType == "CHF3" || gasType == "SF6") {
               efficiencyFactor = parseFloat(dataFinder.getDataItemValue('business/processes/production/electronics/etchingandcvdcleaning/emissionscontrol','gas='+gasType,'captureEfficiency'));
          } else {
               efficiencyFactor = 0;
          } 
     } else {
          efficiencyFactor = 0;
     } 
     return efficiencyFactor;
}

// initialize variables for gwp datafinder
function getGWP(gasType) {
     var aType;
     if (gasType == 'CHF3') {
          aType = 'HFC-23';
     } else if (gasType == 'CH2F2') {
          aType = 'HFC-32';
     } else if (gasType == 'c-C4F8') {
          aType = 'C4F8';
     } else if (gasType == 'remote NF3') {
          aType = 'NF3';
     } else {
          aType = gasType;
     }
     var gwp;
     try {
          gwp = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+aType,'GWP'));
     } catch(error) { // for F2 and COF2 which have no gwp, but generate by-product gases (see below)
          gwp = 0;
     }
     return gwp;
}

try {
  var s = massCF4PerMass;
  var CF4byProductEmissions = (1 - heelFraction) * massUsed * massCF4PerMass * (1 - ((destroyedFraction * emissionsDestruction('CF4')) + (capturedFraction * emissionsCapture('CF4'))));
  cf4GWP = getGWP('CF4');
  returnValues.addNote('comment', 'CF4 by-product emissions converted to CO2e using a global warming potential of '+cf4GWP);
} catch(error) {
  CF4byProductEmissions = 0;
  cf4GWP = 0;
  returnValues.addNote('comment', 'CF4 by-product emissions are not specified in IPCC methodology for this item');
}
     
try {
  var s = massC2F6PerMass;
  C2F6byProductEmissions = (1 - heelFraction) * massUsed * massC2F6PerMass * (1 - ((destroyedFraction * emissionsDestruction('C2F6')) + (capturedFraction * emissionsCapture('C2F6'))));
  c2f6GWP = getGWP('C2F6');
  returnValues.addNote('comment', 'C2F6 by-product emissions converted to CO2e using a global warming potential of '+c2f6GWP);
} catch(error) {
  C2F6byProductEmissions = 0;
  c2f6GWP = 0;
  returnValues.addNote('comment', 'C2F6 by-product emissions are not specified in IPCC methodology for this item');
}

try {
  var s = massC3F8PerMass;
  C3F8byProductEmissions = (1 - heelFraction) * massUsed * massC3F8PerMass * (1 - ((destroyedFraction * emissionsDestruction('C3F8')) + (capturedFraction * emissionsCapture('C3F8'))));
  c3f8GWP = getGWP('C3F8');
  returnValues.addNote('comment', 'C3F8 by-product emissions converted to CO2e using a global warming potential of '+c3f8GWP);
} catch(error) {
  C3F8byProductEmissions = 0;
  c3f8GWP = 0;
  returnValues.addNote('comment', 'C3F8 by-product emissions are not specified in IPCC methodology for this item');
}

try {
  var s = massCHF3PerMass;
  CHF3byProductEmissions = (1 - heelFraction) * massUsed * massCHF3PerMass * (1 - ((destroyedFraction * emissionsDestruction('CHF3')) + (capturedFraction * emissionsCapture('CHF3'))));
  chf3GWP = getGWP('CHF3');
  returnValues.addNote('comment', 'CHF3 by-product emissions converted to CO2e using a global warming potential of '+chf3GWP);
} catch(error) {
  CHF3byProductEmissions = 0;
  chf3GWP = 0;
  returnValues.addNote('comment', 'CHF3 by-product emissions are not specified in IPCC methodology for this item');
}

// calculate emissions for primary gas
primaryGasEmissions = (1 - heelFraction) * massUsed * massPerMass * (1 - ((destroyedFraction * emissionsDestruction(gas)) + (capturedFraction * emissionsCapture(gas))));
primaryGasGWP = getGWP(gas)
returnValues.addNote('comment', gas+' emissions converted to CO2e using a global warming potential of '+primaryGasGWP);

co2eEmissions = (primaryGasEmissions * primaryGasGWP) + (CF4byProductEmissions * cf4GWP) + (C2F6byProductEmissions * c2f6GWP) + (C3F8byProductEmissions * c3f8GWP) + (CHF3byProductEmissions * chf3GWP);

returnValues.putValue('primaryGas', 'kg', null, primaryGasEmissions);
returnValues.putValue('byProductCF4', 'kg', null, CF4byProductEmissions);
returnValues.putValue('byProductC2F6', 'kg', null, C2F6byProductEmissions);
returnValues.putValue('byProductC3F8', 'kg', null, C3F8byProductEmissions);
returnValues.putValue('byProductCHF3', 'kg', null, CHF3byProductEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
