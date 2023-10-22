import { libraryInit, closeLibrary } from '../logs'

test('Should print initialize library', () => {
  const logSpy = jest.spyOn(console, 'log')
  libraryInit()
  expect(logSpy).toHaveBeenLastCalledWith('Initiate library')
})

test('Should print close library', () => {
  const logSpy = jest.spyOn(console, 'log')
  closeLibrary()
  expect(logSpy).toHaveBeenLastCalledWith('Close Library')
})