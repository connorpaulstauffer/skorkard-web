import { fromEvent, fromPromise } from 'most'
import { 
	set, lensProp, append, flip, add, equals, 
	omit, curry, toString, isEmpty 
} from 'ramda'

const keyMap = {
	13: 'ENTER',
	17: 'CTRL',
	90: 'Z'
}

const generateKeyCommands = () => {
	const keyUp$ = fromEvent('keyup', window)
		.map(ev => ev.keyCode || ev.which)
	
	const keyDown$ = fromEvent('keydown', window)
		.map(ev => ev.keyCode || ev.which)

	const keyDownFiltered$ = keyDown$.skipRepeats()
	
	const keyDownCode$ = keyDown$.map(code => keyMap[code])
	const keyDownCodeFiltered$ = keyDownFiltered$.map(code => keyMap[code])
	
	const setKeyPressed = (key, pressedKeys) => 
		set(lensProp(key), true, pressedKeys)
	const unsetKeyPressed = (key, pressedKeys) => 
		omit([toString(key)], pressedKeys)
	const updatePressedKeys = (pressedKeys, transform) => 
		transform(pressedKeys)
	
	const pressedKeys$ = keyDown$.map(key => curry(setKeyPressed)(key))
		.merge(keyUp$.map(key => curry(unsetKeyPressed)(key)))
		.scan(updatePressedKeys, {})
		// .observe(console.log.bind(console))
	
	const keysReleased$ = pressedKeys$.filter(isEmpty)
	
	const generateSequence = () => keyDownCode$
		.take(1)
		.concat(keyDownCodeFiltered$)
		.until(keyUp$)
		.reduce(flip(append), [])
		
	const captureSequence = () => fromPromise(generateSequence())

	keysReleased$.map(captureSequence).join()
		.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}