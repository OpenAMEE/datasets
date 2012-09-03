try{
  kgCO2ePerTonneVirgin
}catch(err){
  kgCO2ePerTonneVirgin = 0
}

//do not allow profile item values if there is no corresponding data item value (they entered something they shouldn't have)
try{
  kgCO2ePerTonneRecycled
}catch(err){
  kgCO2ePerTonneRecycled = 0
  percentageRecycled = 0
}
try{
  kgCO2eDisposedByRecyclingClosedLoop
}catch(err){
  quantityClosedLoop = 0
  kgCO2eDisposedByRecyclingClosedLoop = 0
}
try{
  kgCO2eDisposedByRecyclingOpenLoop
}catch(err){
  quantityOpenLoop = 0
  kgCO2eDisposedByRecyclingOpenLoop = 0
}
try{
  kgCO2eAnaerobicDigestion
}catch(err){
  quantityAnaerobicDigestion = 0
  kgCO2eAnaerobicDigestion = 0
}
try{
  kgCO2eDisposedByComposting
}catch(err){
  quantityComposted = 0 
  kgCO2eDisposedByComposting = 0
}
try{
  kgCO2ePowerOnlyMovingGrate
}catch(err){
  quantityMovingGrate = 0 
  kgCO2ePowerOnlyMovingGrate = 0
}
try{
  kgCO2eDisposedByLandfill
}catch(err){
  quantityLandfill = 0 
  kgCO2eDisposedByLandfill = 0
}

// calculate disposal emissions
closedLoopEmissions = quantityClosedLoop * kgCO2eDisposedByRecyclingClosedLoop
openLoopEmissions = quantityOpenLoop * kgCO2eDisposedByRecyclingOpenLoop
movingGrateEmissions = quantityMovingGrate * kgCO2ePowerOnlyMovingGrate
anaerobicEmissions = quantityAnaerobicDigestion * kgCO2eAnaerobicDigestion
compostEmissions = quantityComposted * kgCO2eDisposedByComposting
landfillEmissions = quantityLandfill * kgCO2eDisposedByLandfill

//calculate percentage virgin material
percentageVirgin = 100 - percentageRecycled

//total waste
tonnesOfWasteTotal = quantityClosedLoop + quantityOpenLoop + quantityMovingGrate + quantityAnaerobicDigestion + quantityComposted + quantityLandfill

//co2 for each disposal type
recycledEmbodiedEmissions = tonnesOfWasteTotal * (percentageRecycled/100) * kgCO2ePerTonneRecycled
virginEmbodiedEmissions = tonnesOfWasteTotal * (percentageVirgin/100) * kgCO2ePerTonneVirgin

disposalEmissions = closedLoopEmissions + openLoopEmissions + movingGrateEmissions + anaerobicEmissions + compostEmissions + landfillEmissions;

// this switch needs to be retained for legacy reasons
try {
  var d = disposalEmissionsOnly;
} catch(error) {
  disposalEmissionsOnly = null;
}

//total co2e
if (disposalEmissionsOnly == 'true') {
     totalEmissions = disposalEmissions;
} else {
     totalEmissions = recycledEmbodiedEmissions + virginEmbodiedEmissions + disposalEmissions;
}

returnValues.putValue('closedLoopDisposalCO2e', 'kg',null, closedLoopEmissions);
returnValues.putValue('openLoopDisposalCO2e', 'kg',null, openLoopEmissions);
returnValues.putValue('movingGrateDisposalCO2e', 'kg',null, movingGrateEmissions);
returnValues.putValue('anaerobicDigestionDisposalCO2e', 'kg',null, anaerobicEmissions);
returnValues.putValue('compostDisposalCO2e', 'kg',null, compostEmissions);
returnValues.putValue('landfillDisposalCO2e', 'kg',null, landfillEmissions);
returnValues.putValue('totalDisposalCO2e', 'kg',null, disposalEmissions);
returnValues.putValue('recycledEmbodiedCO2e', 'kg',null, recycledEmbodiedEmissions);
returnValues.putValue('virginEmbodiedCO2e', 'kg',null, virginEmbodiedEmissions);
returnValues.putValue('totalCO2e', 'kg',null, totalEmissions);
returnValues.setDefaultType('totalCO2e');
