//const PollActionCreator = require('../actions/PollActionCreator');
const React = require('react');

const ChoiceListItem = React.createClass({
	render: function(){
		var choice = this.props.choice;
		let id = this.props.choiceId;
		let total = this.props.total;
		debugger
		return (
			<li>
				<input id={id} value={id} name="choice" type="radio"/>
				<label htmlFor={id}>
					{choice.text}
					{' - '}<span>{choice.count}</span>
					{total && (' - ' + Math.round((choice.count*100)/total) + '%')}
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
		var poll = this.props.poll;
		var pollId = poll.$id;
		var total = Object.keys(poll.choices)
			.map(function(v){
				return poll.choices[v].count;
			})
			.reduce((prev,cur)=> prev + cur);

		debugger
		return (
			<form name={pollId}>
				<div>{poll.text}</div>
				<ol onChange={this._onChange}>
					{Object.keys(poll.choices).map(function(v){
						var choice = poll.choices[v];
						return <ChoiceListItem key={v}
							pollId={pollId}
							choiceId ={v}
							choice={choice}
							total={total}
							/>
					}.bind(this))}
				</ol>
				<button
					disabled={!this.state.choiceId}
					onClick={this._onClick}	>Tally
				</button>
				<button onClick={this._onDelete}>
				  Delete
				</button>
			</form>
		);
	},
	_onClick: function(event) {
		debugger
		event.preventDefault();  // avoid page reloading
		this.props.fnTally(this.props.poll.$id, this.state.choiceId);
	},
	_onDelete: function(event){
		debugger
		event.preventDefault();  // avoid page reloading
		this.props.fnDelete(this.props.poll.$id);
	},
	_onChange: function(event){
		debugger
		this.setState({choiceId: event.target.value});
	}
});

module.exports = Poll;
