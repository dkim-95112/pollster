let PollActionCreator = require('../actions/PollActionCreator');
let React = require('react')

var Poll = React.createClass({
	render: function(){
		let choices = [];

		for( let choiceId in this.props.poll.choices){
			choices.push(
				<li key={choiceId}>
					<input id={choiceId} name="choice" type="radio"/>
					<label htmlFor={choiceId}>
						{this.props.poll.choices[choiceId].text}
					</label>
				</li>
			)
		}
		debugger
		return (
			<form id={this.props.id}>
				<div>{this.props.poll.text}</div>
				<ol>{choices}</ol>
				<button onClick={this._onClick}>Vote</button>
			</form>
		);
	},
	_onClick: function(event) {
		debugger
		PollActionCreator.tallyVote();

	}
});

module.exports = Poll;
