let PollActionCreator = require('../actions/PollActionCreator');
let ChoiceComposer = require('./ChoiceComposer.react');
let React = require('react')

var ChoiceListItem = React.createClass({
	render: function(){
		return (
			<li choiceId={this.props.choiceId}>
				{this.props.choice.text}
				<button onClick={this.props.fnDelete}>Delete</button>
				<button onClick={this.props.fnEdit}>Edit</button>
			</li>
		);
	}
});

var PollInput = React.createClass({
	getInitialState: function(){
		return {text: '', choices: []};
	},
	render: function(){
		return (
			<fieldset>
				<legend>
					<input type="textarea"
					onChange={this._onChange}
					value={this.state.text} />
				</legend>
				<ChoiceComposer fnCreate={this._createChoiceItem}/>
				<ol>
					{this.state.choices.map(function(choice, i){
						return <ChoiceListItem 
							key={i} choiceId={i} 
							choice={choice}
							fnEdit={this._editChoiceItem}
							fnDelete={this._deleteChoiceItem.bind(this, i)}
							/>
					}.bind(this))}
				</ol>
			
				<button
				disabled={!(this.state.text && this.state.choices.length > 1)}
				onClick={this._createPoll}>
				Submit
				</button>
			</fieldset>
		);
	},
	_createChoiceItem: function(choiceText){
		debugger
		if(choiceText){
			this.setState({
				choices: this.state.choices.concat([{
					text: choiceText, count: 0
				}])
			});
		}
	},
	_editChoiceItem: function(){
		debugger
	},
	_deleteChoiceItem: function(choiceId, event){
		debugger
		this.setState({
			choices: (this.state.choices.splice(choiceId, 1), this.state.choices)
		})
	},
	_createPoll: function(event) {
		debugger
//		event.preventDefault();  // avoid page reloading
		PollActionCreator.createPoll(this.state);
	},
	_onChange: function(event){
		debugger
		this.setState({text: event.target.value});
	}
});

module.exports = PollInput;
