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

// get global warming potentials
ch4GWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=CH4','GWP')); 
n2oGWP = parseFloat(dataFinder.getDataItemValue('planet/greenhousegases/gwp','gas=N2O','GWP')); 

// run main method
carbon(massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy);
//print(carbon(0.0,0.0,1.0,false,false,true))

// aggregate data into CO2e emissions estimate
function carbon(massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy) {
   
  // define each gas
  var ch4Emissions;
  var n2oEmissions;
  var co2Emissions;
  var co2eEmissions;
  
  // report error with zero carbon if multiple values asserted
  if (isMass&&isVolume) {
    ch4Emissions=0;
    n2oEmissions=0;
    co2Emissions=0;
    co2eEmissions=0;
    returnValues.addNote('comment', 'Please specify either mass, volume or energy');
  } else if (isVolume&&isEnergy) {
    ch4Emissions=0;
    n2oEmissions=0;
    co2Emissions=0;
    co2eEmissions=0;  
    returnValues.addNote('comment', 'Please specify either mass, volume or energy');
  } else if (isEnergy&&isMass) {
    ch4Emissions=0;
    n2oEmissions=0;
    co2Emissions=0;
    co2eEmissions=0;
    returnValues.addNote('comment', 'Please specify either mass, volume or energy');
  } else if (!isEnergy&&!isMass&&!isVolume) {
    ch4Emissions=0;
    n2oEmissions=0;
    co2Emissions=0;
    co2eEmissions=0;
    returnValues.addNote('comment', 'Please specify either mass, volume or energy');
  } else {
    // calculate the quantity of emissions for each gas
    ch4Emissions=calcGHG('CH4',massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy);
    n2oEmissions=calcGHG('N2O',massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy);
    co2Emissions=calcGHG('CO2',massAmount,volumeAmount,energyAmount,isMass,isVolume,isEnergy);
    co2eEmissions=co2Emissions + (ch4Emissions * ch4GWP) + (n2oEmissions * n2oGWP);
    returnValues.addNote('comment', 'CH4 emissions converted to CO2e using a global warming potential of '+ch4GWP);
    returnValues.addNote('comment', 'N2O emissions converted to CO2e using a global warming potential of '+n2oGWP);
  }
  // for legacy reasons this switch between CO2 and CO2e must remain
  returnValues.putValue('CO2', 'kg',null, co2Emissions);
  returnValues.putValue('CH4', 'kg',null, ch4Emissions);
  returnValues.putValue('N2O', 'kg',null, n2oEmissions);
  returnValues.putValue('CO2e', 'kg',null, co2eEmissions);
  returnValues.setDefaultType('CO2e'); 
}

// get emissions data for specfic gas type
function calcGHG(gaslabel,massAmount,volumeAmount,energyAmount, isMass,isVolume,isEnergy) {
  // if volume, check that density and heating value exist, otherwise return 0
  if (isVolume) {
    if (hasdensity()&&haslhv()) {
      energyAmount=(volumeAmount * density / 1000000.0)*LHV; // convert kg to Gg
    } else {
      energyAmount=0;
      returnValues.addNote('comment', 'Cannot calculate by volume: missing Lower Heating Value or density');
    }
  }
  // if mass, check that heating value exists, otherwise return 0
  if (isMass) {
    if (haslhv()) {
      energyAmount=massAmount*LHV;
    } else {
      energyAmount = 0;
      returnValues.addNote('comment', 'Cannot calculate by mass: missing Lower Heating Value');
    }
  }
  // if energy, apply higher heating value conversion if appropriate
  if (isEnergy) {
    if (useHHV=='true') {
      energyAmount /= HHVConversion;
    }
  }
  // return emissions quantity for gas using emissions factor and energy quantity
  return energyfactor(gaslabel) * energyAmount;
}

// test for density value
function hasdensity() {
  return density!=-1.0
}

// test for heating value
function haslhv() {
  return LHV!=-1.0
}

// get appropriate emissions factor
function energyfactor(gaslabel) {
  if (gaslabel=='CH4') {
    return EFLHVNRGCH4;
  }
  if (gaslabel=='N2O') {
    return EFLHVNRGN2O;
  }
  if (gaslabel=='CO2') {
    return EFLHVNRGCO2;
  }
  return 0.0;
}
