let PollStore = require('../stores/PollStore');
let Poll = require('./Poll.react');
let React = require('react');

function getStateFromStores(){
	return {
		allPolls: PollStore.getAll()
	}
}

let PollSection = React.createClass({
	getInitialState: function(){
		return getStateFromStores();
	},

	componentDidMount: function() {
		//this._scrollToBottom();
		PollStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PollStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		debugger
		this.setState(getStateFromStores());
	},

	render: function(){
		let polls = [];
		debugger
		for( let pollId in this.state.allPolls){
		  	polls.push(
		  		<li key={pollId}>
					<Poll id={pollId} poll={this.state.allPolls[pollId]} />
				</li>
			)
		}
		return <ul>{polls}</ul>;
	}
})

module.exports = PollSection;