/*jshint esversion: 6 */
import { subject } from 'most-subject';

const createSubject = () => {
	const { stream, observer } = subject();
	return [stream, observer];
};

module.exports = {
	createSubject
};