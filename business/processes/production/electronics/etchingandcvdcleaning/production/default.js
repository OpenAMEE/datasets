// establish fraction of fluorinated compounds used. This is only applicable for photovoltaics and so the factor is otherwise set to 1.
try {
  var f =fractionFluorinatedCompounds;
  if (sector != 'PV-cells') {
    fractionFluorinatedCompounds = 1;
  }
} catch(error) {
  fractionFluorinatedCompounds = 1;
}

// get gwps
function getGWP(gasType) {
  gwp = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+gasType,'GWP'));
  return gwp
}

// establish emissions of each gas, where appropriate
try {
  cf4Emissions = massCF4PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  cf4GWP = getGWP('CF4');
  returnValues.addNote('comment', 'CF4 emissions converted to CO2e using a global warming potential of '+cf4GWP);
} catch(error) {
  ch4Emissions = 0;
  ch4GWP = 0;
  returnValues.addNote('comment', 'CF4 emissions are not specified in IPCC methodology for this item');
}
   
try {
  c2f6Emissions = massC2F6PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  c2f6GWP = getGWP('C2F6');
  returnValues.addNote('comment', 'C2F6 emissions converted to CO2e using a global warming potential of '+c2f6GWP);
} catch(error) {
  c2f6Emissions = 0;
  c2f6GWP = 0;
  returnValues.addNote('comment', 'C2F6 emissions are not specified in IPCC methodology for this item');
}

try {
  chf3Emissions = massCHF3PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  chf3GWP = getGWP('HFC-23'); // synonym
  returnValues.addNote('comment', 'CHF3 emissions converted to CO2e using a global warming potential of '+chf3GWP);
} catch(error) {
  chf3Emissions = 0;
  chf3GWP = 0;
  returnValues.addNote('comment', 'CHF3 emissions are not specified in IPCC methodology for this item');
}

try {
  c3f8Emissions = massC3F8PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  c3f8GWP = getGWP('C3F8');
  returnValues.addNote('comment', 'C3F8 emissions converted to CO2e using a global warming potential of '+c3f8GWP);
} catch(error) {
  c3f8Emissions = 0;
  c3f8GWP = 0;
  returnValues.addNote('comment', 'C3F8 emissions are not specified in IPCC methodology for this item');
}

try {
  nf3Emissions = massNF3PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  nf3GWP = getGWP('NF3');
  returnValues.addNote('comment', 'NF3 emissions converted to CO2e using a global warming potential of '+nf3GWP);
} catch(error) {
  nf3Emissions = 0;
  nf3GWP = 0;
  returnValues.addNote('comment', 'NF3 emissions are not specified in IPCC methodology for this item');
}

try {
  sf6Emissions = massSF6PerArea * capacity * fractionCapacityUtilised * fractionFluorinatedCompounds;
  sf6GWP = getGWP('SF6');
  returnValues.addNote('comment', 'SF6 emissions converted to CO2e using a global warming potential of '+sf6GWP);
} catch(error) {
  sf6Emissions = 0;
  sf6GWP = 0;
  returnValues.addNote('comment', 'SF6 emissions are not specified in IPCC methodology for this item');
}

// establish aggregate emissions factor
co2eEmissions = (cf4Emissions * cf4GWP) + (c2f6Emissions * c2f6GWP) + (chf3Emissions * chf3GWP) + (c3f8Emissions * c3f8GWP) + (nf3Emissions * nf3GWP) + (sf6Emissions * sf6GWP);

returnValues.putValue('CF4', 'kg', null, cf4Emissions);
returnValues.putValue('C2F6', 'kg', null, c2f6Emissions);
returnValues.putValue('CHF3', 'kg', null, chf3Emissions);
returnValues.putValue('C3F8', 'kg', null, c3f8Emissions);
returnValues.putValue('NF3', 'kg', null, nf3Emissions);
returnValues.putValue('SF6', 'kg', null, sf6Emissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
