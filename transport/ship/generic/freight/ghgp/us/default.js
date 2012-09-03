ch4gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2ogwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');
shortTonMileToTonneKm = 0.684944

try{
  co2 = kgCO2PerTonneKm
}
catch(error){
  co2 = 0
}
try{
  ch4 = (gCH4PerShortTonMile / 1000) * shortTonMileToTonneKm * ch4gwp
}
catch(error){
  ch4 = 0
}
try{
  n2o = (gN2OPerShortTonMile / 1000) * shortTonMileToTonneKm * n2ogwp
}
catch(error){
  n2o = 0
}

(co2+ch4+n2o) * distance * mass
