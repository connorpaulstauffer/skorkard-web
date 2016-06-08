import { fromEvent } from 'most'
import { 
  append, unless, take, indexOf,
  invertObj, contains, curry, prop
} from 'ramda'
import { isNotNil } from './type'

const keyCodeDictionary = {
  'ENTER': 13,
  'CTRL': 17,
  'CMD': 91,
  'OPT': 18,
  'Z': 90,
  'F': 70
}

const keySequences = {
  'UNDO': ['CTRL', 'Z'],
  'FULL': ['CMD', 'CTRL', 'F']
}

const keyDictionary = invertObj(keyCodeDictionary)
const keySequenceDictionary = invertObj(keySequences)

const keySequence = ({ ev, keys }) => 
  ({ sequence: keySequenceDictionary[keys], ev})

const lookupKey = ({ ev, key }) => ({ ev, key: keyDictionary[key] })
const whichKey = ev => ev.keyCode || ev.which
const preventDefault = ({ ev }) => ev.preventDefault()
const keyObject = ev => ({ ev, key: whichKey(ev) })

const keyFromEvent = eventName => fromEvent(eventName, window)
  .map(keyObject).map(lookupKey).filter(({ key }) => isNotNil(key))

const keyDownMod = (key, activeKeys) => 
  unless(contains(key), append(key))(activeKeys)
const keyUpMod = (key, activeKeys) => 
  take(indexOf(key, activeKeys), activeKeys)
  
const keyShortcuts = () => {
  const keyDownMod$ = keyFromEvent('keydown')
    .map(({ ev, key }) => ({ ev, mod: curry(keyDownMod)(key) }))
  const keyUpMod$ = keyFromEvent('keyup')
    .map(({ ev, key }) => ({ ev, mod: curry(keyUpMod)(key) }))

  const activeKeys$ = keyDownMod$.merge(keyUpMod$)
    .scan(({ keys }, { mod, ev }) => ({ ev, keys: mod(keys) }), { keys: [] })
    .map(keySequence)
    .filter(({ sequence }) => isNotNil(sequence))
    .tap(preventDefault)
    .map(prop('sequence'))
    .observe(console.log.bind(console))
    
  return activeKeys$
}
  
module.exports = {
  keyShortcuts
}