import { fromEvent, fromPromise } from 'most'
import { 
	set, lensProp, append, flip, isNil,
	omit, toString, isEmpty 
} from 'ramda'

const ENTER = 'ENTER'
const CTRL = 'CTRL'
const Z = 'Z'

const keyMap = {
	13: ENTER,
	17: CTRL,
	90: Z
}

const UNDO = 'UNDO'

const keySequences = {
	[[CTRL, Z]]: UNDO
}

const keySequence = sequence => keySequences[sequence]

const releasedKeyTrigger = (keyDown$, keyUp$) => 
	keyDown$.map(key => (pressedKeys) => set(lensProp(key), true, pressedKeys))
	.merge(keyUp$.map(key => (pressedKeys) => omit([toString(key)], pressedKeys)))
	.scan((pressedKeys, transform) => transform(pressedKeys), {})
	.filter(isEmpty)

const whichKey = ev => ev.keyCode || ev.which
const keyUp = () => fromEvent('keyup', window).map(whichKey)
const keyDown = () => fromEvent('keydown', window).map(whichKey)

const keyCode = key => keyMap[key]

const generateKeyCommands = () => {
	const keyUp$ = keyUp()
	const keyDown$ = keyDown()
	const keyDownFiltered$ = keyDown$.skipRepeats()
	const keyDownCode$ = keyDown$.map(keyCode)
	const keyDownCodeFiltered$ = keyDownFiltered$.map(keyCode)
	
	const generateSequence = () => keyDownCode$
		.take(1)
		.concat(keyDownCodeFiltered$)
		.until(keyUp$)
		.reduce(flip(append), [])
		
	const captureSequence = () => fromPromise(generateSequence())

	releasedKeyTrigger(keyDown$, keyUp$)
		.map(captureSequence).join()
		.map(keySequence)
		.filter(seq => !isNil(seq))
		.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}