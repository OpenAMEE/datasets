// Find out if user has specified a mass, a volume, an energy

var isMass
var isVol
var isNRG
var massAmount
var energyAmount
var volumeAmount

try {
    massAmount=mass;
    isMass=true;
} catch (error) {
    massAmount=0.0;
    isMass=false ;
}

try {
    energyAmount=NRG;
    isEnergy=true;
} catch (error) {
    energyAmount=0.0;
    isEnergy=false;
}

try {
    volumeAmount=volume;
    isVolume=true;
} catch (error) {
    volumeAmount=0.0;
    isVolume=false;
}

// find out which factors (heating values) available
var hasMass
var hasVolume

try {
    volFactor=HVVolume;
    hasVolume=true;
} catch (error) {
    hasVolume=false;
}

try {
    massFactor=HVMass;
    hasMass=true;
} catch (error) {
    hasMass=false;
}

function carbon(massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy) {

    // report error code as zero carbon amount if multiple values asserted
    if (isMass&&isVolume) {
      returnValues.addNote('comment', 'Error. Cannot specify values for mass AND volume');
      return 0;
    }
    if (isVolume&&isEnergy) {
      returnValues.addNote('comment', 'Error. Cannot specify values for volume AND energy');
      return 0;
    }
    if (isEnergy&&isMass) {
      returnValues.addNote('comment', 'Error. Cannot specify values for energy AND mass');
      return 0;
    }
    if (!isEnergy&&!isMass&&!isVolume) {
      returnValues.addNote('comment', 'Error. Must specify a value for either energy, mass or volume');
      return 0;
    }

    // report error code as zero carbon amount if appropriate factor (mass or vol) is not available
    if (isMass&&!hasMass) {
      returnValues.addNote('comment', 'Error. This item contains no mass-based heating value. Cannot calculate by mass');
      return 0;
    }
    if (isVolume&&!hasVolume) {
      returnValues.addNote('comment', 'Error. This item contains no volume-based heating value. Cannot calculate by volume');
      return 0;
    }

    var CO2;

    // calculate the amount of gas
    CO2=calcGHG(massAmount,volumeAmount,energyAmount,
		isMass,isVolume,isEnergy);
    // weighted sum
    return CO2;
}

function calcGHG(massAmount,volumeAmount,energyAmount,
		 isMass,isVolume,isEnergy) {

    if (isVolume)	energyAmount=volumeAmount*HVVolume;
    if (isMass) 	energyAmount=massAmount*HVMass;
    return EFNRGCO2*energyAmount;
}

co2Emissions = carbon(massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy);
returnValues.putValue('CO2', 'kg',null, co2Emissions);
returnValues.setDefaultType('CO2');
