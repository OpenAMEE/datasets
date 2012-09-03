// Default or user value of Clinker Content %

try{
  clinkerRatio = (clinkerContent/100.00)
}

catch(error){
  clinkerRatio = (defClinkerContent/100.00)
}

// Calculate CO2 output (0.44 is CO2 to CaCO3 Stoichiometric Ratio)

caCo3ToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CaCo3ToCo2', 'ratio');

cementQuantity * clinkerRatio * rawQuantity * (caco3Ratio/100.00) * caCo3ToCo2
