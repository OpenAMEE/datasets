var conversionFactor = 0.67; // converts cubic metres to kg

// establish emissions for inventory year per time period
total1901to1925 = volumeCH4PerTime1901to1925 * minesAbandoned1901to1925;
total1926to1950 = volumeCH4PerTime1926to1950 * minesAbandoned1926to1950;
total1951to1975 = volumeCH4PerTime1951to1975 * minesAbandoned1951to1975;
total1976to2000 = volumeCH4PerTime1976to2000 * minesAbandoned1976to2000;

// as above but catch introduced where 2001toPresent emissions factor not available, i.e. in the case that the inventory year is prior to 2000
try {
   total2001toPresent = volumeCH4PerTime2001toPresent * minesAbandoned2001toPresent;
} catch(error) {
   total2001toPresent = 0;
}

// sum emissions for each time period
totalEmissions = total1901to1925 + total1926to1950 + total1951to1975 + total1976to2000 + total2001toPresent;

// subtract recovered emissions and convert to mass CO2e
ch4Emissions = (totalEmissions - recoveredMethane) * conversionFactor;

// fetch GWP
ch4GWP = dataFinder.getDataItemValue('planet/greenhousegases/gwp', 'gas=CH4', 'GWP');
co2eEmissions = ch4Emissions * ch4GWP;

returnValues.putValue('CH4', 'kg', 'year', ch4Emissions);
returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
returnValues.putValue('CO2e', 'kg', 'year', co2eEmissions);
returnValues.setDefaultType('CO2e'); 
