steamEmissions = totalDirectEmissions * ((steamOutput / efficiencySteamProd)/((steamOutput / efficiencySteamProd) + (powerOutput / efficiencyPowerProd)));

elecEmissions = totalDirectEmissions - steamEmissions;

steamEmisFac = steamEmissions / steamOutput;

elecEmisFac = elecEmissions / powerOutput;

var userElectricityEmissions;
var userSteamEmissions;

try {
  var c = electricityConsumed;
  userElectricityEmissions = elecEmisFac * electricityConsumed;
} catch(error) {
  userElectricityEmissions = 0;
}

try {
  var s = steamConsumed;
  userSteamEmissions = steamEmisFac * steamConsumed;
} catch(error) {
  userSteamEmissions = 0;
}


returnValues.putValue('totalPlantElectricityEmissions','kg',null,elecEmissions);
returnValues.putValue('totalPlantSteamEmissions','kg',null,steamEmissions);

returnValues.putValue('emissionsPerUnitElectricity','kg','kWh',elecEmisFac);
returnValues.putValue('emissionsPerUnitSteam','kg','kWh',steamEmisFac);

returnValues.putValue('consumedElectricityEmissions','kg',null,userElectricityEmissions);
returnValues.putValue('consumedSteamEmissions','kg',null,userSteamEmissions);

returnValues.setDefaultType('totalPlantElectricityEmissions');

