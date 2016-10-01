"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/highshelf");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("maxmsp/highshelf", () => {
  it("exports", () => {
    assert(fnc === lib.highshelf);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.963265, -3.754781, 1.818652, -1.870606, 0.897743 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
