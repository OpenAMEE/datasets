//kgCO2PerKmPassenger * distanceKmPerMonth
//kgCO2PerKmPassenger * distanceKmPerMonth
//throws an error if country undeclared
try { 
  var c=country;
}
catch(err){
  country='';
}
// if country value isn't set, get country
// from metadata
if (country == ''){
  country = profileFinder.getProfileItemValue('metadata', 'country');
}

if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}
// now calculate the monthly kgCO2 emissions
fac=1.;
if (country == 'Ireland' || country == 'IE') {
    fac = kgCO2PerPassengerKmIE;
} else if (country == 'Spain' || country == 'ES') {
    fac = kgCO2PerPassengerKmES;
} else {
    fac= kgCO2PerKmPassenger;
}

isJourneyBased=false;
try {
	var c = distance;
} catch(err){
	isJourneyBased=true;
}

try {
  var n=numberOfPassengers;
}
catch(err){
  numberOfPassengers=1;
}

fac*=numberOfPassengers;

if(!isJourneyBased){
	fac * distance;
} else {
	try {
		var c = useTypicalDistance;
	} catch(err){
		useTypicalDistance="false";
	}

	if(useTypicalDistance=="true"){
		distancePerJourney=typicalJourneyDistance;
	}

	if(journeyFrequency=="monthly"){
		numberOfJourneys*=12.;
	} else if(journeyFrequency=="weekly"){
		numberOfJourneys*=52;
	} else if(journeyFrequency=="daily"){
		numberOfJourneys*=365;
	}
	try {
		var c = isReturn;
		if(isReturn=="true"){
			numberOfJourneys*=2;
		}
	} catch(err){
		isReturn=false;
	}
	fac*numberOfJourneys*distancePerJourney;
}