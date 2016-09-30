import cookbook   from "../../../packages/biquad-coeffs-cookbook";
import maxmsp     from "../../../packages/biquad-coeffs-maxmsp";
import webaudioV1 from "../../../packages/biquad-coeffs-webaudio-v1";
import webaudioV2 from "../../../packages/biquad-coeffs-webaudio-v2";

export const COOKBOOK   = "cookbook";
export const MAXMSP     = "maxmsp";
export const WEBAUDIO_V1 = "webaudio-v1";
export const WEBAUDIO_V2 = "webaudio-v2";
export const WEBAUDIO_NATIVE = "native";

export const libs = [
  [ COOKBOOK   , cookbook   ],
  [ MAXMSP     , maxmsp     ],
  [ WEBAUDIO_V1, webaudioV1 ],
  [ WEBAUDIO_V2, webaudioV2 ],
];

export const names = {
  [COOKBOOK]       : "Cookbook",
  [MAXMSP]         : "Max/MSP",
  [WEBAUDIO_V1]    : "WebAudio v1",
  [WEBAUDIO_V2]    : "WebAudio v2",
  [WEBAUDIO_NATIVE]: "WebAudio Native",
};

export const types = Object.keys({
  ...cookbook, ...maxmsp, ...webaudioV1, ...webaudioV2
});

export const colors = {
  [COOKBOOK]       : "#3498db",
  [MAXMSP]         : "#34495e",
  [WEBAUDIO_V1]    : "#1abc9c",
  [WEBAUDIO_V2]    : "#e74c3c",
  [WEBAUDIO_NATIVE]: "#f1c40f",
};
