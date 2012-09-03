var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

((fluxQuantity * fluxPurity * fluxCarbon * 1000) - (steelQuantity * steelCarbon * 1000) - (ironQuantity * ironCarbon * 1000) - (cokeQuantity * cokeCarbon) - (tarQuantity * tarCarbon) - (oilQuantity * oilCarbon) - (cokeOvenGasQuantity * cokeOvenGasCarbon) - (blastFurnaceGasQuantity * blastFurnaceGasCarbon)) * stoich;
