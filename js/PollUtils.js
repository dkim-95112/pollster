module.exports = {

  convertRawPoll: function(rawPoll) {
    return {
      id: rawPoll.id,
      text: rawPoll.text,
      choices: rawPoll.choices
    };
  }
  // ,

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