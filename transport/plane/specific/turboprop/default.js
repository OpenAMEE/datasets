var dist;
var cruiseFuel;
var taxiOutFuel;
var takeOffFuel;
var climbOutFuel;
var RFI;

// fuel=>CO2 emissions factor
fuelPerEnergyEmissionsFactor = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'EFNRGCO2');
fuelHeatingValueByMass = dataFinder.getDataItemValue('transport/byFuel','fuel=Jet Fuel,version=IPCC 99', 'HVMass');

var fuelCO2Factor=fuelPerEnergyEmissionsFactor*fuelHeatingValueByMass;

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

// establish taxiout fuel consumption
try {
  if (dist==0) {	
    taxiOutFuel=0;
  } else {
    if (dist<=232){
      taxiOutFuel=massFuelTaxiOut232km*(232-dist)/232;
    } else if(dist<=463) {
      taxiOutFuel=massFuelTaxiOut232km+((massFuelTaxiOut463km-massFuelTaxiOut232km)*(dist-232)/(463-232));
    } else if(dist<=926) {
      taxiOutFuel=massFuelTaxiOut463km+((massFuelTaxiOut926km-massFuelTaxiOut463km)*(dist-463)/(926-463));
    } else if(dist<=1389) {
      taxiOutFuel=massFuelTaxiOut926km+((massFuelTaxiOut1389km-massFuelTaxiOut926km)*(dist-926)/(1389-926));
    } else if(dist<=1852) {
      taxiOutFuel=massFuelTaxiOut1389km+((massFuelTaxiOut1852km-massFuelTaxiOut1389km)*(dist-1389)/(1852-1389));
    } else if(dist<=2778) {
      taxiOutFuel=massFuelTaxiOut1852km+((massFuelTaxiOut2778km-massFuelTaxiOut1852km)*(dist-1852)/(2778-1852));
    } else if(dist<=3704) {
      taxiOutFuel=massFuelTaxiOut2778km+((massFuelTaxiOut3704km-massFuelTaxiOut2778km)*(dist-2778)/(3704-2778));
    } else if(dist<=4630) {
      taxiOutFuel=massFuelTaxiOut3704km+((massFuelTaxiOut4630km-massFuelTaxiOut3704km)*(dist-3704)/(4630-3704));
    } else if(dist<=5556) {
      taxiOutFuel=massFuelTaxiOut4630km+((massFuelTaxiOut5556km-massFuelTaxiOut4630km)*(dist-4630)/(5556-4630));
    } else if(dist<=6482) {
      taxiOutFuel=massFuelTaxiOut5556km+((massFuelTaxiOut6482km-massFuelTaxiOut5556km)*(dist-5556)/(6482-5556));
    } else if(dist<=7408) {
      taxiOutFuel=massFuelTaxiOut6482km+((massFuelTaxiOut7408km-massFuelTaxiOut6482km)*(dist-6482)/(7408-6482));
    }
  }
} catch(err) {
}

// establish take off fuel consumption
try {
  if (dist==0) {	
    takeOffFuel=0;
  } else {
    if (dist<=232){
      takeOffFuel=massFuelTakeOff232km*(232-dist)/232;
    } else if(dist<=463){
      takeOffFuel=massFuelTakeOff232km+((massFuelTakeOff463km-massFuelTakeOff232km)*(dist-232)/(463-232));
    } else if(dist<=926){
      takeOffFuel=massFuelTakeOff463km+((massFuelTakeOff926km-massFuelTakeOff463km)*(dist-463)/(926-463));
    } else if(dist<=1389){
      takeOffFuel=massFuelTakeOff926km+((massFuelTakeOff1389km-massFuelTakeOff926km)*(dist-926)/(1389-926));
    } else if(dist<=1852){
      takeOffFuel=massFuelTakeOff1389km+((massFuelTakeOff1852km-massFuelTakeOff1389km)*(dist-1389)/(1852-1389));
    } else if(dist<=2778){
      takeOffFuel=massFuelTakeOff1852km+((massFuelTakeOff2778km-massFuelTakeOff1852km)*(dist-1852)/(2778-1852));
    } else if(dist<=3704){
      takeOffFuel=massFuelTakeOff2778km+((massFuelTakeOff3704km-massFuelTakeOff2778km)*(dist-2778)/(3704-2778));
    } else if(dist<=4630){
      takeOffFuel=massFuelTakeOff3704km+((massFuelTakeOff4630km-massFuelTakeOff3704km)*(dist-3704)/(4630-3704));
    } else if(dist<=5556){
      takeOffFuel=massFuelTakeOff4630km+((massFuelTakeOff5556km-massFuelTakeOff4630km)*(dist-4630)/(5556-4630));
    } else if(dist<=6482){
      takeOffFuel=massFuelTakeOff5556km+((massFuelTakeOff6482km-massFuelTakeOff5556km)*(dist-5556)/(6482-5556));
    } else if(dist<=7408){
      takeOffFuel=massFuelTakeOff6482km+((massFuelTakeOff7408km-massFuelTakeOff6482km)*(dist-6482)/(7408-6482));
    }
  }
} catch(err) {
}

