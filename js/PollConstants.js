var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
  	TALLY_POLL: null,
  	RECEIVE_RAW_POLLS: null,
    //CLICK_THREAD: null,
    CREATE_POLL: null
    // RECEIVE_RAW_CREATED_MESSAGE: null,
    // RECEIVE_RAW_MESSAGES: null
  })

};