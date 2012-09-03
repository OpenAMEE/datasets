// Establish if mass specified
try {
     var m = mass;
} catch(error) {
     mass = null;
}

// make calculation based on either mass or energy
if (mass == null) {
     energyConsumed * massCO2PerEnergy;
} else {
     mass * energyPerMass * massCO2PerEnergy;
}
