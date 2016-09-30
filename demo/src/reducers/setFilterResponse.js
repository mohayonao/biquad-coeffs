import { SAMPLERATE, FREQ_BINS } from "../constants";
import { mag2db } from "../utils";
import { libs as FilterLibs, WEBAUDIO_NATIVE } from "../constants/Filters";

export default function setFilterResponse(state) {
  const { type, freq, q, gain } = state.filterParams;

  FilterLibs.forEach(([ name, lib ]) => {
    state.filterData[name] = { coeffs: [], response: [] };
    if (lib[type]) {
      state.filterData[name].coeffs = lib[type](freq / SAMPLERATE, q, gain);
      state.filterData[name].response = getFilterResponse(state.filterData[name].coeffs);
    }
  });
  state.filterData[WEBAUDIO_NATIVE] = { coeffs: [], response: getWebAudioNativeFilterResponse(type, freq, q, gain) };

  return state;
}

export function getFilterResponse([ b0, b1, b2, a1, a2 ]) {
  return FREQ_BINS.map(function(freq) {
    const w1 = 2 * Math.PI * freq / SAMPLERATE;
    const w2 = w1 * 2;
    const cosw1 = Math.cos(w1);
    const cosw2 = Math.cos(w2);
    const sinw1 = Math.sin(w1);
    const sinw2 = Math.sin(w2);
    const cosb = b0 + b1 * cosw1 + b2 * cosw2;
    const sinb =      b1 * sinw1 + b2 * sinw2;
    const cosa =  1 + a1 * cosw1 + a2 * cosw2;
    const sina =      a1 * sinw1 + a2 * sinw2;
    const mag  = Math.sqrt((cosb * cosb + sinb * sinb) / (cosa * cosa + sina * sina));

    return mag2db(mag);
  });
}

export function getWebAudioNativeFilterResponse(type, freq, q, gain) {
  const audioContext = new window.OfflineAudioContext(1, 8, SAMPLERATE);
  const b = audioContext.createBiquadFilter();
  const f = new window.Float32Array(FREQ_BINS);
  const m = new window.Float32Array(f.length);
  const p = new window.Float32Array(f.length);

  b.type = type;
  b.frequency.value = freq;
  b.Q.value = q;
  b.gain.value = gain;

  if (b.type !== type) {
    return [];
  }

  b.getFrequencyResponse(f, m, p);

  return Array.from(m).map(mag2db);
}
