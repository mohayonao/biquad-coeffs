import { SAMPLERATE, WIDTH, HEIGHT } from "../constants";

export function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

export function linexp(value, inMin, inMax, outMin, outMax) {
  return Math.pow(outMax / outMin, (value - inMin) / (inMax - inMin)) * outMin;
}

export function explin(value, inMin, inMax, outMin, outMax) {
  return (Math.log(value/inMin)) / (Math.log(inMax/inMin)) * (outMax-outMin) + outMin;
}

export function mag2db(mag) {
  return 20 * Math.log(mag) / Math.LN10;
}

export const toX = x => explin(x, 20, SAMPLERATE/2, 0, WIDTH);
export const toY = x => linlin(x, 26, -26, 0, HEIGHT);
