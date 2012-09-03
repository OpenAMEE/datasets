var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

var consumptionBased = true;
var productionBased = true;

try {
  var h = massHydrogen;
  var f = massFeedstockPerMassHydrogen;
} catch(error) {
  productionBased = false;
}

try {
  var h = massFeedstock;
} catch(error) {
  consumptionBased = false;
}

if (consumptionBased == true) {
  (((((massFeedstock * feedstockCarbon * feedstockOxidation) - carbonRecovered) * stoich) - CO2Recovered) * operatingDuration) * 1000;
} else if (productionBased == true) {
  (((((massHydrogen * massFeedstockPerMassHydrogen * feedstockCarbon * feedstockOxidation) - carbonRecovered) * stoich) - CO2Recovered) * operatingDuration) * 1000;
} else {
  0;
}
