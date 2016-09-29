"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/lowshelf");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("maxmsp/lowshelf", () => {
  it("exports", () => {
    assert(fnc === lib.lowshelf);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.012925, -1.897644, 0.909205, -1.902162, 0.917612 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
