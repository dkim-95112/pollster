"use strict"

var React = require('react');
var ReactDOM = require('react-dom');

var Answer = React.createClass({
	render: function(){
		return <div>
			<input id={this.props.id} type="checkbox"/>
			<label htmlFor={this.props.id}>
				{this.props.children}
			</label>
		</div>;
	}
});

var MyPoll = React.createClass({
	render: function(){
		return <div>
			<Question>What is your favorite color</Question>
			{["cyan", "magenta", "yellow"].map(function(v, i){
				return <Answer key={i} id={i}>{v}</Answer>;
			})}
		</div>;
	}
})

var Question = React.createClass({
	render: function(){
		return <div>{this.props.children}</div>;
	}
})

ReactDOM.render(
	<MyPoll>foo</MyPoll>,
	document.getElementById('container')
);