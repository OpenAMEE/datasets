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
  lossFactor = dataFinder.getDataSeries('business/energy/electricity/epa/transmission', 'region='+gridRegion, 'factor');
  if (lossFactor == null) {
    lossFactor = dataFinder.getDataItemValue('business/energy/electricity/epa/transmission', 'region='+gridRegion, 'factor');
    lossFactor = 1-(parseFloat(lossFactor) / 100.0);
  } else {
    lossFactor = lossFactor.divide(100.0).subtract(1.0,true);    
  }
} else {
  lossFactor = 1.0;
}

co2Emissions = poundsToKilograms(massCO2PerEnergy.divide(lossFactor).multiply(kiloToMega(energy)).integrate());
ch4Emissions = poundsToKilograms(massCH4PerEnergy.divide(lossFactor).multiply(kiloToGiga(energy)).integrate());
n2oEmissions = poundsToKilograms(massN2OPerEnergy.divide(lossFactor).multiply(kiloToGiga(energy)).integrate());
co2eEmissions = poundsToKilograms(massCO2ePerEnergy.divide(lossFactor).multiply(kiloToMega(energy)).integrate());
noxEmissions = poundsToKilograms(massNOxPerEnergy.divide(lossFactor).multiply(kiloToMega(energy)).integrate());
ozoneNoxEmissions = poundsToKilograms(massOzoneSeasonNOxPerEnergy.divide(lossFactor).multiply(kiloToMega(energy)).integrate());
so2Emissions = poundsToKilograms(massSO2PerEnergy.divide(lossFactor).multiply(kiloToMega(energy)).integrate());

try {
  hgEmissions = poundsToKilograms(massHgPerEnergy.divide(lossFactor).multiply(kiloToGiga(energy)).integrate());
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
