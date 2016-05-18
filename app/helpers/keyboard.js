import { fromEvent, fromPromise } from 'most'
import { isNil, append, flip, add, equals } from 'ramda'

const keyMap = {
	13: 'ENTER',
	17: 'CTRL',
	90: 'Z'
}

const generateKeyCommands = () => {
	// const keyDown = () => fromEvent('keydown', window)
	// 	.map(ev => keyMap[ev.keyCode || ev.which])
	// 	// .filter(key => !isNil(key))
	// 	.skipRepeats()
	// 	
	// const keyUp = () => fromEvent('keyup', window)
	// 	.map(ev => keyMap[ev.keyCode || ev.which])
	// 	// .filter(key => !isNil(key))
	// 	.skipRepeats()
	
	const keyDown$ = fromEvent('keydown', window)
		.map(ev => ev.keyCode || ev.which)
		.skipRepeats()
		// .tap(code => console.log(`${code}: down`))
		.map(code => keyMap[code])

	const keyUp$ = fromEvent('keyup', window)
		.map(ev => ev.keyCode || ev.which)
		.skipRepeats()
		// .tap(code => console.log(`${code}: up`))
		.map(code => keyMap[code])
	
	// const knownKeyDown$ = keyDown$
	// 	.map(code => keyMap[code])
	// 	.filter(key => !isNil(key))

	// keyDown$.map(_ => 'down').observe(console.log.bind(console))
	// keyUp$.map(_ => 'up').observe(console.log.bind(console))
	
	const keysReleased$ = keyDown$.map(_ => 1)
		.merge(keyUp$.map(_ => -1))
		.scan(add, 0)
		.tap(value => console.log(value))
		.filter(equals(0))
	
	const generateSequence = () => keyDown$
		.take(1)
		.concat(keyDown$)
		.until(keyUp$)
		.reduce(flip(append), [])
		
	// keyUp$
	// 	.tap(code => console.log(`${code}: up`))
	// 	.drain()
	// 
	// keyDown$
	// 	.tap(code => console.log(`${code}: down`))
	// 	.drain()
		
	// keysReleased$.drain()
		
	keysReleased$.tap(_ => {
		// console.log('hit')
		fromPromise(generateSequence()).observe(console.log.bind(console))
	}).drain()

		// keysReleased$.drain()
	// keysReleased$.map(_ => fromPromise(generateSequence()))
	// 	.join()
	// 	.observe(console.log.bind(console))
}
  
module.exports = {
	generateKeyCommands
}