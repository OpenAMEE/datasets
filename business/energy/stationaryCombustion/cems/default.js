// Establish if CO2 concentration provided
try {
  var c = carbonDioxideConcentration;
} catch(error) {
  carbonDioxideConcentration = null;
}

// Establish if oxygen concentration provided
try {
  var c = oxygenConcentration;
} catch(error) {
  oxygenConcentration = null;
}

// Establish CO2 concentration using oxygen as proxy if necessary
if (oxygenConcentration == null && carbonDioxideConcentration == null) {
  carbonDioxideConcentration = 0;
} else if (carbonDioxideConcentration == null) {
  carbonDioxideConcentration = (1.0 / ambientO2Concentration) * (volumeCO2PerEnergy / volumeDryFlueGasPerEnergy) * ((ambientO2Concentration * (1 - moistureContent)) - oxygenConcentration);
}

// Calculate volumetric CO2 emissions rate
volumeCO2PerTime = carbonDioxideConcentration * flowRate * (1 - moistureContent);
// Calculate mass-based CO2 emissions rate
massCO2PerTime = volumeCO2PerTime * density;
// Calculate total CO2 emissions
emissions = massCO2PerTime * operatingTime;
