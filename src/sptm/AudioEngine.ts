import { Sine } from '../SoundEnvironment/Sine'
import { Player } from '../SoundEnvironment/Player'

import { midiToFrequency, letterToNote, durationToTime, createTimeId, calculateOctave } from '../utils/utils'

const AudioEngine = function (audioContext: any) {
  console.log('audio engine')

  const state = {
    synth: 'sine',
    duration: '1',
    octave: '2',
    bpm: '60',
    gain: 0.5,
    lastOsc: null
  }

  const hashNodes = {}
  const stackNodes = []

  function printState() {
    console.log('===> State')
    console.log(hashNodes)
    console.log(stackNodes)
  }

  function addElementToEngine(element: Sine) {
    const id = createTimeId()
    console.log({ id })
    hashNodes[id] = element
    stackNodes.push(id)
  }

  function stopAndRemoveLast() {
    if (stackNodes.length > 0) {
      const idPop = stackNodes.pop()
      hashNodes[idPop].stop()
      delete hashNodes[idPop]
    } else {
      console.log('Engine empty')
    }
  }

  return {
    playMidi: function (midiNum: string) {
      // Check current oscilator in state
      // create oscilator with current kind
      const osc = new Sine(audioContext, state.synth)
      osc.gain(state.gain)
      // set frequency with midi num
      const freq = midiToFrequency(parseInt(midiNum))
      // set duration
      // start playing
      osc.playDuration(freq, parseInt(state.duration))
      // add osc to hash and stack
      // setup timeout to clear element
      // remove element from hash and stock after timeout
      addElementToEngine(osc)
      printState()
    },
    playFreq: function (freqStr: string) {
      const osc = new Sine(audioContext, state.synth)
      osc.gain(state.gain)
      const freq = parseInt(freqStr)
      osc.playDuration(freq, parseInt(state.duration))
      // add osc to hash and stack
      // setup timeout to clear element
      // remove element from hash and stock after timeout
      state.lastOsc = osc
      addElementToEngine(osc)
      printState()
    },
    playLilyMultiple: function (synth: any, notesList: string | any[]) {
      const osc = new Sine(audioContext, synth || state.synth)
      const freqList = []
      const durationList = []
      let octaveNum = 0
      let currentDuration = 1
      for (let index = 0; index < notesList.length; index++) {
        const { note, octave, duration } = notesList[index]
        octaveNum += calculateOctave(octave)
        const freq = midiToFrequency(12 * (octaveNum + 5) + letterToNote(note))
        freqList.push(freq)
        currentDuration = duration || currentDuration
        durationList.push(durationToTime(`${currentDuration}`))
      }
      osc.playList(freqList, durationList)
      osc.gain(state.gain)
      state.lastOsc = osc
      addElementToEngine(osc)
      printState()
    },
    stopAll: function () {
      stopAndRemoveLast()
      printState()
    },
    changeBPM: function () {
      alert('bpm engine')
    },
    samplePlay: function () {
      alert('sample engine')
    },
    smplsq: function (seq: any) {
      printState()
    },
    synthChange: function (type: string) {
      state.synth = type
      console.log(state)
    }
  }
}

export default AudioEngine
