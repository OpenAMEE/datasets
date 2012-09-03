absoluteEmissions = purchased - newCapacity + service + retiredCapacity - recovered;

try {
  var f = refrigerant;
   gwp = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas='+refrigerant,'GWP'));
   CO2eEmissions = absoluteEmissions * gwp
   returnValues.addNote('comment', 'Absolute '+refrigerant+' emissions converted to CO2e using a global warming potential of '+gwp);
} catch(error) {
  CO2eEmissions = 0;
  returnValues.addNote('comment', 'Valid refrigerant type not specified. Cannot calculate CO2e emissions.');
}

returnValues.putValue('absoluteEmissions', 'kg',null, absoluteEmissions);
returnValues.putValue('CO2e', 'kg',null, CO2eEmissions);
returnValues.setDefaultType('CO2e');
