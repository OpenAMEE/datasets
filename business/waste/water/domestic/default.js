
var quantity;
try {
  quantity = totalOrganicWaste;
} catch(error) {
  quantity = volume * massOrganicPerVolume / 1000000;
}

var maxCapacity;
if (isCOD == 'true') {
  maxCapacity = massPerMassCODMax;
} else {
  maxCapacity = massPerMassBODMax;
}

// check recovered not greater than emitted (methane)
grossCH4Emissions = ( quantity - massSludge ) * maxCapacity * methaneConversionFactor;

if (grossCH4Emissions >= recoveredMethane) {
  ch4Emissions = grossCH4Emissions - recoveredMethane;
  ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
  co2eEmissions = ch4Emissions * ch4GWP;
  returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
} else {
  ch4Emissions = 0;
  co2eEmissions = 0;
  returnValues.addNote('comment', 'Recovered CH4 quantity specified exceeds emitted CH4');
}

returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');




