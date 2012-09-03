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


function getAutoFac(autoType,passengerClass) {
	if (autoType == 'domestic') {
	     passengerClass == 'unspecified'; // only unspecified
	} else if (autoType == 'short haul' && passengerClass == 'first') {
	     passengerClass='business'; //no first class
     } else if (autoType == 'short haul' && passengerClass == 'economy plus') {
	     passengerClass='economy'; //no first class
	}
     co2Fac = dataFinder.getDataItemValue('transport/plane/generic/defra', 'type='+autoType+',passengerClass='+passengerClass,'kgCO2PerPassengerKm');
     ch4Fac = dataFinder.getDataItemValue('transport/plane/generic/defra', 'type='+autoType+',passengerClass='+passengerClass,'kgCO2ePerKmForCH4');
     n2oFac = dataFinder.getDataItemValue('transport/plane/generic/defra', 'type='+autoType+',passengerClass='+passengerClass,'kgCO2ePerKmForN2O');
     fac = (parseFloat(co2Fac)+parseFloat(ch4Fac)+parseFloat(n2oFac));
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
} catch(error) {
     //do nothing
}

try {
     var d = distance;
} catch(error) {
     distance = null;
}

try {
     var n = numberOfPassengers;
} catch(error) {
     numberOfPassengers=1;
}

try {
     var j = journeys;
} catch(error) {
     journeys=1;
}

// Determine distance
if(long1>=-180) {
     dist=1.09*greatCircle();
} else {
     if (distance == null) {
          if (type=='domestic'){
               dist = 463;
          } else if (type=='short haul') {
               dist = 1108;
          } else if (type=='long haul') {
               dist = 6482;
          } else {
               dist = 0;
          }
     } else {
          dist = distance;
     }
}

if(isReturn == 'true'){
     dist=2.*dist;
}

// Determine emissions factor
if (type == 'auto') {
     country1=country1.toLowerCase();
     country2=country2.toLowerCase();
     if(country1.equals(country2) && country1.equals("united kingdom")) {
          autoType='domestic';
     } else if(dist<3700.) {
          autoType='short haul';
     } else {
          autoType='long haul';
     }
     fac = getAutoFac(autoType,passengerClass);
 } else {
     fac = kgCO2PerPassengerKm + kgCO2ePerKmForCH4 + kgCO2ePerKmForN2O;
}

// calculate emissions
journeys * numberOfPassengers * dist * fac * RFI;
