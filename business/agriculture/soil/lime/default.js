// methodology sugests using 'emissions factor' and the stoich ratio for CO2, i.e. 44/12
// the 'emissions factor', however, is simply the stoich for limestone/dolomite => C
// so may as well just used the combined stoich ratios for imestone/dolomite => CO2 which are already in the /planet category

if (type == 'limestone') {
     stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CaCo3ToCo2','ratio'));
} else {
     stoich = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=DolomiteToCO2','ratio'));
}
massUsed * stoich *1000; // convert tonnes to kg

