function capitalize(string) {
  var firstLetter = string.substr(0, 1);
  return firstLetter.toUpperCase() + string.substr(1).toLowerCase();
}

var energyPerWindowFill = 0;
var massCO2PerWindowFill = 0;

if (glazing == 'Double') {
  var fill = capitalize(fill);

  if (fill == 'Krypton' || fill == 'Xenon') {
    energyPerWindowFill = parseFloat(dataFinder.getDataItemValue('embodied/ice/v2/window/fill','type='+fill,'energyPerWindow'));
    massCO2PerWindowFill = parseFloat(dataFinder.getDataItemValue('embodied/ice/v2/window/fill','type='+fill,'massCO2PerWindow'));  
  }
}

energy = (energyPerWindow + energyPerWindowFill) * number;
co2Emissions = (massCO2PerWindow + massCO2PerWindowFill) * number;

returnValues.putValue('energy', 'MJ',null, energy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.setDefaultType('CO2');
