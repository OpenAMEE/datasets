// direct, annual calculation method must retain this functionality (i.e. switching) for legacy reasons
var factor;
if (emissionType == 'direct') {
  if (calculationBasis == 'annual') {
    factor = annualMassDirectCO2PerEnergy;
  } else if (calculationBasis == 'average') {
    factor = massDirectCO2PerEnergy;
  }
} else if (emissionType == 'indirect') {
  factor = massIndirectCO2ePerEnergy;
} else if (emissionType == 'life cycle') {
  factor = massLifeCycleCO2ePerEnergy;
}

if (typeof(factor) == 'number') {
  directAnnualCO2Emissions = factor * energyConsumed;
} else {
  directAnnualCO2Emissions = factor.multiply(energyConsumed).integrate();
}

// direct, rolling average calculation
if (typeof(massDirectCO2PerEnergy) == 'number') {
  directRollingCO2Emissions = massDirectCO2PerEnergy * energyConsumed;
} else {
  directRollingCO2Emissions = massDirectCO2PerEnergy.multiply(energyConsumed).integrate();
}

// indirect calculation
if (typeof(massIndirectCO2ePerEnergy) == 'number') {
  indirectCO2eEmissions = massIndirectCO2ePerEnergy * energyConsumed;
} else {
  indirectCO2eEmissions = massIndirectCO2ePerEnergy.multiply(energyConsumed).integrate();
}

// life cycle calculation
if (typeof(massLifeCycleCO2ePerEnergy) == 'number') {
  lifeCycleCO2eEmissions = massLifeCycleCO2ePerEnergy * energyConsumed;
} else {
  lifeCycleCO2eEmissions = massLifeCycleCO2ePerEnergy.multiply(energyConsumed).integrate();
}


returnValues.putValue('directCO2AnnualBasis', 'kg',null, directAnnualCO2Emissions);
returnValues.putValue('directCO2RollingBasis', 'kg',null, directRollingCO2Emissions);
returnValues.putValue('indirectCO2e', 'kg',null, indirectCO2eEmissions);
returnValues.putValue('lifeCycleCO2e', 'kg',null, lifeCycleCO2eEmissions);
returnValues.setDefaultType('directCO2AnnualBasis');
