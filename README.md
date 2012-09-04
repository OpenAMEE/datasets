datasets
========

Serialised representations of AMEE datasets and methodologies.

This repository contains serialised representations of the datasets and calculation methodologies available via the AMEE API.

Each dataset/methodology is described by a common set of files which contain the following information:

* itemdev.csv - an abstract description of the components of the dataset (i.e. table columns) and methodology (inputs, outputs, return values)
* data.csv    - a table of data, usually describing specific scenarios relating to an emissions-producing activity
* default.js  - a javascript algorithm which describes the computation of some output (usually emissions) based on certain inputs and dataset data
* return_values.csv - description of any calculation output values. In some cases this may be absent and only a single output is provided based upon the final evaluated statement in the default.js algorithm.
* documentation.creole - text file contain a written description of the dataset/methodology and which appears in discover.amee.com
* meta.yml    - metadata for the dataset/methodology include source information, annotations and tags
* changelog.yml - a description of changes made

License
=======

© Copyright 2012 AMEE.

Licensed under the MIT license (See COPYING file for details)