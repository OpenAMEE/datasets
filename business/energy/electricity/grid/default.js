// area or none
try {
  area=responsibleArea/totalArea
  }

catch (error){
  area=1
  }

co2 = massCO2PerEnergy.multiply(area).multiply(energyPerTime).integrate()
