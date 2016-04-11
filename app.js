"use strict"

let React = require('react');
let ReactDOM = require('react-dom');

let _polls = {
	1: {
		q: {
			text: "what is your name"
		},
		as: [
			{ text: "tim", votes: 123},
			{ text: "lancelot", votes: 22},
			{ text: "arthur", votes: 42}
		]
	},
	2: {
		q: {
			text: "what is your favorite color"
		},
		as: [
			{ text: "cyan", votes: 123},
			{ text: "magenta", votes: 22},
			{ text: "yellow", votes: 42}
		]
	}
};

// var Question = React.createClass({
// 	render: ()=>{ 
// 		<div>{this.props.children}</div>;
// 	}
// })

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

var Poll = React.createClass({
	render: function(){
		let candidates = [];
		for( let id in this.props.poll.as){
			candidates.push(
				<Answer key={id}>{this.props.poll.as[id].text}</Answer>
			)
		}
		return <form>
			<div>{this.props.poll.q.text}</div>
			<div>{candidates}</div>
		</form>;
	}
})


let PollList = React.createClass({
	render: function(){
		let polls = [];
		for( let id in this.props.allPolls){
		  	polls.push(
		  		<li key={id}>
					<Poll poll={this.props.allPolls[id]} />
				</li>
			)
		}
		return <ul>{polls}</ul>;
	}
})

let PollApp = React.createClass({
	getInitialState: function(){
		return { allPolls: _polls };
	},

	render: function(){
		return <PollList allPolls={this.state.allPolls} />;
	}
})

ReactDOM.render(
	<PollApp>foo</PollApp>,
	document.getElementById('container')
);