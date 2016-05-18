import { fromEvent, fromPromise } from 'most'
import { 
	set, lensProp, append, flip, isNil,
	omit, toString, isEmpty, invertObj
} from 'ramda'

const keyCodeDictionary = {
	'ENTER': 13,
	'CTRL': 17,
	'Z': 90
}

const keyDictionary = invertObj(keyCodeDictionary)

const keySequences = {
	'UNDO': ['CTRL', 'Z']
}

const keySequenceDictionary = invertObj(keySequences)

const keySequence = sequence => keySequenceDictionary[sequence]

const releasedKeyTrigger = (keyDownCode$, keyUpCode$) => 
	keyDownCode$.map(key => 
		(pressedKeys) => set(lensProp(key), true, pressedKeys))
	.merge(keyUpCode$.map(key => 
		(pressedKeys) => omit([toString(key)], pressedKeys)))
	.scan((pressedKeys, transform) => transform(pressedKeys), {})
	.filter(isEmpty)

const whichKey = ev => ev.keyCode || ev.which
const keyUpCode = () => fromEvent('keyup', window).map(whichKey)
const keyDownCode = () => fromEvent('keydown', window).map(whichKey)

const lookupKey = key => keyDictionary[key]

const generateKeyCommands = () => {
	const keyUpCode$ = keyUpCode()
	const keyDownCode$ = keyDownCode()
	const keyDownCodeFiltered$ = keyDownCode$.skipRepeats()
	const keyDown$ = keyDownCode$.map(lookupKey)
	const keyDownFiltered$ = keyDownCodeFiltered$.map(lookupKey)
	
	const generateSequence = () => keyDown$
		.take(1)
		.concat(keyDownFiltered$)
		.until(keyUpCode$)
		.reduce(flip(append), [])
		
	const captureSequence = () => fromPromise(generateSequence())

	releasedKeyTrigger(keyDownCode$, keyUpCode$)
		.map(captureSequence).join()
		.map(keySequence)
		.filter(seq => !isNil(seq))
		.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}