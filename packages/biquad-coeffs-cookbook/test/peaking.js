"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/peaking");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("cookbook/peaking", () => {
  it("exports", () => {
    assert(fnc === lib.peaking);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.004032, -1.948905, 0.964822, -1.948905, 0.968855 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
