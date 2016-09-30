import "whatwg-fetch";
import BiquadFilterKernel from "./BiquadFilterKernel";

export default class PreviewPlayer {
  constructor(audioContext, actions) {
    this.audioContext = audioContext;
    this.actions = actions;
    this.scriptProcessor = null;
    this.bufferSource = null;
    this.biquadFilter = null;
    this.buffer = null;
    this.coeffs = [ 0, 0, 0, 0, 0 ];

    fetch("demo/assets/amen.wav").then(res => res.arrayBuffer()).then((audioData) => {
      audioContext.decodeAudioData(audioData, (audioBuffer) => {
        this.buffer = audioBuffer;
        actions.doneFetchAudio();
      });
    });
  }

  setState(state) {
    this.coeffs = state.filterData[state.previewLib].coeffs;
    this.toggle(state.isPlaying);
  }

  toggle(flag = true) {
    if (flag) {
      if (this.biquadFilter === null) {
        this.start();
      }
    } else {
      if (this.biquadFilter !== null) {
        this.stop();
      }
    }
  }

  start() {
    if (this.buffer === null) {
      return;
    }
    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.bufferSource = this.audioContext.createBufferSource();
    this.bufferSource.buffer = this.buffer;
    this.bufferSource.loop = true;
    this.bufferSource.start(this.audioContext.currentTime);
    this.bufferSource.connect(this.scriptProcessor);
    this.scriptProcessor.onaudioprocess = ::this.onaudioprocess;
    this.scriptProcessor.connect(this.audioContext.destination);
    this.biquadFilter = new BiquadFilterKernel();
  }

  stop() {
    this.bufferSource.stop(this.audioContext.currentTime);
    this.bufferSource.disconnect();
    this.scriptProcessor.disconnect();
    this.scriptProcessor = null;
    this.bufferSource = null;
    this.biquadFilter = null;
  }

  onaudioprocess(e) {
    if (this.biquadFilter) {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      const inNumSamples = e.target.bufferSize;
      this.biquadFilter.process(this.coeffs, input, output, inNumSamples);
    }
  }
}
