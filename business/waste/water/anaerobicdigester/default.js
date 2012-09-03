poundsToKilos = 0.454;

ch4Produced = volumetricFlow * (CH4Concentration/100) * density * (520 / temperature) * pressure * time * poundsToKilos;
ch4Destroyed = ch4Produced * destructionEfficiency;
ch4Emissions = ch4Produced * (1 - destructionEfficiency);

ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
co2eEmissions = ch4Emissions * ch4GWP;

returnValues.putValue('producedCH4', 'kg',null, ch4Produced);
returnValues.putValue('destroyedCH4', 'kg',null, ch4Destroyed);
returnValues.putValue('emittedCH4', 'kg',null, ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
returnValues.setDefaultType('destroyedCH4');
