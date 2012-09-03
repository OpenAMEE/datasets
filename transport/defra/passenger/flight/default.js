massCO2PerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massCO2PerDistancePerPassenger'));
massCH4PerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massCH4PerDistancePerPassenger'));
massN2OPerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massN2OPerDistancePerPassenger'));
massDirectCO2ePerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massDirectCO2ePerDistancePerPassenger'));
massIndirectCO2ePerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massIndirectCO2ePerDistancePerPassenger'));
massTotalCO2ePerDistancePerPassenger = parseFloat(dataFinder.getDataItemValue('transport/defra/passenger', 'type=plane,subtype='+type+',class='+passengerClass,'massTotalCO2ePerDistancePerPassenger'));

co2Emissions = massCO2PerDistancePerPassenger * distance * passengers * journeys;
ch4Emissions = massCH4PerDistancePerPassenger * distance * passengers * journeys;
n2oEmissions = massN2OPerDistancePerPassenger * distance * passengers * journeys;
directCO2eEmissions = massDirectCO2ePerDistancePerPassenger * distance * passengers * journeys;
indirectCO2eEmissions = massIndirectCO2ePerDistancePerPassenger * distance * passengers * journeys;
lifeCycleCO2eEmissions = massTotalCO2ePerDistancePerPassenger * distance * passengers * journeys;

returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.putValue('methaneCO2e', 'kg',null, ch4Emissions);
returnValues.putValue('nitrousOxideCO2e', 'kg',null, n2oEmissions);
returnValues.putValue('totalDirectCO2e', 'kg',null, directCO2eEmissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('totalDirectCO2e');

returnValues.addNote('comment', 'This methodology provides emissions directly in terms of CO2e. No global warming potentials are applied in this calculation');
