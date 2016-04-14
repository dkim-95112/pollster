let PollServerActionCreator = require('./actions/PollServerActionCreator');

module.exports = {

  getAllPolls: function() {
    // simulate retrieving data from a database
    debugger
    var rawPolls = JSON.parse(localStorage.getItem('polls'));

    // simulate success callback
    PollServerActionCreator.receiveAll(rawPolls);
  }
}