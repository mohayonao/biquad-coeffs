"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/highshelf");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("webaudio-v2/highshelf", () => {
  it("exports", () => {
    assert(fnc === lib.highshelf);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.244442, -2.252744, 1.028842, -1.787306, 0.807846 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
