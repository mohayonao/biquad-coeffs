"use strict";

module.exports = function(freq, q, gain) {
  freq = Math.max(1e-6, Math.min(freq, 1));
  q    = Math.max(1e-4, Math.min(q, 1000));
  gain = Math.max(-40, Math.min(gain, 40));

  var w0 = 2 * Math.PI * freq;
  var sin = Math.sin(w0);
  var cos = Math.cos(w0);
  var a = Math.pow(10, (gain / 40));
  var alpha = sin / (2 * q);

  var b0 =  1 + alpha * a;
  var b1 = -2 * cos;
  var b2 =  1 - alpha * a;
  var a0 =  1 + alpha / a;
  var a1 = -2 * cos;
  var a2 =  1 - alpha / a;

  return [ b0/a0, b1/a0, b2/a0, a1/a0, a2/a0 ];
};
