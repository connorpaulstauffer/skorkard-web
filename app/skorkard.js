/*jshint esversion: 6 */
import { run } from '@motorcycle/core';
import { makeDOMDriver } from '@motorcycle/dom';

import App from './components/app/App';

run(App, { DOM: makeDOMDriver('#appContainer') });