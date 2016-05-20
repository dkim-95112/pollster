//const PollActionCreator = require('../actions/PollActionCreator');
const PollStore = require('../stores/PollStore');
const React = require('react');

const ChoiceListItem = React.createClass({
	render: function(){
		const choice = this.props.choice;
		const total = this.props.total;
		const choiceId = this.props.choiceId;
		debugger
		return <li>
			<input id={choiceId} name="choice" type="radio" value={choiceId}/>
			<label htmlFor={choiceId}>
				{choice.text}
				{' - '}<span>{choice.clickCount}</span>
				<span style={{display: total ? '': 'none'}}>
					- {Math.round((choice.clickCount*100)/total)}%
				</span>
			</label>
		</li>
	}
})

var Poll = React.createClass({
	getInitialState: function(){
		return {
			choiceId: null
		};
	},
	render: function(){
		debugger
		const poll = this.props.poll;
		let total = 0;
		Object.keys(poll.choices).forEach(k =>{
			total += poll.choices[k].clickCount;
		})
		const choices = Object.keys(poll.choices).map(k =>
			<ChoiceListItem
				key={k}
				choiceId={k}
				choice={poll.choices[k]}
				total={total}
			/>
		);

		return <li>
			<div>{poll.text} - total {total}</div>
			<ol onChange={this._onChange}>
				{choices}
			</ol>
			<button
				disabled={!this.state.choiceId}
				onClick={this._onTally}	>Tally
			</button>
			<button onClick={this._onDelete}>
			  Delete
			</button>
		</li>
	},
	_onTally: function(event) {
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
