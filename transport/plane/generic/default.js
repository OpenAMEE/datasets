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

function getEFForClass(atype) {     fac = kgCO2PerPassengerKm;
     try {
          if(passengerClass=='first' && atype=='short haul'){
               passengerClass="business";//no first class
          }
          fac = dataFinder.getDataItemValue('transport/plane/generic/passengerclass', 'type='+atype+',passengerClass='+passengerClass,'kgCO2PerPassengerKm');     } catch(err) {
	     //do nothing
	}
     if(fac<=0){ //i.e. auto
          fac=dataFinder.getDataItemValue('transport/plane/generic', 'type='+atype+',size=-','kgCO2PerPassengerKm');
     }
	return fac;
}


// establish if Radiative Forcing Index to be applied
var RFI=1;
if (useRFI=='true'){
	RFI=radiativeForcingIndex;
} else {
	RFI=1;
}


country1="unknown";
country2="unknown";
try {
     var i1=IATACode1;
     var i2=IATACode2;
     //can optimise this by just getting the two data items probably
     long1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i1, 'longitude');
     lat1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i1, 'latitude');
     country1 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i1, 'country');
     long2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i2, 'longitude');
     lat2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i2, 'latitude');
     country2 = dataFinder.getDataItemValue('transport/plane/generic/airports/all/codes','IATACode='+i2, 'country');
} catch(err) {
     //do nothing
}

try {
     var n=numberOfPassengers;
} catch(err) {     numberOfPassengers=1;
}

try {
     var j=journeys;
} catch(err) {     journeys=1;
}

if(long1>=-180) {
     dist=1.09*greatCircle();
     atype=type;
     country1=country1.toLowerCase();
     country2=country2.toLowerCase();
     if(size=='return'){
          dist=2.*dist;
     }
     if(type=='auto'){
          if(country1.equals(country2) && country1.equals("united kingdom")) {
               atype='domestic';
          } else if(dist<3700.){
               atype='short haul';
          } else {
               atype='long haul';
          }
     }
     profileFinder.setProfileItemValue('calculatedDistance',dist); // set Great Circle distance in calculatedDistance PIV
     journeys * numberOfPassengers * dist * getEFForClass(atype) * RFI; // CALCULATION if based on Great Circle distance
} else if (kgCO2PerPassengerKm != 0) {
     (numberOfPassengers * distance * getEFForClass(type) * RFI); // CALCULATION if based on absolute distance
} else if (kgCO2PerPassengerJourney != 0) {
     if (type=='domestic'){ // establish typical distance
          assumedDistance = 463;
     } else if (type=='short haul'){
          assumedDistance = 1108;
     } else if (type=='long haul'){
          assumedDistance = 6482;
     }
     try {
          test=passengerClass // does a passenger class exist?
          passClassEF = getEFForClass(type) * assumedDistance; // if so, use class EF together with assumed distance     } catch (error) {
          passClassEF = kgCO2PerPassengerJourney; // if not use per journey EF (which is just the standard EF multiplied by typical distance)
     }
	(numberOfPassengers * journeys * passClassEF * RFI); // CALCULATION if based on typical distances
} else {
     0;
}
