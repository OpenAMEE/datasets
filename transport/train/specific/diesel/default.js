// get diesel emissions factor (by energy) and heating value (by volume) from /transport/byFuel
var massCO2PerEnergy = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','EFNRGCO2');
var energyPerVolume = dataFinder.getDataItemValue('transport/byFuel','fuel=Diesel,version=IPCC 06','HVVolume');

// calculate by-volume fuel emissions factor, convert m^3 to litres
var fuelFactor = (massCO2PerEnergy * energyPerVolume) / 1000;

// calculate per passenger energy from occupancy
var perVehicleFuelUse = (volumePer100SeatPerDistance / 100) * seatingCapacity;
var totalPassengers = seatingCapacity * (occupancy / 100);
var perPassengerFuelUse = perVehicleFuelUse / totalPassengers;

// calculate per passenger emissons factor
var perPassengerEmissionsFactor = perPassengerFuelUse * fuelFactor;

// calculate emissions for journey
perPassengerEmissionsFactor * passengers * distance;
