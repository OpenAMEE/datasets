// define global warming potentials 
var gwpCH4 = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); 
var gwpN2O = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); 
var perGallonToPerLitre = 0.2641720523;

// establish CO emissions factor using fuel data
// first, define CO2 emissions factor variables
var massCO2PerVolume;
var CO2VolumeFactor;
var CO2DistanceFactor;
// get CO2 emissions factor and heating value (by volume) from /transport/byFuel
if(fuel == "cng"){
     massCO2PerVolume = dataFinder.getDataItemValue('transport/byFuel/us','fuelType=cng,CO2eOrCO2=CO2 only','kgCO2PerUsGallon');
} else if(fuel == "lpg") {// i.e. diesel
     massCO2PerVolume = dataFinder.getDataItemValue('transport/byFuel/us','fuelType=lpg,CO2eOrCO2=CO2 only','kgCO2PerUsGallon');
}  else if(fuel == "lng") {// i.e. diesel
     massCO2PerVolume = dataFinder.getDataItemValue('transport/byFuel/us','fuelType=lng,CO2eOrCO2=CO2 only','kgCO2PerUsGallon');
}  else if(fuel == "ethanol") {// i.e. diesel
     massCO2PerVolume = dataFinder.getDataItemValue('transport/byFuel/us/biomassfuel','fuelType=ethanol','kgCO2PerUsGallon');
}             
// convert gallons to litres
CO2VolumeFactor = massCO2PerVolume * perGallonToPerLitre;

// emissions factors, convert to CO2e, and milligrams to kgs
var N2ODistanceFactor  =  (massN2OPerDistance*gwpN2O)/1000000;
var CH4DistanceFactor  =  (massCH4PerDistance*gwpCH4)/1000000;

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
     if (distancePerJourney == ""){
          if(fuelEfficiency == ""){ //CO2 fuel-based calcualtion
               ((distance * (N2ODistanceFactor + CH4DistanceFactor)) + (CO2VolumeFactor * fuelConsumed))/occupancy;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               (distance * (N2ODistanceFactor + CH4DistanceFactor + CO2DistanceFactor))/occupancy;
          }
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
          if(fuelEfficiency == ""){ //CO2 fuel-based calcualtion
               ((distancePerJourney * journeys * (N2ODistanceFactor + CH4DistanceFactor)) + (CO2VolumeFactor * fuelConsumed))/occupancy;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               (distancePerJourney * journeys * (N2ODistanceFactor + CH4DistanceFactor + CO2DistanceFactor))/occupancy;
          }
     }
}
