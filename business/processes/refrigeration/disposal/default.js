
try {
  var r = refrigerantType;
  gwp = dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+refrigerantType,'GWP');
} catch(error) {
  refrigerantType = null;
  gwp = null;
}

if (gwp == null ) {
  returnValues.addNote('comment', 'Specific refrigerant type not known. Cannot calculate CO2e emissions');  
} else {
  returnValues.addNote('comment', refrigerantType+' emissions converted to CO2e using a global warming potential of '+gwp);
}

rawEmissions = numberOfUnits * equipmentChargeCapacity * (capacityRemainingAtDisposal/100) * (1-(refrigerantRecovered/100));
co2eEmissions = rawEmissions * gwp;

returnValues.putValue('absoluteEmissions', 'kg', null, rawEmissions);
returnValues.putValue('CO2e', 'kg', null, co2eEmissions);
returnValues.setDefaultType('CO2e'); 
