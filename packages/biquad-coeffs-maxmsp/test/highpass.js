"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/highpass");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("maxmsp/highpass", () => {
  it("exports", () => {
    assert(fnc === lib.highpass);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.955165, -3.910329, 1.955165, -1.945209, 0.965121 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
