/* global VideoCue, devicePixelRatio, SYS_FONTS */

function VideoPlayer ( enableEditing, videoCues ) {
  "use strict";
  var STROKE_WIDTH = 3,
      FONT_SIZE = 20,
      TEXT_PADDING = 10,
      vid = document.querySelector( "#vid" ),
      canv = document.createElement( "canvas" ),
      ctx = canv.getContext( "2d" ),
      output = null,
      bounds = null,
      start = null,
      cues = videoCues.sort( VideoCue.byTime ),
      currentCues = cues.map( function ( f ) {
        return new VideoCue( f );
      } );

  function startPoint ( evt ) {
    if ( enableEditing && !vid.paused ) {
      start = new VideoCue( evt, bounds, vid );
      vid.pause();
    }
  }

  function movePoint ( evt ) {
    if ( bounds ) {
      if ( enableEditing && start ) {
        var end = new VideoCue( evt, bounds, vid );
        end.rectify( start );
        clearScreen();
        end.draw( ctx, STROKE_WIDTH );
      }
      else if ( vid.paused && currentCues.length > 0 ) {
        var currentCue = currentCues[0];
        canv.style.cursor = currentCue.inBounds( evt, bounds ) ?
            "pointer" : "";
      }
    }
  }

  function showCues ( cues ) {
    if ( output ) {
      output.value = JSON.stringify( cues )
          .replace( /,/g, ",\n" );
    }
  }

  function endPoint ( evt ) {
    if ( enableEditing && start ) {
      var end = new VideoCue( evt, bounds, vid );
      end.rectify( start );
      if ( end.width > 0 && end.height > 0 ) {
        end.text = prompt();
        cues.push( end );
        cues.sort( VideoCue.byTime );
        showCues( cues );
        clearScreen();
      }
      start = null;
      vid.play();
    }
    else if ( vid.paused && currentCues.length > 0 ) {
      var currentCue = currentCues[0];

      if ( currentCue.inBounds( evt, bounds ) ) {
        canv.style.cursor = "";
        currentCues.shift();
        clearScreen();
        vid.play();
      }
      else {
        vid.pause();
      }
    }
  }

  function clearScreen () {
    ctx.clearRect( 0, 0, canv.width, canv.height );
  }

  function paint ( ) {
    if ( currentCues.length > 0 ) {
      requestAnimationFrame( paint );
      resize();
      var currentCue = currentCues[0];
      if ( vid.currentTime >= currentCue.t ) {
        if ( !vid.paused ) {
          vid.pause();
        }
        clearScreen();
        currentCue.draw( ctx, STROKE_WIDTH, FONT_SIZE, SYS_FONTS,
            TEXT_PADDING );
      }
    }
  }

  function resize () {
    var newBounds = vid.getBoundingClientRect();
    if ( !bounds ||
        bounds.left !== newBounds.left ||
        bounds.top !== newBounds.top ||
        bounds.width !== newBounds.width ||
        bounds.height !== newBounds.height ) {
      bounds = newBounds;
      canv.style.left = ( bounds.left + scrollX ) + "px";
      canv.style.top = ( bounds.top + scrollY ) + "px";
      canv.style.width = bounds.width + "px";
      canv.style.height = bounds.height + "px";
      canv.width = bounds.width * devicePixelRatio;
      canv.height = bounds.height * devicePixelRatio;
    }
  }

  E( canv, "mousedown", startPoint );
  E( canv, "touchstart", startPoint, true );
  E( canv, "mousemove", movePoint );
  E( canv, "touchmove", movePoint, true );
  E( canv, "mouseup", endPoint );
  E( canv, "touchend", endPoint, true );

  canv.style.position = "absolute";
  document.body.appendChild( canv );
  if ( enableEditing ) {
    output = document.createElement( "textarea" );
    output.style.width = "100%";
    output.rows = 10;
    document.body.appendChild( output );
    showCues( cues );
  }

  requestAnimationFrame( paint );
}