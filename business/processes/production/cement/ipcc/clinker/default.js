// establish stoich ratios...
// CO2 produced during calcination of limestone (CaCO3)
stoichCO2 = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CaCo3ToCo2', 'ratio'));
// CaO produced during calcination of limestone (CaCO3)
stoichCaO = parseFloat(dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CaCO3ToCaO', 'ratio'));

// establish fraction of clinked derived from carbonates (limestone, basically)
clinkerCarbonateFraction = clinkerCaOFraction * carbonateCaOFraction / stoichCaO;

// establish CO2 emissions factor for clinker based on carbonate consumed
clinkerEmissionsFactor =  clinkerCarbonateFraction * stoichCO2;


// establish emissions conversion factor for cement kiln dust based on quantity of dust, carbonate fraction and fraction calcined
try {
  cementKilnDustConversionFactor = 1 + (massCementKilnDust / massClinker) * clinkerCarbonateFraction * cementKilnDustCalcinedFraction * (stoichCO2 / clinkerEmissionsFactor);
} catch(error) { // if cement kink dust quantity and calcined fraction not specified, calcuate emissions excluding the dust component
  cementKilnDustConversionFactor = 1;
}

// calculate emissions
massClinker * clinkerEmissionsFactor * cementKilnDustConversionFactor * 1000; // convert tonnes to kgs

