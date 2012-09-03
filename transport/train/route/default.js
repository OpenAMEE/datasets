//call to train API
service = serviceFinder.getService("train-route-finder-service");
distance = service.invoke();
distance /= 1000;
profileFinder.setProfileItemValue('totalDistance',distance); // retained for legacy


// establish train type
var atype;

// this maps old drills to new drills
if (trainType == "underground") {
  atype = "london underground";
} else if (trainType == "local rail") {
  atype = "light rail and tram";
} else if (trainType == "tram") {
  atype = "light rail and tram";
} else if (trainType == "international") {
  atype = "international (eurostar)";
} else {
  atype = trainType;
}

var generic = 'true';
var diesel = 'true';
var electric = 'true';

var getTrainType = dataFinder.getDataItemValue('transport/defra/passenger','type=rail,subtype='+atype,'massCO2PerDistancePerPassenger');
if (getTrainType == null) { 
     generic = 'false';
     getTrainType = dataFinder.getDataItemValue('transport/train/specific/diesel','region=UK,type='+atype,'volumePer100SeatPerDistance');
}
if (getTrainType == null) {
     diesel = 'false';
     getTrainType = dataFinder.getDataItemValue('transport/train/specific/electric', 'region=UK,type='+atype, 'kWhPerSeatPerDistance')
}
if (getTrainType == null) {
     electric = 'false';
}

// establish per passenger emissions factor
if (generic == 'true') {
     factor = dataFinder.getDataItemValue('transport/defra/passenger','type=rail,subtype='+atype,'massCO2PerDistancePerPassenger');
     var defraAssumedLoading = 31; // percent
     perPassengerEmissionsFactor = factor * (defraAssumedLoading / occupancy);
} else if (diesel == 'true') {
     // get train fuel consumption data 
     volumePer100SeatPerDistance = parseFloat(dataFinder.getDataItemValue('transport/train/specific/diesel', 'region=UK,type='+atype, 'volumePer100SeatPerDistance'));
     seatingCapacity = parseFloat(dataFinder.getDataItemValue('transport/train/specific/diesel', 'region=UK,type='+atype, 'seatingCapacity'));
     // calculate per passenger energy from occupancy
     perVehicleFuelUse = (volumePer100SeatPerDistance / 100) * seatingCapacity;
     totalPassengers = seatingCapacity * (occupancy / 100);
     perPassengerFuelUse = perVehicleFuelUse / totalPassengers;
     fuelFactor = parseFloat(dataFinder.getDataItemValue('transport/defra/fuel','fuel=diesel','massCO2PerVolume'));
     // calculate per passenger emissons factor
     perPassengerEmissionsFactor = perPassengerFuelUse * fuelFactor;
} else if (electric == 'true') { // i.e. if not generic or specific diesel, then specific electric
     // get train electricity consumption data 
     kWhPerSeatPerDistance = parseFloat(dataFinder.getDataItemValue('transport/train/specific/electric', 'region=UK,type='+atype, 'kWhPerSeatPerDistance'));
     seatingCapacity = parseFloat(dataFinder.getDataItemValue('transport/train/specific/electric', 'region=UK,type='+atype, 'seatingCapacity'));
     // calculate per passenger energy from occupancy
     perVehicleEnergyUse = kWhPerSeatPerDistance * seatingCapacity;
     totalPassengers = seatingCapacity * (occupancy / 100);
     perPassengerEnergyUse = perVehicleEnergyUse / totalPassengers;
     // get grid electricity emissions factor
     countryElecValue = parseFloat(dataFinder.getDataItemValue('business/energy/electricity/defra/uk', 'type=electricity consumption,emission=direct,basis=rolling average', 'massCO2PerEnergy'));
     // calculate per passenger emissons factor
     perPassengerEmissionsFactor = perPassengerEnergyUse * countryElecValue;
} else {
     perPassengerEmissionsFactor = 0;
     returnValues.addNote('comment', 'Calculation cannot be made. An invalid train type was specified');
}

// convert m into km and calculate emissions
co2Emissions = perPassengerEmissionsFactor * distance * passengers;

returnValues.putValue('distance', 'km',null, distance);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.setDefaultType('CO2');
