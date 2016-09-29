"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/lowpass");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("maxmsp/lowpass", () => {
  it("exports", () => {
    assert(fnc === lib.lowpass);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 0.009956, 0.019912, 0.009956, -1.945209, 0.965121 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
