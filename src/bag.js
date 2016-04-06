/* global URL */
"use strict";

function _classCallCheck ( instance, Constructor ) {
  if ( !( instance instanceof Constructor ) ) {
    throw new TypeError(
        "Cannot call a class as a function" );
  }
}

console.clear();

var SVGNS = "http://www.w3.org/2000/svg",
    XLINKNS = "http://www.w3.org/1999/xlink",
    TAU = 2 * Math.PI,
    SYS_FONTS =
    "-apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif",
    skins = [ "#FFDFC4", "#F0D5BE", "#EECEB3", "#E1B899", "#E5C298",
      "#FFDCB2", "#E5B887", "#E5A073", "#E79E6D", "#DB9065", "#CE967C",
      "#C67856", "#BA6C49", "#A57257", "#F0C8C9", "#DDA8A0", "#B97C6D",
      "#A8756C", "#AD6452", "#5C3836", "#CB8442", "#BD723C", "#704139",
      "#A3866A", "#870400", "#710101", "#430000", "#5B0001", "#302E2E" ],
    PIANO_BASE = Math.pow( 2, 1 / 12 ),
    OSCILLATORS = [ ];

function piano ( n ) {
  return 440 * Math.pow( PIANO_BASE, n - 49 );
}

//setup audio or a polyfill for requestAnimationFrame for when CodePen displays pens in profile views.
var IS_IN_GRID = false,
    play = null,
    noteOn = null,
    noteOff = null,
    MAX_NOTE_COUNT = navigator.maxTouchPoints + 1;

var Keyboard = ( function () {
  function Keyboard () {
    var numNotes = arguments.length <= 0 || arguments[0] === undefined ?
        null : arguments[0];
    var type = arguments.length <= 1 || arguments[1] === undefined ?
        "sawtooth" : arguments[1];

    _classCallCheck( this, Keyboard );

    this.audio = window.AudioContext && new AudioContext();
    if ( this.audio && this.audio.createGain ) {
      this.available = true;
      this.mainVolume = this.audio.createGain();
      this.mainVolume.connect( this.audio.destination );
      this.numNotes =
          1; //(numNotes || (navigator.maxTouchPoints + 1) || 1);
      this.oscillators = [ ];

      for ( var i = 0; i < this.numNotes; ++i ) {
        var o = this.audio.createOscillator(),
            g = this.audio.createGain();
        o.type = type;
        o.frequency.value = 0;
        o.connect( g );
        o.start();
        g.connect( this.mainVolume );
        this.oscillators.push( {
          osc: o,
          gn: g,
          timeout: null
        } );
      }
    } else {
      this.available = false;
      IS_IN_GRID = true;
    }
  }

  Keyboard.prototype.noteOn = function noteOn ( volume, i ) {
    var n = arguments.length <= 2 || arguments[2] === undefined ? 0 :
        arguments[2];

    if ( this.available ) {
      var o = this.oscillators[n % this.numNotes],
          f = piano( parseFloat( i ) + 1 );
      o.gn.gain.value = volume;
      o.osc.frequency.setValueAtTime( f, 0 );
      return o;
    }
  };

  Keyboard.prototype.noteOff = function noteOff ( i ) {
    var n = arguments.length <= 1 || arguments[1] === undefined ? 0 :
        arguments[1];

    if ( this.available ) {
      var o = this.oscillators[n % this.numNotes];
      o.osc.frequency.setValueAtTime( 0, 0 );
    }
  };

  Keyboard.prototype.play = function play ( i, volume, duration ) {
    var n = arguments.length <= 3 || arguments[3] === undefined ? 0 :
        arguments[3];

    if ( this.available ) {
      var o = this.noteOn( volume, i, n );
      if ( o.timeout ) {
        clearTimeout( o.timeout );
        o.timeout = null;
      }
      o.timeout = setTimeout( ( function ( i, n ) {
        this.noteOff( i, n );
      } ).bind( this, i, n ), duration * 1000 );
    }
  };

  return Keyboard;
} )();

function randomRange ( min, max ) {
  return Math.random() * ( max - min ) + min;
}

function randomInt ( min, max ) {
  return Math.floor( randomRange(
      max === undefined ? 0 : min,
      max === undefined ? min : max ) );
}

function randomSteps ( min, max, steps ) {
  return min + randomInt( 0, ( 1 + max - min ) / steps ) * steps;
}

