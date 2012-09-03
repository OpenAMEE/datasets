// great circle distance calculator
function greatCircle() {
         d2r=0.01745329252;
         long1*=d2r;
         lat1*=d2r;
         long2*=d2r;
         lat2*=d2r;
         dlat=0.5*(lat2-lat1);
         dlat=Math.sin(dlat);
         dlat=dlat*dlat;
         dlong=0.5*(long2-long1);
         dlong=Math.sin(dlong);
         dlong=dlong*dlong;
         res=dlat;
         res+=Math.cos(lat1)*Math.cos(lat2)*dlong;
         res=Math.sqrt(res);
         return 12745.59*Math.asin(res);
}

// get emissions factors for freight
function getFreightFactor(type,item){
  return parseFloat(dataFinder.getDataItemValue('transport/defra/freight', 'type=plane,subtype='+type,item));
}

// get emissions factors for passenger
function getPassengerFactor(type,passengerClass,item){
  return parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,item));
}

// establish distance
var country1 = "unknown";
var country2 = "unknown";
var distance;

// Determine distance via great circle with 9% uplift
if ((long1 >= -180 && long1 <= 180) && (lat1 >= -90 && lat1 <= 90) && (long2 >= -180 && long2 <= 180) && (lat2 >= -90 && lat2 <= 90)) {
  distance = 1.09 * greatCircle();
} else if (typeof(IATACode1) == 'undefined' || typeof(IATACode2) == 'undefined') {
  distance = 0;
  returnValues.addNote('error', "Cannot calculate distance. Must specify either two valid airport codes (IATA) or four latitude and longitude coordinates")
} else {
  long1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode1, 'longitude');
  lat1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode1, 'latitude');
  country1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode1, 'country');
  long2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode2, 'longitude');
  lat2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode2, 'latitude');
  country2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+IATACode2, 'country');
  
  if ((country1 == null) || (country2 == null)) {
    country1 = "unknown";
    country2 = "unknown";
  }

  if ((long1 == null) || (lat1 == null)) {
    distance = 0;
    returnValues.addNote('error', "Cannot calculate distance. IATA code '"+IATACode1+"' is unknown");
  } else if ((long2 == null) || (lat2 == null)) {
    distance = 0;
    returnValues.addNote('error', "Cannot calculate distance. IATA code '"+IATACode2+"' is unknown");
  } else {
    distance= 1.09 * greatCircle();
  }
}


// establish whether domestic, short or long haul
var flightType;
country1 = country1.toLowerCase();
country2 = country2.toLowerCase();
if (country1.equals(country2) && country1.equals("united kingdom")) {
  flightType = 'domestic';
} else if (distance < 3700.0) {
  flightType = 'short-haul international';
} else {
  flightType = 'long-haul international';
}


// establish if freight calculation
var isFreight = true;
if (typeof(mass) == 'undefined') {
  isFreight = null;
}

// establish if Radiative Forcing Index to be applied
var RFI;
if (useRFI=='true'){
  RFI=radiativeForcingIndex;
} else {
  RFI=1;
}

// do calculation, use 'isFreight' variable to decide freight route or passenger route
if (isFreight) {
  co2Emissions = getFreightFactor(flightType, "massCO2PerMassPerDistance") * distance * mass * journeys * RFI;
  ch4Emissions = getFreightFactor(flightType, "massCH4PerMassPerDistance") * distance * mass * journeys * RFI;
  n2oEmissions = getFreightFactor(flightType, "massN2OPerMassPerDistance") * distance * mass * journeys * RFI;
  directCO2eEmissions = getFreightFactor(flightType, "massDirectCO2ePerMassPerDistance") * distance * mass * journeys * RFI;
  indirectCO2eEmissions = getFreightFactor(flightType, "massIndirectCO2ePerMassPerDistance") * distance * mass * journeys * RFI;
  lifeCycleCO2eEmissions = getFreightFactor(flightType, "massTotalCO2ePerMassPerDistance") * distance * mass * journeys * RFI;
} else {
  if (isReturn == 'true') {
    distance *=2.0;
  }
  if (flightType == 'domestic') {
    passengerClass = 'average';
  } else if (flightType == 'short-haul international' && passengerClass == 'premium economy') {
      passengerClass = 'economy';
  } else if (flightType == 'short-haul international' && passengerClass == 'first') {
      passengerClass = 'business';
  }
  co2Emissions = getPassengerFactor(flightType, passengerClass, "massCO2PerDistancePerPassenger") * distance * passengers * journeys * RFI;
  ch4Emissions = getPassengerFactor(flightType, passengerClass, "massCH4PerDistancePerPassenger") * distance * passengers * journeys * RFI;
  n2oEmissions = getPassengerFactor(flightType, passengerClass, "massN2OPerDistancePerPassenger") * distance * passengers * journeys * RFI;
  directCO2eEmissions = getPassengerFactor(flightType, passengerClass, "massDirectCO2ePerDistancePerPassenger") * distance * passengers * journeys * RFI;
  indirectCO2eEmissions = getPassengerFactor(flightType, passengerClass, "massIndirectCO2ePerDistancePerPassenger") * distance * passengers * journeys * RFI;
  lifeCycleCO2eEmissions = getPassengerFactor(flightType, passengerClass, "massTotalCO2ePerDistancePerPassenger") * distance * passengers * journeys * RFI;
}

returnValues.putValue('distance', 'km',null, distance);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalDirectCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('totalDirectCO2e');

returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
