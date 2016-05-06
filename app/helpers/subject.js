/*jshint esversion: 6 */
import { subject } from 'most-subject';

function createSubject() {
	const { stream, observer } = subject();
	return [stream, observer];
}

export default createSubject;