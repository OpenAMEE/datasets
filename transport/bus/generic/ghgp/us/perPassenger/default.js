ch4gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2ogwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');

try{
  co2 = kgCO2PerPassengerMile
}
catch(error){
  co2 = 0
}
try{
  ch4 = (gCH4PerPassengerMile / 1000) * ch4gwp
}
catch(error){
  ch4 = 0
}
try{
  n2o = (gN2OPerPassengerMile / 1000) * n2ogwp
}
catch(error){
  n2o = 0
}

(co2+ch4+n2o) * distance * numberOfPassengers
