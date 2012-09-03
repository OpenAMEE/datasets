//if numberOfPeople isn't set, get peopleInHousehold from metadata
try { 
  var c=numberOfPeople;
}
catch(err){
  numberOfPeople=profileFinder.getProfileItemValue('metadata', 'peopleInHousehold') || 1;
}

// get country from metadata
country = profileFinder.getProfileItemValue('metadata', 'country');
if ((country == null) || (country == '')) {
	country = 'United Kingdom';
}

// get electricity value based on country
elecValue = dataFinder.getDataItemValue('home/energy/electricity', 'country=' + country, 'kgCO2PerKWh');

if(elecValue==null){//try ISO code
  elecValue = dataFinder.getDataItemValue('home/energy/electricityiso', 'country=' + country, 'kgCO2PerKWh');
}

gasValue = dataFinder.getDataItemValue('home/energy/quantity', 'type=gas', 'kgCO2PerKWh');

//error="E: ";
//this ridiculous piece of code just establishes whether
//this item has name "none".
isNone=0;
profileItems = profileFinder.getProfileItems();
for (i = 0; i < profileItems.size(); i++) {
	item = profileItems.get(i);
	di = item.getDataItem();
        div=di.getItemValues();
	for (j = 0; j < div.size(); j++) {
		//error+=div.get(j).getValue()+",";
		if(type==div.get(j).getValue()){
	//		error+="FOUND "+type;
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
  factor=0.;
}
else if(type=='gas'){
  factor=gasValue;
} else {
  factor=elecValue;
}

result=factor*(baseKWhPerYear+numberOfPeople*perPersonKWhPerYear);

result;
//original algorithm was just this line: kgCO2PerYear / 12;
