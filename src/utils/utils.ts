export const midiToFrequency = (m: number) => Math.pow(2, (m - 69) / 12) * 440

export const letterToNote = (letter: string) => {
  let note: number
  switch (letter) {
    case 'a':
      note = 9
      break
    case 'b':
      note = 11
      break
    case 'c':
      note = 0
      break
    case 'd':
      note = 2
      break
    case 'e':
      note = 4
      break
    case 'f':
      note = 5
      break
    case 'g':
      note = 7
      break
    case 'la':
      note = 9
      break
    case 'si':
      note = 11
      break
    case 'do':
      note = 0
      break
    case 're':
      note = 2
      break
    case 'mi':
      note = 4
      break
    case 'fa':
      note = 5
      break
    case 'sol':
      note = 7
      break
    case 'r':
      note = -40
    default:
      break
  }
  return note
}

export const modifierToNumeric = (modifier: string) => {
  let value = 0
  switch (modifier) {
    case 'is':
      value = 1
      break
    case 'es':
      value = -1
      break
    default:
      value = 0
      break
  }
  return value
}

export const calculateOctave = (octaveModifier = '') => {
  const upOctave = octaveModifier.split('').filter((e) => e === "'").length
  const downOctave = octaveModifier.split('').filter((e) => e === ',').length
  return upOctave - downOctave
}

export const durationToTime = (durationString = "1") => 1 / parseInt(durationString)

export const createTimeId = () => `${new Date().getTime()}`
