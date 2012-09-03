// get country from metadata
country = profileFinder.getProfileItemValue('metadata', 'country');
if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}

// get electricity value based on country
countryElecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(countryElecValue==null){//try ISO code
  countryElecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

fac=1.;
people = profileFinder.getProfileItemValue('metadata','peopleInHousehold');

if(people!=null && people>0){
  if(device=='Kettle'){
    fac=(0.13654*people+0.67765);
  } else if(device=='Microwave'){
    fac=(0.683+0.137*people);
  }
}

//error="E: ";
//this ridiculous piece of code just establishes whether
//this items name is "none". Note it only matches on
//the device, not rating or temperature values.
isNone=0;
profileItems = profileFinder.getProfileItems();
for (i = 0; i < profileItems.size(); i++) {
	item = profileItems.get(i);
	di = item.getDataItem();
        div=di.getItemValues();
	for (j = 0; j < div.size(); j++) {
		//error+=div.get(j).getValue()+",";
		if(device==div.get(j).getValue()){
	//		error+="FOUND "+device;
			try {
				name=item.getName();
			}
			catch(err){
				name='no name';
			}
			if(name=="none") {
				isNone=1;
			}
			break;
                }
	}
	if(isNone==1){
		break;
	}
}

if(isNone==1){
//  error+=" isNone";
  countryElecValue=0.;
}

//profileFinder.setProfileItemValue("comment",error);

if (countryElecValue != null) {
	if (kWhPerYear != 0) {
		fac*(kWhPerYear * countryElecValue);
	} else if (kWhPerCycle != 0) {
		cycleRate * kWhPerCycle * countryElecValue;
	} else {
		0;
	}
} else {
	0;
}