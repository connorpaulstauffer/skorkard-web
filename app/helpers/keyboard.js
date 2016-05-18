import { fromEvent, fromPromise } from 'most'
import { 
	set, lensProp, append, flip,
	omit, curry, toString, isEmpty 
} from 'ramda'

const keyMap = {
	13: 'ENTER',
	17: 'CTRL',
	90: 'Z'
}

const releasedKeyTrigger = (keyDown$, keyUp$) => 
	keyDown$.map(key => (pressedKeys) => set(lensProp(key), true, pressedKeys))
	.merge(keyUp$.map(key => (pressedKeys) => omit([toString(key)], pressedKeys)))
	.scan((pressedKeys, transform) => transform(pressedKeys), {})
	.filter(isEmpty)

const generateKeyCommands = () => {
	const keyUp$ = fromEvent('keyup', window)
		.map(ev => ev.keyCode || ev.which)
	
	const keyDown$ = fromEvent('keydown', window)
		.map(ev => ev.keyCode || ev.which)

	const keyDownFiltered$ = keyDown$.skipRepeats()
	
	const keyDownCode$ = keyDown$.map(code => keyMap[code])
	const keyDownCodeFiltered$ = keyDownFiltered$.map(code => keyMap[code])
	
	const generateSequence = () => keyDownCode$
		.take(1)
		.concat(keyDownCodeFiltered$)
		.until(keyUp$)
		.reduce(flip(append), [])
		
	const captureSequence = () => fromPromise(generateSequence())

	releasedKeyTrigger(keyDown$, keyUp$)
		.map(captureSequence).join()
		.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}