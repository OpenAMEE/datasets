energy = energyPerWindow * number;
co2Emissions = massCO2PerWindow * number;

returnValues.putValue('energy', 'MJ',null, energy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.setDefaultType('CO2');
