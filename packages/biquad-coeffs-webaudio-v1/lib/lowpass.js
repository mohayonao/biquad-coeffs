"use strict";

module.exports = function(freq, q) {
  freq = Math.max(1e-6, Math.min(freq, 1));
  q    = Math.max(1e-4, Math.min(q, 1000));

  var w0 = 2 * Math.PI * freq;
  var g = Math.pow(10, q / 20);
  var d = Math.sqrt((4 - Math.sqrt(16 - 16 / (g * g))) / 2);
  var sn = 0.5 * d * Math.sin(w0);
  var beta  = 0.5 * (1 - sn) / (1 + sn);
  var gamma = (0.5 + beta) * Math.cos(w0);
  var alpha = 0.25 * (0.5 + beta - gamma);

  var b0 =  2 * alpha;
  var b1 =  4 * alpha;
  var b2 =  2 * alpha;
  var a1 =  2 * -gamma;
  var a2 =  2 * beta;

  return [ b0, b1, b2, a1, a2 ];
};