// establish climb out fuel consumption
try {
  if (dist==0){	
    climbOutFuel=0;
  } else{
    if (dist<=232){
      climbOutFuel=massFuelClimbOut232km*(232-dist)/232;
    } else if(dist<=463){
      climbOutFuel=massFuelClimbOut232km+((massFuelClimbOut463km-massFuelClimbOut232km)*(dist-232)/(463-232));
    } else if(dist<=926){
      climbOutFuel=massFuelClimbOut463km+((massFuelClimbOut926km-massFuelClimbOut463km)*(dist-463)/(926-463));
    } else if(dist<=1389){
      climbOutFuel=massFuelClimbOut926km+((massFuelClimbOut1389km-massFuelClimbOut926km)*(dist-926)/(1389-926));
    } else if(dist<=1852){
      climbOutFuel=massFuelClimbOut1389km+((massFuelClimbOut1852km-massFuelClimbOut1389km)*(dist-1389)/(1852-1389));
    } else if(dist<=2778){
      climbOutFuel=massFuelClimbOut1852km+((massFuelClimbOut2778km-massFuelClimbOut1852km)*(dist-1852)/(2778-1852));
    } else if(dist<=3704){
      climbOutFuel=massFuelClimbOut2778km+((massFuelClimbOut3704km-massFuelClimbOut2778km)*(dist-2778)/(3704-2778));
    } else if(dist<=4630){
      climbOutFuel=massFuelClimbOut3704km+((massFuelClimbOut4630km-massFuelClimbOut3704km)*(dist-3704)/(4630-3704));
    } else if(dist<=5556){
      climbOutFuel=massFuelClimbOut4630km+((massFuelClimbOut5556km-massFuelClimbOut4630km)*(dist-4630)/(5556-4630));
    } else if(dist<=6482){
      climbOutFuel=massFuelClimbOut5556km+((massFuelClimbOut6482km-massFuelClimbOut5556km)*(dist-5556)/(6482-5556));
    } else if(dist<=7408){
      climbOutFuel=massFuelClimbOut6482km+((massFuelClimbOut7408km-massFuelClimbOut6482km)*(dist-6482)/(7408-6482));
    }
  }
} catch(err){
}

// establish cruise fuel consumption
try {
  if (dist==0){	
    cruiseFuel=0;
  } else{
    if (dist<=232){
      cruiseFuel=massFuelCruise232km*(232-dist)/232;
    } else if(dist<=463){
      cruiseFuel=massFuelCruise232km+((massFuelCruise463km-massFuelCruise232km)*(dist-232)/(463-232));
    } else if(dist<=926){
      cruiseFuel=massFuelCruise463km+((massFuelCruise926km-massFuelCruise463km)*(dist-463)/(926-463));
    } else if(dist<=1389){
      cruiseFuel=massFuelCruise926km+((massFuelCruise1389km-massFuelCruise926km)*(dist-926)/(1389-926));
    } else if(dist<=1852){
      cruiseFuel=massFuelCruise1389km+((massFuelCruise1852km-massFuelCruise1389km)*(dist-1389)/(1852-1389));
    } else if(dist<=2778){
      cruiseFuel=massFuelCruise1852km+((massFuelCruise2778km-massFuelCruise1852km)*(dist-1852)/(2778-1852));
    } else if(dist<=3704){
      cruiseFuel=massFuelCruise2778km+((massFuelCruise3704km-massFuelCruise2778km)*(dist-2778)/(3704-2778));
    } else if(dist<=4630){
      cruiseFuel=massFuelCruise3704km+((massFuelCruise4630km-massFuelCruise3704km)*(dist-3704)/(4630-3704));
    } else if(dist<=5556){
      cruiseFuel=massFuelCruise4630km+((massFuelCruise5556km-massFuelCruise4630km)*(dist-4630)/(5556-4630));
    } else if(dist<=6482){
      cruiseFuel=massFuelCruise5556km+((massFuelCruise6482km-massFuelCruise5556km)*(dist-5556)/(6482-5556));
    } else if(dist<=7408){
      cruiseFuel=massFuelCruise6482km+((massFuelCruise7408km-massFuelCruise6482km)*(dist-6482)/(7408-6482));
    }
  }
} catch(err){
  cruiseFuel=0;
  returnValues.addNote('comment', "Distance beyond aircraft range. Emissions cannot be calculated");
}

// establish if Radiative Forcing Index to be applied
if (useRFI=='true'){
  RFI=radiativeForcingIndex;
} else {
  RFI=1;
}

cruiseEmissions = cruiseFuel * fuelCO2Factor * journeys * RFI;
taxiOutEmissions = taxiOutFuel * fuelCO2Factor * journeys;
takeOffEmissions = takeOffFuel * fuelCO2Factor * journeys;
climbOutEmissions = climbOutFuel * fuelCO2Factor * journeys;
approachEmissions = massFuelApproach * fuelCO2Factor * journeys;
taxiInEmissions = massFuelTaxiIn * fuelCO2Factor * journeys;

if(cruiseFuel>0){
  totalEmissions = cruiseEmissions + taxiOutEmissions + takeOffEmissions + climbOutEmissions + approachEmissions + taxiInEmissions;
} else {
  totalEmissions = 0;
}

returnValues.putValue('cruiseCO2', 'kg',null, cruiseEmissions);
returnValues.putValue('taxiOutCO2', 'kg',null, taxiOutEmissions);
returnValues.putValue('takeOffCO2', 'kg',null, takeOffEmissions);
returnValues.putValue('climbOutCO2', 'kg',null, climbOutEmissions);
returnValues.putValue('approachCO2', 'kg',null, approachEmissions);
returnValues.putValue('taxiInCO2', 'kg',null, taxiInEmissions);
returnValues.putValue('totalCO2', 'kg',null, totalEmissions);
returnValues.setDefaultType('totalCO2');
