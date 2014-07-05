'use strict';


var assert = require('assert');
var path   = require('path');
var jsyaml = require('../../lib/js-yaml');
var helper = require('../support/helper');

var TEST_SCHEMA = require('../support/schema').TEST_SCHEMA;


helper.generateTests({
  description: 'Dumper.',
  directory: path.join(__dirname, 'loader'),
  files: ['.js'],
  test: function (codeFile) {
    var object, data, serialized, deserialized;

    object       = codeFile.content;
    data         = 'function' === typeof object ? object.expected : object;
    serialized   = jsyaml.dump(data,       { schema: TEST_SCHEMA });
    deserialized = jsyaml.load(serialized, { schema: TEST_SCHEMA });

    if ('function' === typeof object) {
      object.call(this, deserialized);
    } else {
      assert.deepEqual(deserialized, object);
    }
  }
});
