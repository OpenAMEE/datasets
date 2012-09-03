// establish feedstock carbon
//c = parseFloat(dataFinder.getDataItemValue('business/processes/production/petrochemical/massbalance/carboncontent','type=' + secondaryFeedstock,'carbonContent'));

function getTotalCarbon(mass,carbon,label) {
  if (mass) {
    if (carbon) {
      totalCarbon = mass * carbon;
    } else if (label) {
      carbonContent = parseFloat(dataFinder.getDataItemValue('business/processes/production/petrochemical/massbalance/carboncontent','type=' + label,'carbonContent'));
      totalCarbon = mass * carbonContent;
      //totalCarbon = 666;
    } else {
      totalCarbon = 0;
    }
  } else {
    totalCarbon = 0;
  }
  return totalCarbon;
}

// establish primary feedstock specification
try {
  var m = primaryFeedstockMass;
} catch(error) {
  primaryFeedstockMass = null;
}
try {
  var c = primaryFeedstockCarbon;
} catch(error) {
  primaryFeedstockCarbon = null;
}
try {
  var f = primaryFeedstock;
} catch(error) {
  primaryFeedstock = null;
}

// establish secondary feedstock specification
try {
  var m = secondaryFeedstockMass;
} catch(error) {
  secondaryFeedstockMass = null;
}
try {
  var c = secondaryFeedstockCarbon;
} catch(error) {
  secondaryFeedstockCarbon = null;
}
try {
  var f = secondaryFeedstock;
} catch(error) {
  secondaryFeedstock = null;
}

// establish tertiary feedstock specification
try {
  var m = tertiaryFeedstockMass;
} catch(error) {
  tertiaryFeedstockMass = null;
}
try {
  var c = tertiaryFeedstockCarbon;
} catch(error) {
  tertiaryFeedstockCarbon = null;
}
try {
  var f = tertiaryFeedstock;
} catch(error) {
  tertiaryFeedstock = null;
}

// establish product specification
try {
  var m = productMass;
} catch(error) {
  productMass = null;
}
try {
  var c = productCarbon;
} catch(error) {
  productCarbon = null;
}

// establish primary by-product specification
try {
  var m = primaryByProductMass;
} catch(error) {
  primaryByProductMass = null;
}
try {
  var c = primaryByProductCarbon;
} catch(error) {
  primaryByProductCarbon = null;
}
try {
  var f = primaryByProduct;
} catch(error) {
  primaryByProduct = null;
}

// establish secondary by-product specification
try {
  var m = secondaryByProductMass;
} catch(error) {
  secondaryByProductMass = null;
}
try {
  var c = secondaryByProductCarbon;
} catch(error) {
  secondaryByProductCarbon = null;
}
try {
  var f = secondaryByProduct;
} catch(error) {
  secondaryByProduct = null;
}

// establish tertiary by-product specification
try {
  var m = tertiaryByProductMass;
} catch(error) {
  tertiaryByProductMass = null;
}
try {
  var c = tertiaryByProductCarbon;
} catch(error) {
  tertiaryByProductCarbon = null;
}
try {
  var f = tertiaryByProduct;
} catch(error) {
  tertiaryByProduct = null;
}

// feedstocks 1, 2 and 3
f1 = getTotalCarbon(primaryFeedstockMass,primaryFeedstockCarbon,primaryFeedstock);
f2 = getTotalCarbon(secondaryFeedstockMass,secondaryFeedstockCarbon,secondaryFeedstock);
f3 = getTotalCarbon(tertiaryFeedstockMass,tertiaryFeedstockCarbon,tertiaryFeedstock);

// main product
p = getTotalCarbon(productMass,productCarbon,product);

// by-products 1, 2 and 3
b1 = getTotalCarbon(primaryByProductMass,primaryByProductCarbon,primaryByProduct);
b2 = getTotalCarbon(secondaryByProductMass,secondaryByProductCarbon,secondaryByProduct);
b3 = getTotalCarbon(tertiaryByProductMass,tertiaryByProductCarbon,tertiaryByProduct);

var stoich = dataFinder.getDataItemValue('planet/stoichiometries/ratios','fromTo=CarbonToCo2','ratio');

(f1 + f2 + f3 - p - b1 - b2 - b3) * 1000 * stoich;
