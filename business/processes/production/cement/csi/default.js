// CO2 from calcination of clinker

clinkerCO2 = EF * clinkerQuantity

// CO2 from calcination of bypass dust leaving the kiln system

bypassCO2 = EF * bypassDust

// CO2 from calination of CKD leaving the kiln system

ckdCO2 = (quantityCKD * EF) / (1 + EF) * (calcinationCKD/100) / (1 - EF / (1 + EF) * (calcinationCKD/100))

// CO2 from organic carbon content of raw material

cToCo2 = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio');

carbonCO2 = (carbonContent/100) * rawClinkerRatio * clinkerQuantity * cToCo2

// sum above

clinkerCO2 + bypassCO2 + ckdCO2 + carbonCO2
