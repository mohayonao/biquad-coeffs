"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/lowpass");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("webaudio-v1/lowpass", () => {
  it("exports", () => {
    assert(fnc === lib.lowpass);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 0.004836, 0.009673, 0.004836, -1.88989, 0.909235 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
