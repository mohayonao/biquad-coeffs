import { linexp } from "../utils";

export const WIDTH = 480;
export const HEIGHT = 240;
export const SAMPLERATE = 44100;
export const FREQ_BINS = Array.from({ length: 256 }, (_, i) => linexp(i, 0, 255, 20, 22050));
