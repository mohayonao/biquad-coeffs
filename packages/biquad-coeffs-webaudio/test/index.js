"use strict";

require("run-with-mocha");

const assert = require("assert");
const lib = require("..");
const webaudioV2 = require("biquad-coeffs-webaudio-v2");

describe("webaudio", () => {
  it("exports", () => {
    assert(lib === webaudioV2);
  });
});
