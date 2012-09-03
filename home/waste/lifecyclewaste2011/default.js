//do not allow profile item values if there is no corresponding data item value (they entered something they shouldn't have)
try{
  kgCO2ePreparationForReUse
}catch(err){
  kgCO2ePreparationForReUse = 0
  quantityReUse = 0
  returnValues.addNote('comment', 'Your chosen product cannot be re-used');
}
try{
  kgCO2eDisposedByRecyclingClosedLoop
}catch(err){
  quantityClosedLoop = 0
  kgCO2eDisposedByRecyclingClosedLoop = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by closed loop recycling');
}
try{
  kgCO2eDisposedByRecyclingOpenLoop
}catch(err){
  quantityOpenLoop = 0
  kgCO2eDisposedByRecyclingOpenLoop = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by open loop recycling');
}
try{
  kgCO2eCombustion
}catch(err){
  quantityCombustion = 0
  kgCO2eCombustion = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by combustion');
}
try{
  kgCO2eAnaerobicDigestion
}catch(err){
  quantityAnaerobicDigestion = 0
  kgCO2eAnaerobicDigestion = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by anaerobic digestion');
}
try{
  kgCO2eDisposedByComposting
}catch(err){
  quantityComposted = 0 
  kgCO2eDisposedByComposting = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by composting');
}
try{
  kgCO2eProductionEmissions
}catch(err){
  kgCO2eProductionEmissions = 0
  returnValues.addNote('comment', 'There are no production emissions data for your chosen product');
}
try{
  kgCO2eDisposedByLandfill
}catch(err){
  quantityLandfill = 0
  kgCO2eDisposedByLandfill = 0
  returnValues.addNote('comment', 'Your chosen product cannot be disposed of by landfill');
}

// calculate disposal emissions
closedLoopEmissions = quantityClosedLoop * kgCO2eDisposedByRecyclingClosedLoop
openLoopEmissions = quantityOpenLoop * kgCO2eDisposedByRecyclingOpenLoop
combustionEmissions = quantityCombustion * kgCO2eCombustion
anaerobicEmissions = quantityAnaerobicDigestion * kgCO2eAnaerobicDigestion
compostEmissions = quantityComposted * kgCO2eDisposedByComposting
landfillEmissions = quantityLandfill * kgCO2eDisposedByLandfill

//emissions for reuse
reUseEmissions = quantityReUse * kgCO2ePreparationForReUse

//total waste
tonnesOfWasteTotal = quantityReUse + quantityClosedLoop + quantityOpenLoop + quantityCombustion + quantityAnaerobicDigestion + quantityComposted + quantityLandfill

//disposal emissions
disposalEmissions = closedLoopEmissions + openLoopEmissions + combustionEmissions + anaerobicEmissions + compostEmissions + landfillEmissions;

//Production emissions
productionEmissions = tonnesOfWasteTotal * kgCO2eProductionEmissions 

//total co2e
totalEmissions = reUseEmissions + disposalEmissions + productionEmissions;

returnValues.putValue('reUseCO2e', 'kg',null, reUseEmissions);
returnValues.putValue('closedLoopDisposalCO2e', 'kg',null, closedLoopEmissions);
returnValues.putValue('openLoopDisposalCO2e', 'kg',null, openLoopEmissions);
returnValues.putValue('combustionDisposalCO2e', 'kg',null, combustionEmissions);
returnValues.putValue('anaerobicDigestionDisposalCO2e', 'kg',null, anaerobicEmissions);
returnValues.putValue('compostDisposalCO2e', 'kg',null, compostEmissions);
returnValues.putValue('landfillDisposalCO2e', 'kg',null, landfillEmissions);
returnValues.putValue('productionCO2e', 'kg',null, productionEmissions);
returnValues.putValue('totalDisposalCO2e', 'kg',null, disposalEmissions);
returnValues.putValue('totalCO2e', 'kg',null, totalEmissions);
returnValues.setDefaultType('totalCO2e');
