waitFor( function () {
  return document && document.querySelectorAll( "img" );
}, function () {
  function wrap ( img, map ) {
    var originalCoords = [ ],
        test = new Image();
    for ( var i = 0; i < map.areas.length; ++i ) {
      var coords = map.areas[i].coords;
      originalCoords.push( coords.split( "," ).map( parseFloat ) );
    }
    function resize () {
      var ratio = img.width / test.width;
      for ( var i = 0; i < map.areas.length; ++i ) {
        map.areas[i].coords = originalCoords[i].map( function ( n ) {
          return ratio * n;
        } ).join( "," );
      }
    }
    test.addEventListener( "load", function () {
      window.addEventListener( "resize", resize, false );
      resize();
    }, false );
    test.src = img.src;
  }

  var imgs = document.querySelectorAll( "img" );
  for ( var i = 0; i < imgs.length; ++i ) {
    if ( imgs[i].useMap ) {
      var map = document.querySelector( "map[name=" + imgs[i].useMap.substring(1) + "]");
      wrap( imgs[i], map );
    }
  }
} );