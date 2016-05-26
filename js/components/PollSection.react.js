var PollStore = require('../stores/PollStore');
var Poll = require('./Poll.react');
var PollInput = require('./PollInput.react');
var React = require('react')

function getStateFromStores(){
	return {
		polls: PollStore.getAll()
	}
}

var PollSection = React.createClass({
	getInitialState: function() {
		return {
			polls: []
		};
	},
	componentDidMount: function() {
		//this._scrollToBottom();
		PollStore.addChangeListener(this._onChange);
		PollStore.didMount();
	},

	componentWillUnmount: function() {
		PollStore.removeChangeListener(this._onChange);
		PollStore.willUnmount();
	},

	_onChange: function() {
		debugger
		this.setState(getStateFromStores());
	},

	fnTally: function(pollId, choiceId) {
		debugger
		PollStore.tally(pollId, choiceId);
	},
	fnAdd: function(inputPoll){
		debugger
		PollStore.add(inputPoll);
	},
	fnDelete: function(pollId){
		debugger
		PollStore.remove(pollId);
	},
	render: function() {
		debugger
		const polls = this.state.polls.map(function(poll) {
			return <Poll
				key={poll.$id}
				fnTally = {this.fnTally}
				fnDelete={this.fnDelete}
				poll = {poll}
			/>
		}.bind(this));

		return <div>
			< PollInput fnAdd={this.fnAdd} />
			<div>{polls}</div>
		</div>
	}
})

module.exports = PollSection;