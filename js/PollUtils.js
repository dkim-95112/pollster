module.exports = {

  convertRawPoll: function(rawPoll) {
    return { // doesn't do anything now ?
      id: rawPoll.id,
      text: rawPoll.text,
      choices: rawPoll.choices
    };
  },
  getPollData: function(pollId, choiceId){
    return {
      pollId: pollId,
      choiceId: choiceId
    };
  }
  
  // getCreatedMessageData: function(text, currentThreadID) {
  //   var timestamp = Date.now();
  //   return {
  //     id: 'm_' + timestamp,
  //     threadID: currentThreadID,
  //     authorName: 'Bill', // hard coded for the example
  //     date: new Date(timestamp),
  //     text: text,
  //     isRead: true
  //   };
  // }

};