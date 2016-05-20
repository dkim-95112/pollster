//let PollActionCreator = require('../actions/PollActionCreator');
const ChoiceComposer = require('./ChoiceComposer.react');
const PollStore = require('../stores/PollStore');
const React = require('react')

var ChoiceListItem = React.createClass({
	render: function(){
		debugger
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
		return {
			text: '',
			choices: []
		};
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
					{
						this.state.choices.map(function(choice, i){
						debugger
						return <ChoiceListItem 
							key={i} choiceId={i} 
							choice={choice}
							fnEdit={this._editChoiceItem}
							fnDelete={this._deleteChoiceItem.bind(this, i)}
							/>
						}.bind(this))
					}
				</ol>
			
				<button
				disabled={!(this.state.text && this.state.choices.length > 1)}
				onClick={this._onClick}>
				Submit
				</button>
			</fieldset>
		);
	},
	_createChoiceItem: function(choiceText){
		debugger
		if (choiceText) {
			this.state.choices.push({
				text: choiceText
			})
			this.setState({
				choices: this.state.choices
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
	_onClick: function(event) {
		debugger
		//event.preventDefault();  // avoid page reloading
		this.props.fnAdd(this.state);
		this.setState(this.getInitialState);
	},
	_onChange: function(event){
		this.setState({text: event.target.value});
	}
});

module.exports = PollInput;
