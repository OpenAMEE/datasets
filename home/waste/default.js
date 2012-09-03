try {
  var s = savingType;
}
catch(err){
  savingType="landfill";
}

if(savingType=="recycling"){
  massPerTime * kgCO2RecyclingSavedPerKg;
} else if(savingType=="thermal"){
  massPerTime * kgCO2ThermalSavedPerKg;
}  else if(savingType=="embodied"){
  massPerTime * kgCO2EmbodiedFossilEnergySavedPerKg;
} else {
  massPerTime * kgCO2LandfillSavedPerKg;
}
