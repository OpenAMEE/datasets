embodiedCO2Emissions = massEmbodiedCO2PerMass * mass;
embodiedEnergy = embodiedEnergyPerMass * mass;

returnValues.putValue('CO2', 'kg',null, embodiedCO2Emissions);
returnValues.putValue('energy', 'MJ',null, embodiedEnergy);
returnValues.setDefaultType('CO2');
