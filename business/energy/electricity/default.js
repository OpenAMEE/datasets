// area or none
try {
  area=responsibleArea/totalArea
  }

catch (error){
  area=1
  }

// fetch GWPs
ch4Gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2oGwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');

// calculate individual emissions
co2 = massCO2PerEnergy
ch4 = massCH4PerEnergy * ch4Gwp / 1000
n2o = massN2OPerEnergy * n2oGwp / 1000

co2e = (co2 + ch4 + n2o) * area * energyPerTime;
