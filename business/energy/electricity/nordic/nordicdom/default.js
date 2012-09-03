//
// SD-245/SC-320: Bergen Energi Data for Nordic Disclosure
//
var renewableCO2Emissions = 0.0;
var nuclearCO2Emissions = 0.0;
var fossilCO2Emissions = 0.0;
var totalCO2Emissions = 0.0;

if (typeof(energy) == 'undefined') {

  // cannot caluclate without a quantity of aluminium
  co2Emissions = 0;
  returnValues.addNote('comment', 'Cannot calculate. A quantity of electricity is required');

} else {

  // proceed with calculation
  // this is a simple calculation as the data is already given in terms of 
  // emissions intensities
  // Convert to kgs

  renewableCO2Emissions = energy*massPerEnergyRenewable / 1000.0;
  nuclearCO2Emissions = energy*massPerEnergyNuclear / 1000.0;
  fossilCO2Emissions = energy*massPerEnergyFossil / 1000.0;

  // use the total emissions intensity here instead of summing the others
  // which is the more correct thing to do
  totalCO2Emissions = energy*massPerEnergyTotal / 1000.0;

}

// assign
returnValues.putValue('CO2', 'kg', null, totalCO2Emissions);
returnValues.putValue('renewableCO2', 'kg', null, renewableCO2Emissions);
returnValues.putValue('nuclearCO2', 'kg', null, nuclearCO2Emissions);
returnValues.putValue('fossilCO2', 'kg', null, fossilCO2Emissions);
returnValues.setDefaultType('CO2'); 
