// calculate emissions from raw carbonate inputs
// check which quantities have been set in order to save on datafinder time
try {
     var c = massCalcite;
     var stoichCalcite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CaCo3ToCo2','ratio'));
     var calciteEmissions = massCalcite * fractionCalcite * stoichCalcite * 1000; // convert tonnes to kg
} catch(error) {
     massCalcite = 0;
     calciteEmissions = 0;
}
try {
     var m = massMagnesite;
     var stoichMagnesite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=MagnesiteToCO2','ratio'));
     var magnesiteEmissions = massMagnesite * fractionMagnesite * stoichMagnesite * 1000; // convert tonnes to kg
} catch(error) {
     massMagnesite = 0;
     magnesiteEmissions = 0;
}
try {
     var m = massDolomite;
     var stoichDolomite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=DolomiteToCO2','ratio'));
     var dolomiteEmissions = massDolomite * fractionDolomite * stoichDolomite * 1000; // convert tonnes to kg
} catch(error) {
     massDolomite = 0;
     dolomiteEmissions = 0;
}
try {
     var m = massSiderite;
     var stoichSiderite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=SideriteToCO2','ratio'));
     var sideriteEmissions = massSiderite * fractionSiderite * stoichSiderite * 1000; // convert tonnes to kg
} catch(error) {
     massSiderite = 0;
     sideriteEmissions = 0;
}
try {
     var m = massAnkerite;
     var stoichAnkerite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=AnkeriteToCO2','ratio'));
     var AnkeriteEmissions = massAnkerite * fractionAnkerite * stoichAnkerite * 1000; // convert tonnes to kg
} catch(error) {
     massAnkerite = 0;
     AnkeriteEmissions = 0;
}
try {
     var m = massRhodochrosite;
     var stoichRhodochrosite = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=RhodochrositeToCO2','ratio'));
     var rhodochrositeEmissions = massRhodochrosite * fractionRhodochrosite * stoichRhodochrosite * 1000; // convert tonnes to kg
} catch(error) {
     massRhodochrosite = 0;
     rhodochrositeEmissions = 0;
}
try {
     var s = massSodaAsh;
     var stoichSodaAsh = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=Na2Co3ToCo2','ratio'));
     var sodaAshEmissions = massSodaAsh * fractionSodaAsh * stoichSodaAsh * 1000; // convert tonnes to kg
} catch(error) {
     massSodaAsh = 0
     sodaAshEmissions = 0;
}

// total carbonate emissions
carbonateEmissions = calciteEmissions + magnesiteEmissions + dolomiteEmissions + sideriteEmissions + AnkeriteEmissions + rhodochrositeEmissions + sodaAshEmissions;

// establish fraction of all inputs represented by calcite/aragonite - this is used in the cement kiln dust calculation (which assumes all cement kiln dust is calcium carbonate)
weightFractionCalcite = massCalcite / (massCalcite + massMagnesite + massDolomite + massSiderite + massAnkerite + massRhodochrosite + massSodaAsh);

// calculate 'emissions' remaining within uncalcined cement kiln dust
cementKilnDustEmissions = massCementKilnDust * weightFractionCalcite * (1 - fractionCementKilnDust) * stoichCalcite * 1000; // convert tonnes to kg

// calculate emissions from other carbon-bearing inputs
carbonBearingMaterialsEmissions = massOther * carbonFraction * massCO2PerMassCarbon * 1000; // convert tonnes to kg

// Total emissions = carbonate emissions + other carbon emissions - the uncalcined fraction of the cement kiln dust
carbonateEmissions - cementKilnDustEmissions + carbonBearingMaterialsEmissions;
