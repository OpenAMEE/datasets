var ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP');

var organicAmendmentScalingFactor;
if (organicAmendment == 'none') {
  organicAmendmentScalingFactor = 1;
} else {
  try {
    var m = massOrganicAmendmentPerArea;
    var base = 1 +  (massOrganicAmendmentPerArea *  organicFactor);
    organicAmendmentScalingFactor =  Math.pow(base, 0.59);
  } catch(error) {
    organicAmendmentScalingFactor = 1;
  }
}

emissionsFactor = massCH4PerAreaPerDay * cultivationWaterScalingFactor * preCultivationWaterScalingFactor * organicAmendmentScalingFactor;

ch4Emissions = emissionsFactor * cultivationPeriod * harvestedArea;

co2eEmissions = ch4Emissions * ch4GWP;

returnValues.putValue('CH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2e');
