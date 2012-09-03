// area or none
try {
  area=responsibleArea/totalArea
  }

catch (error){
  area=1
  }

co2 = dataFinder.getDataItemValue('business/energy/electricity/china/byGrid', 'gridName='+gridName,'massCO2PerEnergy')

co2 * area * energyPerTime
