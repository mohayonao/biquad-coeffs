"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const fnc = require("../lib/peaking");
const fixed6 = values => values.map(x => +x.toFixed(6));

describe("maxmsp/peaking", () => {
  it("exports", () => {
    assert(fnc === lib.peaking);
  });

  it("f:1000, q:4, gain:2", () => {
    const actual = fnc(1000/44100, 4, 2);
    const expected = [ 1.012395, -1.955196, 0.962815, -1.955196, 0.97521 ];

    assert.deepEqual(fixed6(actual), expected);
  });
});
