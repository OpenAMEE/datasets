if (massSteel =="") {
  massSteel=0;
}

embodiedCO2Emissions = (massEmbodiedCO2PerMass+(massEmbodiedCO2PerMassSteelPerVolume*massSteel))*mass;
try { // need this test as one item does not have energy factor
 embodiedEnergy = embodiedEnergyPerMass * mass;
} catch(error) {
  embodiedEnergy = 0;
  returnValues.addNote('comment', 'No embodied energy quantity available');
}

returnValues.putValue('CO2', 'kg',null, embodiedCO2Emissions);
returnValues.putValue('energy', 'MJ',null, embodiedEnergy);
returnValues.setDefaultType('CO2');
