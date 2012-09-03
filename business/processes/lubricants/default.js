// get C => CO2 ratio
stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio'));

// establish if specified by energy or mass
var energyQuantity;
try {
     energyQuantity = energyConsumed;
} catch(error) {
     energyQuantity = massConsumed * energyPerMass;
}

// calculation
energyQuantity * massCarbonPerEnergy * oxidisedFraction * stoich;
