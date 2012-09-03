seasonFac=1.;
try {//see if season exists
  var s = season;
  if(type=='coal' || type=='coking coal' || type=='biomass') {
    fuel='solidFuel';
  }
  else if(type=='gas' || type=='lpg'){
    fuel='gas';
  }
  else if(type=='electricity' || type=='electricityE7'){
    fuel='electricity';
    if(includesHeating=='true'){
       fuel='electricityWithHeating';
    }
  }
  else {
    fuel='oil';
  }
  seasonFac = 0.25/dataFinder.getDataItemValue('home/energy/uk/seasonal', 'name='+season+',energy='+fuel, 'percentage');
}
catch(err){
  seasonFac=1.;
}

seasonFac*currencyGBP * kgCO2PerPound