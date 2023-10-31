import { Sine } from '../../SoundEnvironment/Sine'
import AudioEngine from '../AudioEngine'
jest.mock('../../SoundEnvironment/Sine', () => ({
  Sine: jest.fn().mockReturnValue({
    gain: jest.fn(),
    playDuration: jest.fn(),
    playList: jest.fn(),
    stop: jest.fn()
  })
}))

it('should instanciate Engine', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  expect(engine).toBeDefined()
})

it('should play midi', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.playMidi('50')
  expect(Sine).toHaveBeenCalled()
})

it('should play freq', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.playFreq('450')
  expect(Sine).toHaveBeenCalled()
})

it('should play lily multiple with synth', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.playLilyMultiple('sine', [60, 62, 67])
  expect(Sine).toHaveBeenCalled()
})

it('should play lily multiple without synth', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.playLilyMultiple(undefined, [60, 62, 67])
  expect(Sine).toHaveBeenCalled()
})

it('should stop all', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)

  engine.playFreq('450')
  engine.stopAll()
  engine.stopAll()
  engine.stopAll()
  expect(Sine).toHaveBeenCalled()
})

it('should change bpm', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.changeBPM()
  expect(Sine).toHaveBeenCalled()
})

it('should change sample pla', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.samplePlay()
  expect(Sine).toHaveBeenCalled()
})

it('should change smplsq', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.smplsq(["1","2","3"])
  expect(Sine).toHaveBeenCalled()
})

it('should change synth change', () => {
  const audioContext = jest.fn()
  const engine = AudioEngine(audioContext)
  engine.synthChange('sine')
  expect(Sine).toHaveBeenCalled()
})