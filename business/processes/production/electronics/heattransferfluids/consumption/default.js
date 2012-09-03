try {
  var f = fluid;
  gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+fluid,'GWP');
} catch(error) {
  fluid = null;
  gwp = null;
}

rawEmissions = density * (previousFC + purchasedFC - newCharge + oldCharge - remainingFC - recoveredFC);

if (gwp == null) {
  co2eEmissions = 0;
  defaultEmissions = rawEmissions;
  returnValues.addNote('comment', 'Specific compound not know. Cannot calculate CO2e emissions');
} else {
  co2eEmissions = rawEmissions * gwp;
  defaultEmissions = co2eEmissions;
  returnValues.addNote('comment', fluid+' emissions converted to CO2e using a global warming potential of '+gwp);
}

// this value is retained to support legacy functionaility
// a single value which switches depending on the specification of the fluid type
returnValues.putValue('default', 'kg', null, defaultEmissions); 

// these new values separate raw and CO2e quantities
returnValues.putValue('rawQuantity', 'kg', null, rawEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('default'); 
