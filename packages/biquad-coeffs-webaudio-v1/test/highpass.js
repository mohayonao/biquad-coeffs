"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/highpass");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("webaudio-v1/highpass", () => {
  it("exports", () => {
    assert(fnc === lib.highpass);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 0.949781, -1.899563, 0.949781, -1.88989, 0.909235 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
