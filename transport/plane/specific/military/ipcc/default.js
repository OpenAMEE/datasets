fuelPerEnergyEmissionsFactor = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'EFNRGCO2');
fuelHeatingValueByMass = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'HVVolume');

var fuelCO2Factor=fuelPerEnergyEmissionsFactor * fuelHeatingValueByMass / 1000;

var RFI;
if (useRFI=='true'){
	RFI=radiativeForcingIndex;
} else {
	RFI=1;
}

volumeFuelPerTime * flightDuration * fuelCO2Factor * RFI;





