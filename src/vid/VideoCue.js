/* global Event, Touch, devicePixelRatio */

function Point ( evt, bounds ) {
}

function VideoCue ( evt, bounds, vid ) {
  if ( evt instanceof Event || (window.Touch && evt instanceof Touch )) {
    this.x = ( evt.clientX - bounds.left ) / bounds.width;
    this.y = ( evt.clientY - bounds.top ) / bounds.height;
    if ( vid ) {
      this.t = vid.currentTime;
    }
    else{
      this.t = Number.MAX_VALUE;
    }
    this.width = 0;
    this.height = 0;
    this.text = "";
  }
  else {
    this.t = evt.t;
    this.x = evt.x;
    this.y = evt.y;
    this.width = evt.width;
    this.height = evt.height;
    this.text = evt.text;
  }
}

VideoCue.byTime = function ( a, b ) {
  return a.t - b.t;
};

VideoCue.prototype.inBounds = function ( evt, bounds ) {
  var end = new VideoCue( evt, bounds );
  return this.x <= end.x && end.x < this.x + this.width &&
      this.y <= end.y && end.y < this.y + this.height;
};

VideoCue.prototype.draw = function ( ctx, strokeWidth, fontSize, fontFamily,
    textPadding ) {
  ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
  ctx.fillStyle = "rgba(255, 0, 0, 0.25)";
  ctx.lineWidth = strokeWidth * devicePixelRatio;
  ctx.fillRect( this.x * ctx.canvas.width, this.y * ctx.canvas.height,
      this.width * ctx.canvas.width, this.height * ctx.canvas.height );
  ctx.strokeRect( this.x * ctx.canvas.width, this.y * ctx.canvas.height,
      this.width * ctx.canvas.width, this.height * ctx.canvas.height );

  if ( fontSize && fontFamily ) {
    textPadding = textPadding || 0;
    var fontHeight = ( fontSize * devicePixelRatio ),
        textX = ( this.x + this.width ) * ctx.canvas.width,
        textY = this.y * ctx.canvas.height - 10,
        padding = textPadding * devicePixelRatio;
    ctx.font = fontHeight + "px " + fontFamily;
    var textBounds = ctx.measureText( this.text );
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fillRect( textX - padding, textY - fontHeight - padding,
        textBounds.width + 2 * padding, fontHeight + 2 * padding );
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText( this.text, textX, textY );
  }
};

VideoCue.prototype.rectify = function ( point ) {
  var left = Math.min( point.x, this.x ),
      top = Math.min( point.y, this.y ),
      right = Math.max( point.x, this.x ),
      bottom = Math.max( point.y, this.y ),
      w = right - left,
      h = bottom - top;
  this.t = Math.min( this.t, point.t );
  this.x = left;
  this.y = top;
  this.width = w;
  this.height = h;
};
