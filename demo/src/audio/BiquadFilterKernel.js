export default class BiquadFilterKernel {
  constructor() {
    this._x1 = 0;
    this._x2 = 0;
    this._y1 = 0;
    this._y2 = 0;
  }

  process(coeffs, input, output, inNumSamples) {
    const b0 = coeffs[0];
    const b1 = coeffs[1];
    const b2 = coeffs[2];
    const a1 = coeffs[3];
    const a2 = coeffs[4];

    let x0;
    let x1 = this._x1;
    let x2 = this._x2;
    let y0;
    let y1 = this._y1;
    let y2 = this._y2;

    for (let i = 0; i < inNumSamples; i++) {
      x0 = input[i];
      y0 = (b0 * x0) + (b1 * x1) + (b2 * x2) - (a1 * y1) - (a2 * y2);
      output[i] = y0;

      x2 = Math.fround(x1) || 0;
      x1 = Math.fround(x0) || 0;
      y2 = Math.fround(y1) || 0;
      y1 = Math.fround(y0) || 0;
    }

    this._x1 = x1;
    this._x2 = x2;
    this._y1 = y1;
    this._y2 = y2;
  }
}
