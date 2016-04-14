let PollAppDispatcher = require('../dispatcher/PollAppDispatcher');
let PollConstants = require('../PollConstants');
// var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
// var ChatMessageUtils = require('../utils/ChatMessageUtils');

let ActionTypes = PollConstants.ActionTypes;

module.exports = {

  tallyPoll: function(choiceId, pollId){
    debugger
    PollAppDispatcher.dispatch({
      type: ActionTypes.TALLY_POLL,
      choiceId: choiceId,
      pollId: pollId
    })
    // todo: send poll to server here
  }

  // createMessage: function(text, currentThreadID) {
  //   ChatAppDispatcher.dispatch({
  //     type: ActionTypes.CREATE_MESSAGE,
  //     text: text,
  //     currentThreadID: currentThreadID
  //   });
  //   var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  //   ChatWebAPIUtils.createMessage(message);
  // }

};