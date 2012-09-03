var stoichLimestone = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CaCo3ToCo2','ratio'));
var stoichDolomite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=DolomiteToCO2','ratio'));

mass * (fractionLimestone * stoichLimestone + fractionDolomite * stoichDolomite) * purity * 1000;
