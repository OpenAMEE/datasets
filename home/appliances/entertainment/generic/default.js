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

if(device=='standby'){//standby is special!
        standbyCO2=0;
	profileItems = profileFinder.getProfileItems();
	for (i = 0; i < profileItems.size(); i++) {
		item = profileItems.get(i);
		itemValues = item.getItemValuesMap();
                try {//handle where label is undefined
                  label=item.getDataItem().getLabel();
                }
                catch(err){
                  label='';
                }
                if(label.indexOf("standby")<0) {
                  try {//in case amount per month undef
  standbyCO2+=parseFloat(item.getAmount());
//standbyCO2+=100;
                  }
                  catch(err){}//do nothing
                }
	}

	//now do televisions
	tvStandbyCO2=0.;
	if (onStandby!="never"){
		profileItems = profileFinder.getProfileItems("home/appliances/televisions/generic/ranges");
		for (i = 0; i < profileItems.size(); i++) {
			item = profileItems.get(i);
			iv = item.getItemValuesMap();
			if (onStandby=="sometimes"){
				svalue=iv.get('standbySometimesCO2');
			} else if (onStandby=="mostly"){
				svalue=iv.get('standbyMostlyCO2');
			} else if (onStandby=="always"){
				svalue=iv.get('standbyAlwaysCO2');
			}
			try {
				tvStandbyCO2+=parseFloat(svalue.getValue());
			} catch(err){}//do nothing
		}
	}

        if (onStandby=="never"){
          tvStandbyCO2-0.05*standbyCO2;
        } else if (onStandby=="sometimes"){
          tvStandbyCO2+0.0*standbyCO2;
        } else if (onStandby=="mostly"){
          tvStandbyCO2+0.05*standbyCO2;
        } else if (onStandby=="always"){
          tvStandbyCO2+0.08*standbyCO2;
        }
}
else if (countryElecValue != null) {// normal case
	//this ridiculous piece of code just establishes whether
	//this item's name is "zero". Note it only matches on
	//the device, not rating.
	isZero=0;
	profileItems = profileFinder.getProfileItems();
	for (i = 0; i < profileItems.size(); i++) {
		item = profileItems.get(i);
		di = item.getDataItem();
		div=di.getItemValues();
		for (j = 0; j < div.size(); j++) {
			//error+=div.get(j).getValue()+",";
			if(device==div.get(j).getValue()){
		//              error+="FOUND "+device;
				try {
					name=item.getName();
				}
				catch(err){
					name='no name';
				}
				if(name=="zero") {
					isZero=1;
				}
				break;
			}
		}
		if(isZero==1){
			break;
		}
	}
	
	if(isZero==1){
  	  countryElecValue=0.;
	}

    numberOwned * kWhPerYear * countryElecValue;
}