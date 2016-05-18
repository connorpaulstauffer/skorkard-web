import { fromEvent, fromPromise } from 'most'
import { isNil, append, flip, add, equals } from 'ramda'

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
	
	const keysReleased$ = keyDownFiltered$.map(_ => 1)
		.merge(keyUp$.map(_ => -1))
		.scan(add, 0)
		.tap(value => console.log(value))
		.filter(equals(0))
	
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