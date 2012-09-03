var ureaToCarbon = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=ureaToCarbon','ratio');
var CarbonToCO2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

mass * ureaToCarbon * purity * CarbonToCO2;




