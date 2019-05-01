global.expect = require('expect');

const jsdom = require('jsdom');
const path = require('path');

before(function(done) {
  const src = path.resolve(__dirname, '..', 'index.js');
  const babelResult = require('babel-core').transformFileSync(src, {
    presets: ['env']
  });
  const html = path.resolve(__dirname, '..', 'index.html');

  jsdom.env(html, [], { src: babelResult.code }, (err, window) => {
    if (err) {
      return done(err);
    }

    Object.keys(window).forEach(key => {
      global[key] = window[key];
    });

    return done();
  });
});


/*
Then we call jsdom.env(). This function can receive four arguments, but typically is only given three.

An HTML string. This string sets up the DOM — it can be arbitrarily long (we could even read in a full HTML file), but in this case, we just need something basic, since our tests don't really use the DOM.

An Array of paths to source files. We only have one file to test, so it's the only element in the array.

A configuration object that adjusts how Mocha runs. This is often left out because Mocha's default behavior is fine.

A callback. This function, in typical Node.js fashion, receives an error first. The err will most likely be null, but if it's defined, we call done(err) to tell Mocha to stop and show us what went wrong. Assuming things are going as expected, we then take all of the things defined on window (including, in this lab, the functions we've written) and add them to global so that we can call them in our tests.

Finally, we call done() with no arguments to tell Mocha that we're finished with this before(). The tests start running here.
*/