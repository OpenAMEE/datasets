var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

(massInorganicCarbonPerMass / 100) * mass * stoich * 1000 * operatingDuration;
