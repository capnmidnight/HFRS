( function () {
  var imgs = document.querySelectorAll( "#news > blockquote > img" ),
      box = document.createElement( "div" ),
      disp = document.createElement( "img" );
  box.id = "shadowbox";
  box.className = "hide";
  box.appendChild( disp );
  document.body.appendChild( box );
  for ( var i = 0; i < imgs.length; ++i ) {
    imgs[i].addEventListener( "click", function ( box, disp ) {
      box.className = "show";
      disp.src = this.src;
    }.bind( imgs[i], box, disp ), false );
  }

  box.addEventListener( "click", function () {
    this.className = "hide";
  }, false );
} )();