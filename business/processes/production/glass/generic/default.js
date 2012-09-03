try {
     var c = culletRatio;
} catch(error) {
     culletRatio = "";
}

if (culletRatio == "") {
     culletRatio = typicalCulletRatio;
}

massProduced * massCO2PerMass * (1 - (culletRatio / 100));

