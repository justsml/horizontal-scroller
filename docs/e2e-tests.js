//const casper = require('casper').create()
const URL = 'http://0.0.0.0:1997/tests/index.html'
const VIEWPORT = {
  top: 0,
  left: 0,
  width: 1280,
  height: 900
};
const CAPTURE_FORMAT = {
  format: 'jpg',
  quality: 85
};

casper.options.verbose = true;
casper.options.viewportSize = { width: VIEWPORT.width, height: VIEWPORT.height };

casper.test.begin('has 2 arrows', 3, function (test) {
  // casper.on('complete.error', function(err) {
  //   this.die("Complete callback has failed: " + err);
  // });

  casper.start('http://0.0.0.0:1997/tests/index.html', function () {
    this.echo('Loaded')
  }).waitForText('Horizontal', function () {
    test.assertTextExists('Horizontal', 'page body contains "Horizontal"')
    // this.echo('page body contains "Horizontal"')
  }).waitUntilVisible('svg.rightArrow',
    function _then() { this.echo('Has right arrow loaded...') },
    function _failed() { this.echo('Has right arrow loaded...') }, 6000);

  casper.then(function () {
    test.assertExists('.leftArrow');
    test.assertExists('.rightArrow');
  })
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('can scroll right', 5, function (test) {
  casper.start('http://0.0.0.0:1997/tests/index.html', function () {
    this.wait(500, function () {
      this.echo('Scroll test')
    })
    this.capture('temp/scroll-test-2-1.jpg', VIEWPORT, CAPTURE_FORMAT);
  })
  casper.then(function () {
    this.echo('User Agent: ' + casper.evaluate(function () {
      // var lastItem = document.querySelectorAll('.items li:last-child');
      // var firstItem = document.querySelectorAll('.items li:first-child');
      return navigator.userAgent;
    }));
    this.echo('LOADED URL:' + casper.evaluate(function () {
      // var lastItem = document.querySelectorAll('.items li:last-child');
      // var firstItem = document.querySelectorAll('.items li:first-child');
      return location.href;
    }))
  })
  casper.then(function () {
    var lastOffset = 0;
    var showTransformOffset = function () {
      var txPx = casper.evaluate(function () {
        var transform = document.querySelector('.items').style.transform;
        // remove string around 'translatex(n)'
        return transform && transform.replace(/[^\d\-\.]/g, '') || 0;
      });
      // this.echo(' ### Transform: ~~ ' + txPx)
      lastOffset = parseFloat(txPx);
      return lastOffset;
    };

    // var itemsListRect = casper.evaluate(function() {
    //   return document.querySelector('.items').getBoundingClientRect();
    // });
    // this.echo('itemsList #1:' + JSON.stringify(itemsListRect, null, 2));
    this.thenClick('.rightArrow', function () {
      this.wait(50, function () {
        this.thenClick('.rightArrow', function () {
          casper.test.assert(lastOffset > showTransformOffset.bind(this)(), 'Left offset/style/translatex must decrease when scrolling right')
        })
      })
    }).then(function () {
      this.wait(50, function () {
        this.thenClick('.rightArrow', function () {
          casper.test.assert(lastOffset > showTransformOffset.bind(this)(), 'Left offset/style/translatex must decrease when scrolling right')
        })
      })
    }).then(function () {
      this.wait(50, function () {
        this.thenClick('.rightArrow', function () {
          casper.test.assert(lastOffset > showTransformOffset.bind(this)(), 'Left offset/style/translatex must decrease when scrolling right')
        })
      })
    }).then(function () {
      this.wait(50, function () {
        this.thenClick('.rightArrow', function () {
          casper.test.assert(lastOffset > showTransformOffset.bind(this)(), 'Left offset/style/translatex must decrease when scrolling right')
        })
      })
    })
  })
  casper.then(function () {
    // var itemsListRect = casper.evaluate(function() {
    //   return document.querySelector('.items').getBoundingClientRect();
    // });
    // var boxes = casper.evaluate(function() {
    //   return document.querySelectorAll('.items li');
    // });
    // var firstBox = casper.evaluate(function() {
    //   var items = document.querySelectorAll('.items li');
    //   var item = items[0];
    //   return item.getBoundingClientRect();
    // });
    // var lastBox = casper.evaluate(function() {
    //   var items = document.querySelectorAll('.items li img');
    //   var item = items[items.length - 1];
    //   return item.getBoundingClientRect();
    // });
    // this.echo('itemsList #2:' + JSON.stringify(itemsListRect, null, 2));
    // this.echo('boxes:    ' + JSON.stringify(boxes.length, null, 2));
    // this.echo('firstBox: ' + JSON.stringify(lastBox, null, 2));
    // this.echo('lastBox:  ' + JSON.stringify(lastBox, null, 2));

    this.capture('temp/scroll-test-2-3.jpg', VIEWPORT, CAPTURE_FORMAT);
    casper.test.assertElementCount('li', 12)
    // casper.test.assertNotVisible('.items li:first-child img', 'First image shouldn\'t be visible');
  })
})
casper.run(function () {
  casper.test.done();
});
