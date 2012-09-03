// establish C to CO2 stoichiometry
var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

// establish which values specified for basing electrode emissions on...
try {
  var s = steelQuantity;
} catch(error) {
  steelQuantity = null;
}

try {
  var e = electrodeQuantity;
} catch(error) {
  electrodeQuantity = null;
}

try {
  var c = electrodeCarbon;
} catch(error) {
  electrodeCarbon = null;
}

// calculate electrode carbon based on data specified
var totalElectrodeCarbon;
if (electrodeQuantity && electrodeCarbon) {
  totalElectrodeCarbon = electrodeQuantity * electrodeCarbon;
} else if (steelQuantity) {
  totalElectrodeCarbon = steelQuantity * massElectrodeCarbonPerMassSteel;
} else {
  totalElectrodeCarbon = 0;
}

totalFluxCarbon = fluxQuantity * fluxPurity * fluxCarbon;

(totalFluxCarbon + totalElectrodeCarbon) * stoich * 1000;
