let PollActionCreator = require('../actions/PollActionCreator');
let React = require('react')

var Poll = React.createClass({
	getInitialState: function(){
		return {choiceId: null};
	},
	render: function(){
		let choices = [];

		let total = this.props.poll.choices
			.map(v => v.count)
			.reduce((prev,cur)=> prev + cur);

		for( let choiceId in this.props.poll.choices){ // use map & arrow ?
			debugger
			let id = this.props.id + '_' + choiceId;
			let count = this.props.poll.choices[choiceId].count;
			choices.push(
				<li key={choiceId}>
					<input id={id} value={choiceId} name="choice" type="radio"/>
					<label htmlFor={id}>
						{this.props.poll.choices[choiceId].text}
						{' - '}<span>{count}</span>
						{total && (' - ' + Math.round((count*100)/total) + '%')}
					</label>
				</li>
			)
		}
		return (
			<form name={this.props.id}>
				<div>{this.props.poll.text}</div>
				<ol onChange={this._onChange}>{choices}</ol>
				<button
				disabled={!this.state.choiceId}
				onClick={this._onClick}>Tally</button>
			</form>
		);
	},
	_onClick: function(event) {
		debugger
		event.preventDefault();  // avoid page reloading
		PollActionCreator.tallyPoll(this.props.id, this.state.choiceId);
	},
	_onChange: function(event){
		this.setState({choiceId: event.target.value});
	}
});

module.exports = Poll;
