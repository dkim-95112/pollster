let PollActionCreator = require('../actions/PollActionCreator');
let React = require('react')

let ChoiceListItem = React.createClass({
	render: function(){
		let id = this.props.pollId + this.props.choiceId;
		let count = this.props.choice.count;
		let total = this.props.total;
		return (
			<li>
				<input id={id} value={this.props.choiceId} name="choice" type="radio"/>
				<label htmlFor={id}>
					{this.props.choice.text}
					{' - '}<span>{this.props.choice.count}</span>
					{total && (' - ' + Math.round((count*100)/total) + '%')}
				</label>
			</li>
		);
	}
})

var Poll = React.createClass({
	getInitialState: function(){
		return {choiceId: null};
	},
	render: function(){
		
		let total = this.props.poll.choices
			.map(v => v.count)
			.reduce((prev,cur)=> prev + cur);

		return (
			<form name={this.props.id}>
				<div>{this.props.poll.text}</div>
				<ol onChange={this._onChange}>
					{this.props.poll.choices.map(function(choice, choiceId){
						return <ChoiceListItem key={choiceId}
						pollId={this.props.id}
						choiceId={choiceId}
						choice={choice}
						total={total}
						/>
					}.bind(this))}
				</ol>
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
		debugger
		this.setState({choiceId: event.target.value});
	}
});

module.exports = Poll;
