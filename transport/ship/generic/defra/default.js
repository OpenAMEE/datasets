fac= kgCO2PerKmPassenger + kgCO2ePerKmForCH4 + kgCO2ePerKmForN2O;



try {
  var n=numberOfPassengers;
}
catch(err){
  numberOfPassengers=1;
}

fac*=numberOfPassengers;

try {
  var c = isReturn;
  if(isReturn=="true"){
	numberOfJourneys*=2;
  }
} catch(err){
  isReturn=false;
}

fac*numberOfJourneys*distancePerJourney;
