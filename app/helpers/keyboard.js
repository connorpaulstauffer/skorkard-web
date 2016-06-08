import { fromEvent } from 'most'
import { 
  append, unless, take, indexOf,
  invertObj, contains, curry, prop
} from 'ramda'
import { isNotNil } from './type'
import { keyCodes, keySequences } from './../constants/keyboard'

const keyDictionary = invertObj(keyCodes)
const keySequenceDictionary = invertObj(keySequences)

const keySequence = ({ ev, keys }) => 
  ({ ev, sequence: keySequenceDictionary[keys] })

const lookupKey = ({ ev, keyCode }) => ({ ev, key: keyDictionary[keyCode] })
const preventDefault = ({ ev }) => ev.preventDefault()
const keyObject = ev => ({ ev, keyCode: ev.keyCode || ev.which })

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

  const keyShortcuts$ = keyDownMod$.merge(keyUpMod$)
    .scan(({ keys }, { mod, ev }) => ({ ev, keys: mod(keys) }), { keys: [] })
    .map(keySequence)
    .filter(({ sequence }) => isNotNil(sequence))
    .tap(preventDefault)
    .map(prop('sequence'))
    
  return keyShortcuts$
}
  
module.exports = {
  keyShortcuts
}