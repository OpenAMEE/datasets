ch4gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
n2ogwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=N2O', 'GWP');

// turning those EFs without values into zeros
try{
  co2 = kgCO2PerUsGallon
}
catch(error){
  co2 = 0
}
try{
  ch4EF = kgCH4PerUsGallon
}
catch(error){
  ch4EF = 0
}
try{
  n2oEF = kgN2OPerUsGallon
}
catch(error){
  n2oEF = 0
}

// co2 or co2e?
if(CO2eOrCO2 =="CO2 only"){
  co2 * fuelQuantity
}

else{
  (co2 + (n2oEF * n2ogwp) + (ch4EF * ch4gwp)) * fuelQuantity
}
