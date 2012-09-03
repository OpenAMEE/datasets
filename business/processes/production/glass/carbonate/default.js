// check which quantities have been set in order to save on datafinder time
try {
     var c = massCalcite;
     var stoichCalcite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CaCo3ToCo2','ratio'));
     var calciteEmissions = massCalcite * fractionCalcite * stoichCalcite * 1000; // convert tonnes to kg
} catch(error) {
     calciteEmissions = 0;
}
try {
     var m = massMagnesite;
     var stoichMagnesite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=MagnesiteToCO2','ratio'));
     var magnesiteEmissions = massMagnesite * fractionMagnesite * stoichMagnesite * 1000; // convert tonnes to kg
} catch(error) {
     magnesiteEmissions = 0;
}
try {
     var m = massDolomite;
     var stoichDolomite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=DolomiteToCO2','ratio'));
     var dolomiteEmissions = massDolomite * fractionDolomite * stoichDolomite * 1000; // convert tonnes to kg
} catch(error) {
     dolomiteEmissions = 0;
}
try {
     var m = massSiderite;
     var stoichSiderite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=SideriteToCO2','ratio'));
     var sideriteEmissions = massSiderite * fractionSiderite * stoichSiderite * 1000; // convert tonnes to kg
} catch(error) {
     sideriteEmissions = 0;
}
try {
     var m = massAnkerite;
     var stoichAnkerite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=AnkeriteToCO2','ratio'));
     var AnkeriteEmissions = massAnkerite * fractionAnkerite * stoichAnkerite * 1000; // convert tonnes to kg
} catch(error) {
     AnkeriteEmissions = 0;
}
try {
     var m = massRhodochrosite;
     var stoichRhodochrosite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=RhodochrositeToCO2','ratio'));
     var rhodochrositeEmissions = massRhodochrosite * fractionRhodochrosite * stoichRhodochrosite * 1000; // convert tonnes to kg
} catch(error) {
     rhodochrositeEmissions = 0;
}
try {
     var s = massSodaAsh;
     var stoichSodaAsh = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=Na2Co3ToCo2','ratio'));
     var sodaAshEmissions = massSodaAsh * fractionSodaAsh * stoichSodaAsh * 1000; // convert tonnes to kg
} catch(error) {
     sodaAshEmissions = 0;
}

calciteEmissions + magnesiteEmissions + dolomiteEmissions + sideriteEmissions + AnkeriteEmissions + rhodochrositeEmissions + sodaAshEmissions;
