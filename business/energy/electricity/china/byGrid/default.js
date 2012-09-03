// area or none
try {
  area=responsibleArea/totalArea
  }

catch (error){
  area=1
  }

totalEmissions=massCO2PerEnergy.multiply(energyPerTime).integrate();
areaEmissions = area * totalEmissions
