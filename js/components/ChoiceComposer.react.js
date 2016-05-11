//let PollActionCreator = require('../actions/PollActionCreator');
let React = require('react')
//var ReactPropTypes = React.PropTypes; // todo

var ENTER_KEY_CODE = 13;

var ChoiceComposer = React.createClass({
	getInitialState: function(){
		return {value: ''};
	},

	render: function(){
		return (
			<input type="textarea"
			onChange={this._onChange}
			onKeyDown={this._onKeyDown}
			value={this.state.value} />
		);
	},
	_save: function(){
		this.props.fnCreate(this.state.value);
		this.setState({value: ''});
	},
	_onKeyDown: function(event){
	    if (event.keyCode === ENTER_KEY_CODE) {
	    	this._save();
    	}
	},
	_onChange: function(event){
		this.setState({value: event.target.value});
	}
});

module.exports = ChoiceComposer;
