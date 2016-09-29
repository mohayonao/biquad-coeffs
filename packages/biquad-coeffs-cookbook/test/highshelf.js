"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/highshelf");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("cookbook/highshelf", () => {
  it("exports", () => {
    assert(fnc === lib.highshelf);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.250685, -2.367618, 1.138521, -1.878446, 0.900034 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
