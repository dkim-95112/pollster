var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/PollAppDispatcher');
var ActionTypes = require('../PollConstants').ActionTypes;
var assign = require('object-assign');
var Firebase = require('firebase');

// private within this module
var CHANGE_EVENT = 'change';
var _firebaseRef = new Firebase("https://fiery-torch-6903.firebaseio.com/polls/");
var _polls = [];


function syncChanges(list, ref) {
  ref.on('child_added', function _add(snap, prevChild) {
    debugger
    var data = snap.val();
    data.$id = snap.key(); // assumes data is always an object
    var pos = positionAfter(list, prevChild);
    list.splice(pos, 0, data);
    PollStore.emitChange();
  });
  ref.on('child_removed', function _remove(snap) {
    debugger
    var i = positionFor(list, snap.key());
    if (i > -1) {
      list.splice(i, 1);
    }
    PollStore.emitChange();
  });
  ref.on('child_changed', function _change(snap) {
    debugger
    var i = positionFor(list, snap.key());
    if (i > -1) {
      list[i] = snap.val();

      // if $id property didn't exist, we wouldn't be here
      list[i].$id = snap.key(); // assumes data is always an object
      PollStore.emitChange();
    }
  });
  ref.on('child_moved', function _move(snap, prevChild) {
    debugger
    var curPos = positionFor(list, snap.key());
    if (curPos > -1) {
      var data = list.splice(curPos, 1)[0];
      var newPos = positionAfter(list, prevChild);
      list.splice(newPos, 0, data);
      PollStore.emitChange();
    }
  });
}

// similar to indexOf, but uses id to find element
function positionFor(list, key) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].$id === key) {
      return i;
    }
  }
  return -1;
}
// using the Firebase API's prevChild behavior, we
// place each element in the list after it's prev
// sibling or, if prevChild is null, at the beginning
function positionAfter(list, prevChild) {
  if (prevChild === null) {
    return 0;
  } else {
    var i = positionFor(list, prevChild);
    if (i === -1) {
      return list.length;
    } else {
      return i + 1;
    }
  }
}

function wrapLocalCrudOps(list, firebaseRef) {
  //   // we can hack directly on the array to provide some convenience methods
    list.$add = function(data) {
      return firebaseRef.push(data);
    };
    list.$remove = function(key) {
      firebaseRef.child(key).remove();
    };
  list.$set = function(key, newData) {
    // make sure we don't accidentally push our $id prop
    if (newData.hasOwnProperty('$id')) {
      delete newData.$id;
    }
    firebaseRef.child(key).set(newData);
  };
  //   list.$indexOf = function(key) {
  //     return positionFor(list, key); // positionFor in examples above
  //   }
}

// function getSynchronizedArray(firebaseRef) {
//   var list = [];
//   syncChanges(list, firebaseRef);
//   wrapLocalCrudOps(list, firebaseRef);
//   return list;
// }

/**
 * Create a POLL item.
 * @param  {string} text The content of the POLL
 */
// function create(pollInput) {
//   // Hand waving here -- not showing how this interacts with XHR or persistent
//   // server-side storage.
//   // Using the current timestamp + random number in place of a real id.
//   var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
//   _polls[id] = {
//     text: pollInput.text,
//     choices: pollInput.choices
//   };
// }

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

// function _addPolls(rawPolls) {
//   debugger
//   rawPolls.forEach(function(poll) {
//     if (!_polls[poll.id]) {
//       _polls[poll.id] = PollUtils.convertRawPoll(
//         poll
//       );
//     }
//   });
// }



var PollStore = assign({}, EventEmitter.prototype, {

  didMount: function() {
    syncChanges(_polls, _firebaseRef); // updates
    wrapLocalCrudOps(_polls, _firebaseRef);
  },
  // debugger
  // this.setState({
  //   polls: getSynchronizedArray(this.firebaseRef)
  // });
  willUnmount: function() {
    // _firebaseRef.off();
  },

  /**
   * Get the entire collection of POLLs.
   * @return {object}
   */
  getAll: function() {
    return _polls;
  },

  tally: function(pollId, choiceId) {
    debugger
    var poll = assign({}, _polls[positionFor(_polls, pollId)]);
    poll.choices[choiceId].count++;
    _polls.$set(pollId, poll);
  },

  add: function(inputPoll){
    debugger
    _polls.$add(inputPoll);
  },
  remove: function(pollId){
    debugger
    _polls.$remove(pollId);
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
// AppDispatcher.register(function(action) {
//   var text;

//   switch (action.type) {

// case ActionTypes.RECEIVE_RAW_POLLS:
//   _addPolls(action.rawPolls);
//   //ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
//   //_markAllInThreadRead(ThreadStore.getCurrentID());
//   PollStore.emitChange();
//   break;

// case ActionTypes.TALLY_POLL:
//   debugger
//   _polls[action.pollId].choices[action.choiceId].count++;
//   PollStore.emitChange();
//   break;

// case ActionTypes.CREATE_POLL:
//   debugger
//   create(action.pollInput);
//   PollStore.emitChange();
//   break;

// case TodoConstants.POLL_DESTROY:
//   destroy(action.id);
//   TodoStore.emitChange();
//   break;

// case TodoConstants.POLL_DESTROY_COMPLETED:
//   destroyCompleted();
//   TodoStore.emitChange();
//   break;

//     default:
//       console.log("action not handled");
//   }
// });

module.exports = PollStore;