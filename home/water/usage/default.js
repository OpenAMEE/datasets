kgCO2PerLitre = parseFloat(dataFinder.getDataItemValue('home/water/defra', 'type=supply and treatment', 'kgCO2ePerCubicMetre'));
kgCO2PerLitre /= 1000; // convert to kg/L

try {
  var upd = usesPerDay;
  litresPerDay=litresPerUse*usesPerDay;
}
catch(err){}

try {
  var mpd = minutesPerDay;
  litresPerDay=litresPerMinute*minutesPerDay;
}
catch(err){}

//if neither uses or minutes given, then data item value
//for litresPerDay which gives typical usage
30.42 * litresPerDay * kgCO2PerLitre * 12;

