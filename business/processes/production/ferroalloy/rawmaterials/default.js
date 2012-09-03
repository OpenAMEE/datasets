carbonToCO2Ratio = dataFinder.getDataItemValue('planet/stoichiometries/ratios', 'fromTo=CarbonToCo2', 'ratio')

try{
 try{
  reducingAgent = reducingAgentQuantity * reducingAgentCarbonContent * carbonToCO2Ratio
 } catch(err) {
  derivedCarbonContent = 1 - percentageAsh - percentageVolatiles*(1 - carbonContentInVolatiles);
  reducingAgent = reducingAgentQuantity * derivedCarbonContent * carbonToCO2Ratio;
 }
}
catch(err){
 reducingAgent = reducingAgentQuantity * massCO2PerMassReducingAgent 
}

ore = oreQuantity * oreCarbonContent * carbonToCO2Ratio
slag = slagQuantity * slagCarbonContent * carbonToCO2Ratio
product = productQuantity * productCarbonContent * carbonToCO2Ratio
nonProduct = nonProductOutgoingStreamQuantity * nonProductOutgoingStreamCarbonContent * carbonToCO2Ratio

co2 = (reducingAgent + ore + slag - product - nonProduct) * 1000; // tonnes to kgs
