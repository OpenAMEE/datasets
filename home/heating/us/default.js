//throws an error if kgCO2PerYear undeclared
try { 
  var c=kgCO2PerYear;
}
catch(err){
  kgCO2PerYear=0.;
}

if(kgCO2PerYear>0.){ //for ustest, temp
  kgCO2PerYear/12.;
}
else {
  elecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=US', 'kgCO2PerKWh');

  result=0.;
  heatingkWh = kWhPerYearSpace+kWhPerYearWater;
  if(fuel == "electricity"){
    result=heatingkWh*elecValue;
  }
  else if(fuel == "natural gas"){
    gasValue = dataFinder.getDataItemValue('home/energy/quantity', 'type=gas', 'kgCO2PerKWh');
    result=heatingkWh*gasValue;
  }
  else if(fuel == "fuel oil"){
    oilValue = dataFinder.getDataItemValue('home/energy/quantity', 'type=oil', 'kgCO2PerKWh');
    result=heatingkWh*oilValue;
  }

  if(isAirCon == "true"){
    result+=kWhPerYearAirCon*elecValue;
  }
  result;
}
