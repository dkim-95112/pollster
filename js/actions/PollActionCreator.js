let PollAppDispatcher = require('../dispatcher/PollAppDispatcher');
let PollConstants = require('../PollConstants');
var PollWebAPIUtils = require('../PollWebAPIUtils');
var PollUtils = require('../PollUtils');

let ActionTypes = PollConstants.ActionTypes;

module.exports = {

  tallyPoll: function(pollId, choiceId){
    PollAppDispatcher.dispatch({
      type: ActionTypes.TALLY_POLL,
      choiceId: choiceId,
      pollId: pollId
    })
    
    PollWebAPIUtils.tallyPoll(// todo: send poll to server here
      PollUtils.getPollData(pollId, choiceId)
    );
  },

  createPoll: function(pollInput){
    PollAppDispatcher.dispatch({
      type: ActionTypes.CREATE_POLL,
      pollInput: pollInput
    })

    //todo: send new poll to server here
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