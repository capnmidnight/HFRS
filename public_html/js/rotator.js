( function () {
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
      c[i].style.position = "absolute";
      c[i].style.marginTop = 0;
      c[i].style.marginBottom = 0;
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

    pager.style.margin = 0;
    pager.style.padding = 0;
    elem.insertBefore( pager, c[0] );

    function resize () {
      var maxHeight = 0;
      for ( var i = 0; i < c.length; ++i ) {
        maxHeight = Math.max( maxHeight, c[i].clientHeight );
      }
      elem.style.position = "relative";
      elem.style.height = ( maxHeight + pager.clientHeight ) + "px";
    }
    resize();
    window.addEventListener( "resize", resize, false );

    function hide ( i ) {
      c[i].style.opacity = 0;
      pips[i].style.cursor = "pointer";
      pips[i].style.opacity = 0.25;
    }

    function show ( i ) {
      c[i].style.opacity = 1;
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

  window.addEventListener( "load", function Rotators () {
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
  }, false );
} )();