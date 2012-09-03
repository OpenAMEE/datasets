
try{
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
}
catch(err){
  //do nothing
}

fac = kgCO2PerTonneKm;
	
// establish if distance specified
try {
     var d = distance;
} catch(error) {
     distance = null;
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
}
catch(err){
  //do nothing
}

if (kgCO2PerTonneKm != 0) {
     if (distance == null) {
          if (type=='domestic'){
               assumedDistance = 463;
          } else if (type=='short haul'){
               assumedDistance = 1108;
          } else if (type=='long haul'){
               assumedDistance = 6482;
          }
          mass * assumedDistance * fac * RFI;
     } else {
          mass * distance * fac * RFI;
     }
}
else {
  dist=1.09*greatCircle();
  atype=type;
  country1=country1.toLowerCase();
  country2=country2.toLowerCase();
  if(type=='auto'){
     if(country1.equals(country2) && country1.equals("united kingdom")) {
       atype='domestic';
     } else if(dist<3700.){
       atype='short haul';
     } else {
       atype='long haul';
     }
  }

  co2=dataFinder.getDataItemValue('transport/plane/generic/freight/ghgp/us', 'type='+atype,'kgCO2PerTonneKm')
  
  dist * mass * RFI * co2;

}    
