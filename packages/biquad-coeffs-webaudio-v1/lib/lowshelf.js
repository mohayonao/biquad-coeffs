"use strict";

module.exports = function(freq, _, gain) {
  freq = Math.max(1e-6, Math.min(freq, 1));
  gain = Math.max(-40, Math.min(gain, 40));

  var w0 = 2 * Math.PI * freq;
  var sin = Math.sin(w0);
  var cos = Math.cos(w0);
  var a = Math.pow(10, (gain / 40));
  var alpha = (sin / 2) * Math.sqrt(2);
  var alphamod = 2 * Math.sqrt(a) * alpha;

  var b0 =      a * ((a+1) - (a-1) * cos + alphamod);
  var b1 =  2 * a * ((a-1) - (a+1) * cos           );
  var b2 =      a * ((a+1) - (a-1) * cos - alphamod);
  var a0 =          ((a+1) + (a-1) * cos + alphamod);
  var a1 = -2 *     ((a-1) + (a+1) * cos           );
  var a2 =          ((a+1) + (a-1) * cos - alphamod);

  return [ b0/a0, b1/a0, b2/a0, a1/a0, a2/a0 ];
};
