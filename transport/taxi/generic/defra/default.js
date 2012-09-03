//Get the fuel factor, kgCO2 per litre
//All taxis are diesel
fuelFac = dataFinder.getDataItemValue('business/energy/fuel/defra', 'fuel=diesel,netOrGross=net,unit=volume', 'kgCO2PerUnit');
try{
  totalFuelConsumed * fuelFac;
} catch(err){
  // now calculate the kgCO2e emissions
  fac=0.;
  if(ownFuelConsumption!=null && ownFuelConsumption>0){
    fac=fuelFac/ownFuelConsumption;
  } else {
    fac= kgCO2PerKmPassenger + kgCO2ePerKmForCH4 + kgCO2ePerKmForN2O;
  }
  try {
    var n=numberOfPassengers;
  } catch(err){
    numberOfPassengers=assumedOccupancy;
  }
  fac*=numberOfPassengers;
  try{
    var c = isReturn;
    if(isReturn=="true"){
      numberOfJourneys*=2;
    }
  } catch(err){    isReturn=false;
  }
  fac*numberOfJourneys*distancePerJourney;
}
