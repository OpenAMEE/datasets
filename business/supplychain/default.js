
co2Emissions = kgCO2PerPound * amountSpent;
ch4Emissions = kgCH4PerPound * amountSpent;
n2oEmissions = kgN2OPerPound * amountSpent;
hfcEmissions = kgHFCPerPound * amountSpent;
pfcEmissions = kgPFCPerPound * amountSpent;
sf6Emissions = kgSF6PerPound * amountSpent;
co2eEmissions = co2Emissions + ch4Emissions + n2oEmissions + hfcEmissions + pfcEmissions + sf6Emissions;

returnValues.putValue('CO2', 'kg', null, co2Emissions);
returnValues.putValue('ch4CO2e', 'kg', null, ch4Emissions);
returnValues.putValue('n2oCO2e', 'kg', null, n2oEmissions);
returnValues.putValue('hfcCO2e', 'kg', null, hfcEmissions);
returnValues.putValue('pfcCO2e', 'kg', null, pfcEmissions);
returnValues.putValue('sf6CO2e', 'kg', null, sf6Emissions);
returnValues.putValue('totalCO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('totalCO2e'); 
