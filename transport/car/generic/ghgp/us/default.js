ch4gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2ogwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');

try{
  ch4 = (ch4gwp * gCH4PerMile) / 1000
}
catch(error){
  ch4 = 0
}
try{
  n2o = (n2ogwp * gN2OPerMile) / 1000
}
catch(error){
  n2o = 0
}
try{
  co2 = kgCO2PerMile 
}
catch(error){
  co2 = 0
}

distance * (co2 + ch4 + n2o) / occupancy;
