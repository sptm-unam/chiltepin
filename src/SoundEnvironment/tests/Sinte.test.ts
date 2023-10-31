import { midiToFrequency } from './../../utils/utils'
/**
 * @jest-environment jsdom
 */

import { Sine } from '../Sine'
window.AudioContext = jest.fn().mockReturnValue({
  suspend: jest.fn(),
  currentTime: 0,
  resume: jest.fn(),
  createOscillator: jest.fn().mockReturnValue({
    type: '',
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: { setValueAtTime: jest.fn() }
  }),
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn()
    }
  })
})

Date.now = jest.fn(() => 1487076708000) //14.02.2017

describe('Sine wave', () => {
  it('Create empty sine wave ', () => {
    // Arrange
    const a = new AudioContext()
    // Act
    let s = new Sine(a)
    // Expect
    expect(s.oscillator).toBeDefined()
    expect(s.oscillator.type).toBe('sine')
    expect(s.gainNode).toBeDefined()
    expect(a.createGain).toHaveBeenCalled()
    expect(a.createOscillator).toHaveBeenCalled()
  })

  it('Create sine wave ', () => {
    // Arrange
    const a = new AudioContext()
    // Act
    let s = new Sine(a)
    s.start()
    s.freq(400)
    s.gain(1)
    s.stop()
    // Expect
    expect(s.oscillator).toBeDefined()
    expect(s.oscillator.type).toBe('sine')
    expect(s.gainNode).toBeDefined()
    expect(a.createGain).toHaveBeenCalled()
    expect(a.createOscillator).toHaveBeenCalled()
  })

  it('Create play duration', () => {
    // Arrange
    const a = new AudioContext()
    // Act
    let s = new Sine(a)
    s.start()
    s.playDuration()
    s.playList()
    s.playSeq()
    s.stop()
    // Expect
    expect(s.oscillator).toBeDefined()
    expect(s.oscillator.type).toBe('sine')
    expect(s.gainNode).toBeDefined()
    expect(a.createGain).toHaveBeenCalled()
    expect(a.createOscillator).toHaveBeenCalled()
  })

  it.todo('Create empty sine wave ')
  it.todo('Create empty sine wave ')
})
