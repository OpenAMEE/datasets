function poundsToKilograms(pounds) {
  return pounds * 0.45359237;
}

function kiloToMega(kilo) {
  return kilo / 1000.0;
}

function kiloToGiga(kilo) {
  return kilo / 1000000.0;
}


var lossFactor;
if (includeTransmissionLosses == 'true') {
    lossFactor = dataFinder.getDataItemValue('business/energy/electricity/epa/transmission', 'region='+gridRegion, 'factor');
    lossFactor = 1-(parseFloat(lossFactor) / 100.0);
} else {
  lossFactor = 1.0;
}


co2Emissions = poundsToKilograms(massCO2PerEnergy/lossFactor) * kiloToMega(energy);
ch4Emissions = poundsToKilograms(massCH4PerEnergy/lossFactor) * kiloToGiga(energy);
n2oEmissions = poundsToKilograms(massN2OPerEnergy/lossFactor) * kiloToGiga(energy);
co2eEmissions = poundsToKilograms(massCO2ePerEnergy/lossFactor) * kiloToMega(energy);
noxEmissions = poundsToKilograms(massNOxPerEnergy/lossFactor) * kiloToMega(energy);
ozoneNoxEmissions = poundsToKilograms(massOzoneSeasonNOxPerEnergy/lossFactor) * kiloToMega(energy);
so2Emissions = poundsToKilograms(massSO2PerEnergy/lossFactor) * kiloToMega(energy);

try {
  hgEmissions = poundsToKilograms(massHgPerEnergy/lossFactor) * kiloToGiga(energy);
} catch(error) {
  hgEmissions = 0;
}

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.putValue('N2O', 'kg',null, n2oEmissions);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.putValue('NOx', 'kg',null, noxEmissions);
returnValues.putValue('ozoneSeasonNOx', 'kg',null, ozoneNoxEmissions);
returnValues.putValue('SO2', 'kg',null, so2Emissions);
returnValues.putValue('Hg', 'kg',null, hgEmissions);
returnValues.setDefaultType('CO2e');
