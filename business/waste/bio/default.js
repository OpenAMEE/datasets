
// establish wet or dry weight basis, and define appropriate emissions factors
if (isWetWeight == 'true') {
  ch4Factor = massCH4PerWetMass;
  try {
    var n = massN2OPerWetMass;
    n2oFactor = massN2OPerWetMass;
  } catch(error) {
    n2oFactor = 0;
  }
} else {
  ch4Factor = massCH4PerDryMass;
  try {
    var n = massN2OPerDryMass;
    n2oFactor = massN2OPerDryMass;
  } catch(error) {
    n2oFactor = 0;
  }
}

// set recovered quantity to zero if not specified
try {
  var r = recoveredMethane;
} catch(error) {
  recoveredMethane = 0;
}

grossCH4emissions = mass * (ch4Factor / 1000); // convert factor from g/kg to kg/kg (equivalent to Gg/Gg)
// check recovered not greater than emitted (methane)
if (grossCH4emissions > recoveredMethane) { // Gg value > Gg value
  netCH4emissions = (grossCH4emissions - recoveredMethane) * 1000000; // convert Gg to kg
} else {
  netCH4emissions = 0;
  returnValues.addNote('comment', 'Recovered methane exceeds emitted methane');
}

n2oEmissions = (mass * 1000000) * (n2oFactor / 1000); // convert mass from Gg to kg and factor from g/kg to kg/kg

var ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); //global warming potential for CH4
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
var n2oGWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); //global warming potential for N2O
returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);

co2eEmissions = (netCH4emissions * ch4GWP) + (n2oEmissions * n2oGWP);

returnValues.putValue('CH4', 'kg', null, netCH4emissions);
returnValues.putValue('N2O', 'kg', null, n2oEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 


