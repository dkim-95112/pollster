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
		// var polls = [];
		// for( var pollId in this.state.polls){
		// 	debugger
		//   	polls.push(
		//   		<li key={pollId}>
		// 			<Poll id={pollId} poll={this.state.allPolls[pollId]} />
		// 		</li>
		// 	)
		// }
		return ( < div >
			< PollInput fnAdd={this.fnAdd} / >
			< ul > {
				this.state.polls.map(function(poll, i) {
					debugger
					return ( < li key = {i} >
						<Poll fnTally = {this.fnTally}
						fnDelete={this.fnDelete}
						poll = {poll}/>
						</li>
					);
				}.bind(this))
			} < /ul> < /div>
		);
	}
})

module.exports = PollSection;