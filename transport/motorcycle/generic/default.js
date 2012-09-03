//Get the fuel factor, kgCO2 per litre
//All motorcycles are petrol
fuelFac = dataFinder.getDataItemValue('home/energy/quantity', 'type=petrol', 'kgCO2PerLitre');

try {
     var f = fuelConsumed;
} catch(error) {
     fuelConsumed = null;
}

// now calculate the kgCO2 emissions
if (fuelConsumed != null) {
     fuelConsumed * fuelFac;
} else {
     fac=0.;
     if(ownFuelConsumption!=null && ownFuelConsumption>0){
          fac=fuelFac/ownFuelConsumption;
     } else {
          if(fuelConsumption!=null && fuelConsumption>0){
               fac=1.15*fuelFac/fuelConsumption;
          } else {
               fac= kgCO2PerKm;
          }
     }
     if(useTypicalDistance=='true') {
          distance=typicalDistance;
     }
     if(occupants>0) {
          fac * distance/occupants;
     } else {
          fac * distance;
     }
}
