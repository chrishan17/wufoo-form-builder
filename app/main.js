import React from 'react';
import App from './components/App/App.jsx';
import {Ctx} from './stores/FieldStore.js';

var Bootstrap = Ctx.bootstrap(App);

React.render(<Bootstrap />, document.getElementById('app'));
