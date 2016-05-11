"use strict"

let MyApp = require('./components/MyApp.react')
//let PollExampleData = require('./PollExampleData');
//let PollWebAPIUtils = require('./PollWebAPIUtils');
let React = require('react');
let ReactDOM = require('react-dom');

window.React = React; // export for http://fb.me/react-devtools

// todo: load data from server
//PollExampleData.init(); // load example data into localstorage
//PollWebAPIUtils.getAllPolls(); 

ReactDOM.render(
	<MyApp>foo</MyApp>,
	document.getElementById('container')
);