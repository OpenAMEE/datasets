/*if (fuel=='blast furnace gas' || fuel=='coke oven gas' || fuel=='colliery methane' || fuel=='natural gas' || fuel=='other petroleum gas' || fuel=='refinery miscellaneous' || fuel=='sour gas' || fuel=='electricity' || fuel=='network gas'){
	type='energy';
}
else if (fuel=='burning oil/kerosene/paraffin' || fuel=='diesel' || fuel=='gas oil' || fuel=='lpg' || fuel=='petrol'){
	type='volume';
}
else{
	type='mass';
}
*/

if (basis == 'energy') {
     massCO2PerEnergy*energyUsed;
} else if (basis == 'volume') {
	massCO2PerVolume*volumeUsed;} else if (basis == 'mass') {
	massCO2PerMass*massUsed;
} else {
     0;
}