// This function is what is called a "Higher-order function", i.e. it is a function that takes a function as a parameter. Think of it as a function that doesn't know how to do the entire job, but it knows how to do some of it, and asks for the rest of the job as a parameter. It's a convenient way to be able to combine different bits of functionality without having to write the same code over and over again.
function FCT ( thunk, evt ) {
  // for every point that has changed (we don't need to update points that didn't change, and on the touchend event, there is no element for the most recently released finger in the regular "touches" property).
  for ( var i = 0; i < evt.changedTouches.length; ++i ) {
    // call whatever function we were given. It's going to be one of start/move/end above, and as you can see, we're overriding the default value of the idx parameter.
    thunk.call( this, evt.changedTouches[i],
        evt.changedTouches[i].identifier );
  }
  evt.preventDefault();
}

// we want to wire up all of the event handlers to the Canvas element itself, so that the X and Y coordinates of the events are offset correctly into the container.
function E ( elem, k, f, t ) {
  var elems;
  if ( elem instanceof String || typeof elem === "string" ) {
    elems = Array.prototype.slice.call( document.querySelectorAll(
        elem ) );
  } else {
    elems = [ elem ];
  }
  if(!f){
    f = function(evt){
      console.log(evt.type, evt);
    };
  }
  else if(typeof f === "string"){
    f = function(property, parts, evt){
      console.log(k, property, parts.reduce(function(obj, k){ return obj[k]; }, evt));
    }.bind(window, f, f.split("."));
  }
  for ( var i = 0; i < elems.length; ++i ) {
    elem = elems[i];
    if ( t ) {
      elem.addEventListener( k, FCT.bind( elem, f ), false );
    } else {
      elem.addEventListener( k, f.bind( elem ), false );
    }
  }
  return elems;
}

function beginApp ( update, render, resize, elem ) {
  var lt = null,
      dt = 0,
      st = 1000 / 60,
      mt = st * 3,
      ft = st / 1000,
      points = { },
      keys = { },
      onpaint = function onpaint ( t ) {
        var ticker = requestAnimationFrame( onpaint );
        try {
          if ( lt !== null ) {
            var realDT = t - lt;
            update( realDT, points, keys );
            render( realDT );
          }
        } catch ( err ) {
          cancelAnimationFrame( ticker );
          throw err;
        }
        lt = t;
      };

  // This function gets called the first time a mouse button is pressed or a new finger touches the screen. The idx value defaults to 10 because mouse clicks don't have an identifier value, but we need one to keep track of mouse clicks separately than touches, which do have identifier values, ending at 9.
  function setPoint ( evt ) {
    var idx = arguments.length <= 1 || arguments[1] === undefined ? 10 :
        arguments[1];

    if ( idx === 10 ) {
      evt.preventDefault();
    }

    var obj = {
      x: evt.clientX,
      y: evt.clientY,
      rx: evt.radiusX || 1,
      ry: evt.radiusY || 1,
      b: evt.buttons
    };

    if ( obj.b === undefined ) {
      obj.b = 1;
    } else if ( obj.b > 0 && obj.rx * obj.ry === 1 ) {
      obj.rx = 1.5;
      obj.ry = 1.5;
    }

    points[idx] = obj;
  }

  // This function gets called anytime the mouse or one of the fingers is released. It just cleans up our tracking objects, so the next time the mouse button is pressed, it can all start over again.
  function endPoint ( evt ) {
    var idx = arguments.length <= 1 || arguments[1] === undefined ? 10 :
        arguments[1];

    if ( idx === 10 ) {
      evt.preventDefault();
    }
    delete points[idx];
  }

  function keyDown ( evt ) {
    keys[evt.keyCode] = true;
    keys.shift = evt.shiftKey;
    keys.ctrl = evt.ctrlKey;
    keys.alt = evt.altKey;
  }

  function keyUp ( evt ) {
    keys[evt.keyCode] = false;
    keys.shift = evt.shiftKey;
    keys.ctrl = evt.ctrlKey;
    keys.alt = evt.altKey;
  }

  E( elem, "mousedown", setPoint );
  E( elem, "mousemove", setPoint );
  E( elem, "mouseup", endPoint );
  E( elem, "mouseout", endPoint );
  E( elem, "touchstart", setPoint, true );
  E( elem, "touchmove", setPoint, true );
  E( elem, "touchend", endPoint, true );

  E( window, "keydown", keyDown );
  E( window, "keyup", keyUp );
  E( window, "resize", resize );

  resize();
  requestAnimationFrame( onpaint );
}

function findEverything () {
  return Array.prototype.filter.call( document.querySelectorAll( "*" ),
      function ( e ) {
        return e.id;
      } )
      .reduce(
          function (
              o,
              e ) {
            return ( o[e.id] = e, o );
          }, { } );
}

