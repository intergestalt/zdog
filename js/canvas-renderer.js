/**
 * CanvasRenderer
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.CanvasRenderer = factory();
  }
}( this, function factory() {

let fov = window && window.fov;
function scale(z) {return fov ? fov/(fov+z) : 1 };

var CanvasRenderer = { isCanvas: true };

CanvasRenderer.begin = function( ctx ) {
  ctx.beginPath();
};

CanvasRenderer.move = function( ctx, elem, point ) {
  let s = scale(point.z);
  ctx.moveTo( s*point.x, s*point.y );
};

CanvasRenderer.line = function( ctx, elem, point ) {
  let s = scale(point.z);
  ctx.lineTo( point.x * s, point.y * s);
};

CanvasRenderer.bezier = function( ctx, elem, cp0, cp1, end ) {
  let s0 = scale(cp0.z);
  let s1 = scale(cp1.z);
  let se = scale(end.z);
  ctx.bezierCurveTo( s0 * cp0.x, s0 * cp0.y, s1*cp1.x, s1*cp1.y, se*end.x, se*end.y );
};

CanvasRenderer.closePath = function( ctx ) {
  ctx.closePath();
};

CanvasRenderer.setPath = function() {};

CanvasRenderer.renderPath = function( ctx, elem, pathCommands, isClosed ) {
  this.begin( ctx, elem );
  pathCommands.forEach( function( command ) {
    command.render( ctx, elem, CanvasRenderer );
  });
  if ( isClosed ) {
    this.closePath( ctx, elem );
  }
};

CanvasRenderer.stroke = function( ctx, elem, isStroke, color, lineWidth ) {
  if ( !isStroke ) {
    return;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

CanvasRenderer.fill = function( ctx, elem, isFill, color ) {
  if ( !isFill ) {
    return;
  }
  ctx.fillStyle = color;
  ctx.fill();
};

CanvasRenderer.end = function() {};

return CanvasRenderer;

}));
