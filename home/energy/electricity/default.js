if(currentReading>0 || lastReading>0){
  if(currentReading>=0 && lastReading>=0) {
    (currentReading-lastReading) * kgCO2PerKWh;
  }
  else {
    0.;
  }
}
else {
  energyConsumption * kgCO2PerKWh;
}