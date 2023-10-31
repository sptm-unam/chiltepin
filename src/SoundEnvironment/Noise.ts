export function Noise(aCtx) {
  this.audioCtx = aCtx

  this.noise = async function () {
    await this.audioCtx.audioWorklet.addModule('js/random-noise-processor.js')
    this.randomNoiseNode = new AudioWorkletNode(
      this.audioCtx,
      'random-noise-processor'
    )
    // this.gainNode = this.audioCtx.createGain();

    // falta el noise por aqui
    this.gainNoise = this.randomNoiseNode.parameters.get('customGain')
    //this.gainNode.setValueAtTime(0, this.audioCtx.currentTime)
    // this.randomNoiseNode.connect(this.gai);
    console.log('holillas')
  }

  this.gain = function (gain) {
    this.gainNoise.setValueAtTime(gain, this.audioCtx.currentTime)
  }

  this.start = function () {
    console.log('reproducirRuido')
    //this.randomNoiseNode.connect(this.audioCtx.destination);
    this.randomNoiseNode.connect(this.audioCtx.destination)
  }

  this.stop = function () {
    this.randomNoiseNode.disconnect(this.audioCtx.destination)
  }

  this.noise()
}