function onKeyCode ( time, keys, code, thunk ) {
  var delay = arguments.length <= 4 || arguments[4] === undefined ?
      0.25 :
      arguments[4];

  if ( !keys[code] ) {
    onKeyCode.lastSwitch = onKeyCode.lastSwitch || { };
    onKeyCode.lastSwitch[code] = 0;
  }
  if ( keys[code] && time - onKeyCode.lastSwitch[code] >= delay ) {
    onKeyCode.lastSwitch[code] = time;
    thunk();
  }
}

function createWorker ( script ) {
  var stripFunc = arguments.length <= 1 || arguments[1] === undefined ?
      true : arguments[1];

  if ( typeof script === "function" ) {
    script = script.toString();
  }

  if ( stripFunc ) {
    script = script.trim();
    var start = script.indexOf( '{' );
    script = script.substring( start + 1, script.length - 1 );
  }

  var blob = new Blob( [ script ], {
    type: "text/javascript"
  } ),
      dataURI = URL.createObjectURL( blob );

  return new Worker( dataURI );
}

// Because of the significant overhead for serializing and deserializing objects between threads, if your updates are simple, but your data is large, then you will probably be able to process more of them on the main thread than you can communicate between threads. But if your processing is expensive for a relatively small amount of data, the serialization overhead might be worth the effort. Also, running expensive updates on the worker thread will keep the UI thread responsive, so even if the updates can only run at, say, 10FPS, the rendering is still running at 60FPS.

var Workerize = ( function () {
  function Workerize ( func ) {
    var _this = this;

    _classCallCheck( this, Workerize );

    // First, rebuild the script that defines the class. Since we're dealing with pre-ES6 browsers, we have to use ES5 syntax in the script, or invoke a conversion at a point post-script reconstruction, pre-workerization.

    // start with the constructor function
    var script = func.toString(),
        // strip out the name in a way that Internet Explorer also undrestands (IE doesn't have the Function.name property supported by Chrome and Firefox)
        name = script.match( /function (\w+)\(/ )[1];

    // then rebuild the member methods
    for ( var k in func.prototype ) {
      // We preserve some formatting so it's easy to read the code in the debug view. Yes, you'll be able to see the generated code in your browser's debugger.
      script += "\n\n" + name + ".prototype." + k + " = " +
          func.prototype[k].toString() + ";";
    }

    // Automatically instantiate an object out of the class inside the worker, in such a way that the user-defined function won't be able to get to it.
    script += "\n\n(function(){\n  var instance = new " + name + "();";

    // Create a mapper from the events that the class defines to the worker-side postMessage method, to send message to the UI thread that one of the events occured.
    script +=
        "\n  if(instance.addEventListener){\n    for(var k in instance.listeners) {\n      instance.addEventListener(k, function(){\n        var args = Array.prototype.slice.call(arguments);\n        postMessage(args);\n      }.bind(this, k));\n    }\n  }";

    // Create a mapper from the worker-side onmessage event, to receive messages from the UI thread that methods were called on the object.
    script +=
        "\n\n  onmessage = function(evt){\n    var f = evt.data.shift();\n    if(instance[f]){\n      instance[f].apply(instance, evt.data);\n    }\n  }\n\n})();";

    // The binary-large-object can be used to convert the script from text to a data URI, because workers can only be created from same-origin URIs.
    this.worker = createWorker( script, false );

    // create a mapper from the UI-thread side onmessage event, to receive messages from the worker thread that events occured and pass them on to the UI thread.
    this.listeners = { };
    this.worker.onmessage = function ( e ) {
      var f = e.data.shift();
      if ( _this.listeners[f] ) {
        _this.listeners[f].forEach( function ( g ) {
          return g.apply( _this, e.data );
        } );
      }
    };

    // create mappers from the UI-thread side method calls to the UI-thread side postMessage method, to inform the worker thread that methods were called, with parameters.
    for ( var k in func.prototype ) {
      // we skip the addEventListener method because we override it in a different way, to be able to pass messages across the thread boundary.
      if ( k !== "addEventListener" ) {
        this[k] = ( function () {
          // convert the varargs array to a real array
          var args = Array.prototype.slice.call( arguments );
          this.worker.postMessage( args );
        } ).bind( this,
            k ); // make the name of the function the first argument, no matter what.
      }
    }
  }

  // Adding an event listener just registers a function as being ready to receive events, it doesn't do anything with the worker thread yet.

  Workerize.prototype.addEventListener = function addEventListener ( evt,
      thunk ) {
    if ( !this.listeners[evt] ) {
      this.listeners[evt] = [ ];
    }
    this.listeners[evt].push( thunk );
  };

  return Workerize;
} )();

;
