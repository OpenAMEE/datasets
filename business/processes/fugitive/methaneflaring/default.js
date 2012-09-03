var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=Ch4ToCo2','ratio');

// calculate individual emissions
co2Emissions = volumeCH4Flared * combustionEfficiency * stoich * methaneDensity;
ch4Emissions = volumeCH4Flared * (1 - combustionEfficiency) * methaneDensity;

// fetch GWPs
ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
co2eEmissions = co2Emissions + (ch4Emissions * ch4GWP);

returnValues.putValue('CO2', 'kg', 'year', co2Emissions);
returnValues.putValue('CH4', 'kg', 'year', ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg', 'year', co2eEmissions);
returnValues.setDefaultType('CO2e'); 
