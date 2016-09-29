"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/lowshelf");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("cookbook/lowshelf", () => {
  it("exports", () => {
    assert(fnc === lib.lowshelf);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.006589, -1.890822, 0.905964, -1.893057, 0.910318 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
