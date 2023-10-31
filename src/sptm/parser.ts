import checks = require('./conditionsCheck')

/*
Handlers expected
  handlerMidi,
  handlerFreq,
  handlerLilySingle,
  handlerLilyMultiple,
  handlerStop,
  handlerBpm,
  handlerSamplePlay,
  handlerSmplsq,
  handlerSynthChange,
  handlerGrain
*/

class Parser {
  [x: string]: any
  constructor(handlers = {}) {
    this.state = handlers
  }

  parseString(inStr) {
    if (inStr === '') return
    let str = inStr.trim()
    let command = ''
    // Single number in midi or range
    command =
      command ||
      checks.midiMatch(str, this.state.handlerMidi, this.state.handlerFreq)
    // Multiple lilypond note
    command =
      command || checks.multipleLily(str, this.state.handlerLilyMultiple)
    // Multiple lilypond note
    command = command || checks.stopMatch(str, this.state.handlerStop)
    // change BPM
    command = command || checks.bpmMatch(str, this.state.handlerBpm)
    // Sample play, with duration and rate
    command = command || checks.sampleMatch(str, this.state.handlerSamplePlay)
    // smplsq
    command = command || checks.smplsqMatch(str, this.state.handlerSmplsq)
    // synth change
    command = command || checks.synthMatch(str, this.state.handlerSynthChange)
    // grain
    command = command || checks.grainMatch(str, this.state.handlerGrain)
    return command
  }
}

export default Parser
