stoichCalOx = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CalciumOxideToCO2', 'ratio'));
stoichCalHydrox = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CalciumHydroxideToCO2', 'ratio'));

var quickLimeEmissions = massQuickLimePerTime * purityQuickLime * stoichCalOx;
var slakedLimeEmissions = massSlakedLimePerTime * puritySlakedLime * stoichCalHydrox;

(quickLimeEmissions + slakedLimeEmissions) * 1000; // input values default to tonnes to x 1000 to convert to kgs
