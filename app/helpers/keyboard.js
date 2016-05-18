import { fromEvent, fromPromise } from 'most'
import { isNil, append, flip } from 'ramda'

const keyMap = {
	13: 'ENTER',
	17: 'CTRL',
	90: 'Z'
}

const generateKeyCommands = () => {
	const keyDown$ = fromEvent('keydown', window)
		.map(ev => keyMap[ev.keyCode || ev.which])
		.filter(key => !isNil(key))
		.skipRepeats()
		
	const keyUp$ = fromEvent('keyup', window)
	
	const generateSequence = () => keyDown$
		.take(1)
		// .concat(generateKeyStream())
		.concat(keyDown$)
		.until(keyUp$)
		.reduce(flip(append), [])
	
	fromPromise(generateSequence())
		.continueWith(_ => fromPromise(generateSequence()))
		.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}