var gwpCH4 = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP'); //global warming potential for CH4
var gwpN2O = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP'); //global warming potential for N2O

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
     CO2VolumeFactor = (massCO2PerEnergy * energyPerVolume) / 1000;
} else if(fuel == "diesel") {
     massCO2PerEnergy = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','EFNRGCO2');
     energyPerVolume = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','HVVolume');
     CO2VolumeFactor = (massCO2PerEnergy * energyPerVolume) / 1000;
} else if(fuel == "lpg") {
     massCO2PerEnergy = dataFinder.getDataItemValue('transport/byFuel','fuel=LPG,version=IPCC 06','EFNRGCO2');
     energyPerVolume = dataFinder.getDataItemValue('transport/byFuel','fuel=LPG,version=IPCC 06','HVVolume');
     CO2VolumeFactor = (massCO2PerEnergy * energyPerVolume) / 1000;
} else if(fuel == "cng") {
     var perGallonToPerLitre = 0.2641720523;
     CO2VolumeFactor = dataFinder.getDataItemValue('transport/byFuel/us','fuelType=cng,CO2eOrCO2=CO2 only','kgCO2PerUsGallon');
     CO2VolumeFactor *= perGallonToPerLitre;
}         

// establish N2O emissions factor
var N2OUrbanCold = massN2OPerDistanceUrbanCold*urbanCold;
var N2OUrbanHot = massN2OPerDistanceUrbanHot*urbanHot;
var N2OHighway = massN2OPerDistanceHighway*highway;
var N2ORural = massN2OPerDistanceRural*rural;
var N2ODistanceFactor = (N2OUrbanCold +N2OUrbanHot + N2OHighway + N2ORural) * gwpN2O;

// establish CH4 emissions factor
var CH4UrbanCold = massCH4PerDistanceUrbanCold*urbanCold;
var CH4UrbanHot = massCH4PerDistanceUrbanHot*urbanHot;
var CH4Highway = massCH4PerDistanceHighway*highway;
var CH4Rural = massCH4PerDistanceRural*rural;
var CH4DistanceFactor = (CH4UrbanCold + CH4UrbanHot + CH4Highway + CH4Rural) * gwpCH4;

// combine emissions factors, convert milligrams to kgs
var nonCO2DistanceFactor =  (CH4DistanceFactor + N2ODistanceFactor)/1000000;

// calculate emissions
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

var accountedProportion = accountedPassengers / totalOccupancy;


if(distance == "" && distancePerJourney == ""){
     (CO2VolumeFactor * fuelConsumed) * accountedProportion;
} else {
     if (distancePerJourney == ""){
          if(fuelEfficiency == ""){ //CO2 fuel-based calcualtion
               ((distance * nonCO2DistanceFactor) + (CO2VolumeFactor * fuelConsumed)) * accountedProportion;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               (distance * (nonCO2DistanceFactor + CO2DistanceFactor)) * accountedProportion;
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
               ((distancePerJourney * journeys * nonCO2DistanceFactor) + (CO2VolumeFactor * fuelConsumed)) * accountedProportion;
          } else { //CO2 distance-based calculation
               CO2DistanceFactor = CO2VolumeFactor / fuelEfficiency;
               (distancePerJourney * journeys * (nonCO2DistanceFactor + CO2DistanceFactor)) * accountedProportion;
          }
     }
}
