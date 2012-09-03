// get country from metadata
try {
  var c = country
} catch(error) {
  try {
    country =  profileFinder.getProfileItemValue('metadata', 'country');
  } catch(error) {
    country = null;
  }
}

if (country == null) {
  country = 'United Kingdom'
}

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

var absolute = true;
var perTime = true;

try {
  var t = totalTimeInUse;
} catch(error) {
  absolute = false;
}

try {
  var h = timePerTimePeriod;
} catch(error) {
  perTime = false;
}

if (absolute) {
  kWh = (wattage / 1000) * totalTimeInUse * number;
  kWh * countryElecValue;
} else if (perTime) {
  kWh = (wattage / 1000) * (timePerTimePeriod * timePeriod) * number;
  kWh * countryElecValue;
} else {
  0;
}
