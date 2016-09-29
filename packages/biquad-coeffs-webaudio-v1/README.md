# biquad-coeffs-webaudio-v1
[![Build Status](https://img.shields.io/travis/mohayonao/biquad-coeffs.svg?style=flat-square)](https://travis-ci.org/mohayonao/biquad-coeffs)
[![NPM Version](https://img.shields.io/npm/v/biquad-coeffs-webaudio-v1.svg?style=flat-square)](https://www.npmjs.org/package/biquad-coeffs-webaudio-v1)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> WebAudio formulae for audio EQ biquad filter coefficients
> - https://www.w3.org/TR/webaudio/

## Installation

```
$ npm install --save biquad-coeffs-webaudio-v1
```

## API
  - `[filterType](freq, q, gain): number[]`
    - `filterType: string`
      - "lowpass"
      - "highpass"
      - "bandpass"
      - "notch"
      - "allpass"
      - "peaking"
      - "lowshelf"
      - "highshelf"
    - `freq: number` filter cutoff or center frequency
      - This parameter should be normalized (0..1).
      - `normalizedFrequency = frequency / sampleRate`
    - `q: number` filter Q (resonance)
      - This parameter is NOT used by "lowshelf" or "highshelf".
    - `gain: number` filter gain
      - This parameter is used by "peaking", "lowshelf" or "highshelf".
    - returns coeffs `[ b0, b1, b2, a1, a2 ]` (a0 = 1)

## Usage

DSP

```js
const coeffs = require("biquad-coeffs-webaudio-v1");

const [ b0, b1, b2, a1, a2 ] = coeffs.lowpass(1200/44100, 6);
const signal = new Float32Array(2048).map(Math.random);

let x0, x1 = 0, x2 = 0;
let y0, y1 = 0, y2 = 0;

for (let i = 0; i < signal.length; i++) {
  x0 = signal[i];
  y0 = (b0 * x0) + (b1 * x1) + (b2 * x2) - (a1 * y1) - (a2 * y2);

  signal[i] = y0;

  x2 = x1;
  x1 = x0;
  y2 = y1;
  y1 = y0;
}
```

Web Audio API

```js
const coeffs = require("biquad-coeffs-webaudio-v1");

const [ b0, b1, b2, a1, a2 ] = coeffs.lowpass(1200/audioContext.sampleRate, 6);
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const filter = audioContext.createIIRFilter([ b0, b1, b2 ], [ 1, a1, a2 ]);

oscillator.type = "sawtooth";
oscillator.frequency.value = 880;
oscillator.start(audioContext.currentTime);
oscillator.stop(audioContext.currentTime + 2);
oscillator.connect(filter);

filter.connect(audioContext.destination);
```

## License

MIT
