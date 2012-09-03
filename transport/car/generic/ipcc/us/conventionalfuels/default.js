// define global warming potentials 
var gwpCH4 = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); 
var gwpN2O = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); 

// establish CO emissions factor using fuel data
// first, define CO2 emissions factor variables
var massCO2PerEnergy;
var energyPerVolume;
var CO2VolumeFactor;
var CO2DistanceFactor;
// get CO2 emissions factor and heating value (by volume) from /transport/byFuel
if(fuel == "gasoline"){
     massCO2PerEnergy = dataFinder.getDataItemValue('transport/byFuel','fuel=Gasoline / petrol,version=IPCC 06','EFNRGCO2');
     energyPerVolume = dataFinder.getDataItemValue('transport/byFuel','fuel=Gasoline / petrol,version=IPCC 06','HVVolume');
} else {// i.e. diesel
     massCO2PerEnergy = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','EFNRGCO2');
     energyPerVolume = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','HVVolume');
}     
// calculate by-volume CO2 emissions factor, convert m^3 to litres
CO2VolumeFactor = (massCO2PerEnergy * energyPerVolume) / 1000;

// emissions factors, convert to CO2e, and milligrams to kgs
var N2ODistanceFactor  =  (massN2OPerDistance*gwpN2O)/1000000;
var N2OStartFactor  =  (massN2OPerStart*gwpN2O)/1000000;
var CH4DistanceFactor  =  (massCH4PerDistance*gwpCH4)/1000000;
var CH4StartFactor  =  (massCH4PerStart*gwpCH4)/1000000;

try {
    var d = distance;
} catch(error) {
     distance = "";
}

try {
    var dPJ = distancePerJourney;
} catch(error) {
     distancePerJourney = "";
}

try{
     var fE = fuelEfficiency;
 } catch(error) {
     fuelEfficiency = "";
}

try{
     var f = frequency;
} catch(error) {
     frequency = "";
}

if(distance == "" && distancePerJourney == ""){
     (CO2VolumeFactor * fuelConsumed)/occupancy;
} else {
     var journeys = numberOfJourneys
     if(frequency==""){
          journeys*=1;
     } 
     if(frequency=="monthly"){
          journeys*=12;
     } 
     if(frequency=="weekly"){
          journeys*=52;
     } 
     if(frequency=="daily"){
          journeys*=365;
     } 
     
     if (distancePerJourney == ""){
          if(fuelEfficiency == ""){ //CO2 fuel-based calcualtion
               ((distance * (N2ODistanceFactor + CH4DistanceFactor)) + ((N2OStartFactor + CH4StartFactor) * journeys) + (CO2VolumeFactor * fuelConsumed))/occupancy;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               ((distance * (N2ODistanceFactor + CH4DistanceFactor + CO2DistanceFactor)) + ((N2OStartFactor + CH4StartFactor) * journeys))/occupancy;
          }
     } else {
          if(fuelEfficiency == ""){ //CO2 fuel-based calcualtion
               ((distancePerJourney * journeys * (N2ODistanceFactor + CH4DistanceFactor)) + ((N2OStartFactor + CH4StartFactor) * journeys) + (CO2VolumeFactor * fuelConsumed))/occupancy;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               ((distancePerJourney * journeys * (N2ODistanceFactor + CH4DistanceFactor + CO2DistanceFactor)) + ((N2OStartFactor + CH4StartFactor) * journeys))/occupancy;
          }
     }
}
