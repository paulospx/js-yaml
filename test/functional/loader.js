'use strict';


var assert = require('assert');
var path   = require('path');
var jsyaml = require('../../lib/js-yaml');
var helper = require('../support/helper');

var TEST_SCHEMA = require('../support/schema').TEST_SCHEMA;


helper.generateTests({
  description: 'Loader.',
  directory: path.join(__dirname, 'loader'),
  files: ['.data', '.js'],
  test: function (dataFile, codeFile) {
    var object1 = [],
        object2 = codeFile.content;

    jsyaml.loadAll(
      dataFile.content,
      function (doc) { object1.push(doc); },
      { filename: dataFile.path,
        schema: TEST_SCHEMA });

    if (object1.length === 1) {
      object1 = object1[0];
    }

    if ('function' === typeof object2) {
      object2.call(this, object1);
    } else {
      assert.deepEqual(object1, object2);
    }
  }
});
