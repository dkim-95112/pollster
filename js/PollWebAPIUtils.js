let PollServerActionCreator = require('./actions/PollServerActionCreator');

module.exports = {

  getAllPolls: function() {
    // simulate retrieving data from a database
    var rawPolls = JSON.parse(localStorage.getItem('polls'));

    // simulate success callback
    PollServerActionCreator.receiveAll(rawPolls);
  },
  tallyPoll: function(data){
  	debugger
  }
}