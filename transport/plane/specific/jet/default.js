var dist;
var cruiseFuel;
var RFI;

// fuel=>CO2 emissions factor
fuelPerEnergyEmissionsFactor = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'EFNRGCO2');
fuelHeatingValueByMass = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'HVMass');

var fuelCO2Factor = fuelPerEnergyEmissionsFactor * fuelHeatingValueByMass;

// typical landing-take off phase durations
var typicalTakeOffDuration=0.7;
var typicalClimbOutDuration=2.2;
var typicalApproachDuration=4.0;
var typicalTaxiDuration=26.0;

// lat/long distance calculation
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

// establish distance	
try{
  if (long1>=-180){
    dist=1.09*greatCircle();
  } else {
    var i1=IATACode1;
    var i2=IATACode2;
    long1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i1, 'longitude');
    lat1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i1, 'latitude');
    long2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i2, 'longitude');
    lat2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i2, 'latitude');
    dist=1.09*greatCircle();
  }
  returnValues.putValue('greatCircleDistance', 'km',null, dist);
  returnValues.addNote('comment', 'Emissions based on Great Circle calculated distance');
} catch(err) {
  dist=distance;
  returnValues.putValue('greatCircleDistance', 'km',null, 0);
  returnValues.addNote('comment', 'No location information provided. Emissions based on specified distance');
}



// establish cruise fuel consumption
try {
  var cruiseFuel;
  if (dist==0){	
    cruiseFuel=0;
  } else {
    if (dist<=232) {
      cruiseFuel=massFuelCruise232km*(232-dist)/232;
    } else if(dist<=463) {
      cruiseFuel=massFuelCruise232km+((massFuelCruise463km-massFuelCruise232km)*(dist-232)/(463-232));
    } else if(dist<=926) {
      cruiseFuel=massFuelCruise463km+((massFuelCruise926km-massFuelCruise463km)*(dist-463)/(926-463));
    } else if(dist<=1389) {
      cruiseFuel=massFuelCruise926km+((massFuelCruise1389km-massFuelCruise926km)*(dist-926)/(1389-926));
    } else if(dist<=1852) {
      cruiseFuel=massFuelCruise1389km+((massFuelCruise1852km-massFuelCruise1389km)*(dist-1389)/(1852-1389));
    } else if(dist<=2778) {
      cruiseFuel=massFuelCruise1852km+((massFuelCruise2778km-massFuelCruise1852km)*(dist-1852)/(2778-1852));
    } else if(dist<=3704) {
      cruiseFuel=massFuelCruise2778km+((massFuelCruise3704km-massFuelCruise2778km)*(dist-2778)/(3704-2778));
    } else if(dist<=4630) {
      cruiseFuel=massFuelCruise3704km+((massFuelCruise4630km-massFuelCruise3704km)*(dist-3704)/(4630-3704));
    } else if(dist<=5556) {
      cruiseFuel=massFuelCruise4630km+((massFuelCruise5556km-massFuelCruise4630km)*(dist-4630)/(5556-4630));
    } else if(dist<=6482) {
      cruiseFuel=massFuelCruise5556km+((massFuelCruise6482km-massFuelCruise5556km)*(dist-5556)/(6482-5556));
    } else if(dist<=7408) {
      cruiseFuel=massFuelCruise6482km+((massFuelCruise7408km-massFuelCruise6482km)*(dist-6482)/(7408-6482));
    } else if(dist<=8334) {
      cruiseFuel=massFuelCruise7408km+((massFuelCruise8334km-massFuelCruise7408km)*(dist-7408)/(8334-7408));
    } else if(dist<=9260) {
      cruiseFuel=massFuelCruise8334km+((massFuelCruise9260km-massFuelCruise8334km)*(dist-8334)/(9260-8334));
    } else if(dist<=10186) {
      cruiseFuel=massFuelCruise9260km+((massFuelCruise10186km-massFuelCruise9260km)*(dist-9260)/(10186-9260));
    } else if(dist<=11112) {
      cruiseFuel=massFuelCruise10186km+((massFuelCruise11112km-massFuelCruise10186km)*(dist-10186)/(11112-10186));
    } else if(dist<=12038) {
      cruiseFuel=massFuelCruise11112km+((massFuelCruise12038km-massFuelCruise11112km)*(dist-11112)/(12038-11112));
    }
  }
} catch(err) {
  cruiseFuel=0;
  returnValues.addNote('comment', "Distance beyond aircraft range. Cruise emissions cannot be calculated");
}



// establish if Radiative Forcing Index to be applied
if (useRFI=='true'){
  RFI=radiativeForcingIndex;
} else {
  RFI=1;
}

cruiseEmissions = cruiseFuel * fuelCO2Factor * journeys * RFI;
takeOffEmissions = ((massFuelTakeOff/typicalTakeOffDuration)*takeOffDuration) * fuelCO2Factor * journeys;
climbOutEmissions = ((massFuelClimbOut/typicalClimbOutDuration)*climbOutDuration) * fuelCO2Factor * journeys;
approachEmissions = ((massFuelApproach/typicalApproachDuration)*approachDuration) * fuelCO2Factor * journeys;
taxiEmissions = ((massFuelTaxi/typicalTaxiDuration)*taxiDuration) * fuelCO2Factor * journeys;

if(cruiseFuel>0){
  totalEmissions = cruiseEmissions + takeOffEmissions + climbOutEmissions + approachEmissions + taxiEmissions;
} else {
  totalEmissions = 0;
}

returnValues.putValue('cruiseCO2', 'kg',null, cruiseEmissions);
returnValues.putValue('takeOffCO2', 'kg',null, takeOffEmissions);
returnValues.putValue('climbOutCO2', 'kg',null, climbOutEmissions);
returnValues.putValue('approachCO2', 'kg',null, approachEmissions);
returnValues.putValue('taxiCO2', 'kg',null, taxiEmissions);
returnValues.putValue('totalCO2', 'kg',null, totalEmissions);
returnValues.setDefaultType('totalCO2');

