waitFor( function () {
  return document.body;
}, function () {
  var FADE_LEN = 500;
  function Rotator ( elem ) {
    var c = [ ],
        len = elem.children.length,
        n = 0,
        pips = [ ],
        pager = document.createElement( "div" ),
        t = 0,
        ttl = elem.dataset.timeout || 3000,
        mid = ttl / 2;

    for ( var i = 0; i < len; ++i ) {
      c[i] = elem.children[i];
      pips[i] = document.createElement( "span" );
      pips[i].innerHTML = "●";
      pips[i].className = "pip";
      pips[i].onclick = tick.bind( this, i );
      pager.appendChild( pips[i] );

      if ( i > 0 ) {
        hide( i );
      }
      else {
        show( i );
      }
    }

    elem.insertBefore( pager, c[0] );

    function hide ( i ) {
      c[i].style.display = "none";
      pips[i].style.cursor = "pointer";
      pips[i].style.opacity = 0.25;
    }

    function show ( i ) {
      c[i].style.display = "";
      pips[i].style.cursor = "default";
      pips[i].style.opacity = 1;
    }

    function tick ( i ) {
      hide( n );
      t = 0;
      n = i;
      show( n );
    }

    function isInViewport () {
      var rect = elem.getBoundingClientRect(),
          inBounds = rect.bottom >= 0
          && rect.top <= window.innerHeight;

      return inBounds;
    }

    var lt = 0;
    this.update = function ( ft ) {
      var dt = ft - lt;
      lt = ft;
      t += dt;
      if ( isInViewport() )
      {
        if ( t >= ttl ) {
          tick( ( n + 1 ) % len );
        }
        c[n].style.opacity = Math.min( 1, ( mid - Math.abs( t - mid ) ) /
            FADE_LEN );
      }
    };
  }

  var rotators = Array.prototype.slice.call( document.querySelectorAll(
      ".rotator" ) );
  for ( var i = 0; i < rotators.length; ++i ) {
    rotators[i] = new Rotator( rotators[i] );
  }

  function updateAll ( dt ) {
    requestAnimationFrame( updateAll );
    for ( var i = 0; i < rotators.length; ++i ) {
      rotators[i].update( dt );
    }
  }

  requestAnimationFrame( updateAll );
} );