co2Emissions = massCO2PerDistance * distance / occupancy;

returnValues.putValue('CO2', 'kg',null, co2Emissions);
co2eEmissions =  co2Emissions;
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('CO2');
returnValues.addNote('comment', 'Only CO2 emissions are provided with this methodology, therefore CO2 and the corresponding CO2e emissions are the same');
