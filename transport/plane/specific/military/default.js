fuelPerEnergyEmissionsFactor = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'EFNRGCO2');
fuelHeatingValueByMass = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'HVMass');

var fuelCO2Factor=fuelPerEnergyEmissionsFactor*fuelHeatingValueByMass;

// establish if Radiative Forcing Index to be applied
var RFI;

if (useRFI=='true'){
	RFI=radiativeForcingIndex;
} else {
	RFI=1;
}



massFuelPerTime*flightDuration*fuelCO2Factor*RFI