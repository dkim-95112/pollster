var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/PollAppDispatcher');
var ActionTypes = require('../PollConstants').ActionTypes;
var assign = require('object-assign');
var PollUtils = require('../PollUtils');

var CHANGE_EVENT = 'change';

var _polls = {};

/**
 * Create a POLL item.
 * @param  {string} text The content of the POLL
 */
function create(pollInput) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _polls[id] = {
    text: pollInput.text,
    choices: pollInput.choices
  };
}

/**
 * Update a POLL item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
// function update(id, updates) {
//   _polls[id] = assign({}, _polls[id], updates);
// }

/**
 * Update all of the POLL items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
// function updateAll(updates) {
//   for (var id in _polls) {
//     update(id, updates);
//   }
// }

/**
 * Delete a POLL item.
 * @param  {string} id
 */
// function destroy(id) {
//   delete _polls[id];
// }

/**
 * Delete all the completed POLL items.
 */
// function destroyCompleted() {
//   for (var id in _polls) {
//     if (_polls[id].complete) {
//       destroy(id);
//     }
//   }
// }

function _addPolls(rawPolls) {
  rawPolls.forEach(function(poll) {
    if (!_polls[poll.id]) {
      _polls[poll.id] = PollUtils.convertRawPoll(
        poll
      );
    }
  });
}


var PollStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of POLLs.
   * @return {object}
   */
  getAll: function() {
    return _polls;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT); // who's listening ?
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_POLLS:
      _addPolls(action.rawPolls);
      //ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      //_markAllInThreadRead(ThreadStore.getCurrentID());
      PollStore.emitChange();
      break;

    case ActionTypes.TALLY_POLL:
      debugger
      _polls[action.pollId].choices[action.choiceId].count++;
      PollStore.emitChange();
      break;

    case ActionTypes.CREATE_POLL:
      debugger
      create(action.pollInput);
      PollStore.emitChange();
      break;

    // case TodoConstants.POLL_DESTROY:
    //   destroy(action.id);
    //   TodoStore.emitChange();
    //   break;

    // case TodoConstants.POLL_DESTROY_COMPLETED:
    //   destroyCompleted();
    //   TodoStore.emitChange();
    //   break;

    default:
      console.log("action not handled");
  }
});

module.exports = PollStore;
