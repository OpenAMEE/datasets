// establish CO2 conversion factor
var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

// establish user specified or default carbon content
var carbon;
try {
  carbon = carbonContent;
} catch(error) {
  carbon = defaultCarbonContent;
}

var massBased = true;
var volumeDensityBased = true;
var volumeMoleBased = true;

try {
  var m = mass;
} catch(error) {
  massBased = false;
}


try {
  var v = volume;
  var d = density;
} catch(error) {
  volumeDensityBased = false;
}

try {
  var v = volume;
  var m = molecularWeight;
  var c = molarVolumeConversionFactor;
} catch(error) {
  volumeMoleBased = false;
}

// convert tonnes to kg, convert percentage to fraction, calculate
if (massBased) {
  (mass * 1000) * (carbon/100) * stoich; // mass in tonnes by default so  x 1000 for converting emissions to kgs
} else if (volumeDensityBased) {
  (volume * density * 1000) * (carbon/100) * stoich; // volume in m^3, density in t/m^3 so  x 1000 for converting emissions to kgs
} else if (volumeMoleBased) {
  (volume * (molecularWeight / molarVolumeConversionFactor)) * (carbon/100) * stoich; // 'density' (ratio of MW and MCF) in g/L which is the same as kgs/m^3. Since volume in m^3, emissions already in kgs and therefore no need for x 1000 conversion from tonnes.
} else {
  0;
}

