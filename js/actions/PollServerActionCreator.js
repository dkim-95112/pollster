var PollAppDispatcher = require('../dispatcher/PollAppDispatcher');
var PollConstants = require('../PollConstants');

var ActionTypes = PollConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawPolls) {
    debugger
    PollAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_POLLS,
      rawPolls: rawPolls
    });
  }
  // ,

  // receiveCreatedMessage: function(createdMessage) {
  //   ChatAppDispatcher.dispatch({
  //     type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
  //     rawMessage: createdMessage
  //   });
  // }

};
