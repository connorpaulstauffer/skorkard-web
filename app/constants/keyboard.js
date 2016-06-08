const keyCodes = {
  'ENTER': 13,
  'CTRL': 17,
  'CMD': 91,
  'OPT': 18,
  'Z': 90,
  'F': 70
}

const keySequences = {
  'UNDO': ['CTRL', 'Z'],
  'FIND': ['CTRL', 'F'],
  'FULL': ['CMD', 'CTRL', 'F']
}

module.exports = {
  keyCodes,
  keySequences
}