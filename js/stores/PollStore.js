const EventEmitter = require('events').EventEmitter;
//const AppDispatcher = require('../dispatcher/PollAppDispatcher');
//const ActionTypes = require('../PollConstants').ActionTypes;
const assign = require('object-assign');
const Firebase = require('firebase');

// private within this module
const CHANGE_EVENT = 'change';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDYrAWsVW7uH-mW7LSdxRX2N-vyeCom660",
  authDomain: "pollster-6aa8d.firebaseapp.com",
  databaseURL: "https://pollster-6aa8d.firebaseio.com",
  storageBucket: "pollster-6aa8d.appspot.com",
};
const App = firebase.initializeApp(config);
const _db = App.database();
//new Firebase("https://fiery-torch-6903.firebaseio.com");

const _polls = [];
const _clicks = [];
/*
polls: {
  pollId: {
    text: "what is your favorite color?",
    clickCount: 123,
    choices: {
      choiceId: {
        text: red,
        clickCount: 12
      }
      choiceId2: ...
    }
  },
  pollId2: ...
}
clicks:
  choiceId: {
    clickId:{ date: Date.now, uid: [uid]},
    clickId2: ...
  }
*/
function syncPolls(list, ref) {
  ref.on('child_added', function _add(snap, prevChild) {
    var data = snap.val();
    var pos = positionAfter(list, prevChild);
    debugger
    list.splice(pos, 0, {
      $id: snap.key, // matched to prevChild
      clickCount: data.clickCount,
      choices: data.choices,
      text: data.text
    });
    PollStore.emitChange();
  });
  ref.on('child_removed', function _remove(snap) {
    debugger
    var i = positionFor(list, snap.key);
    if (i > -1) {
      list.splice(i, 1);
    } else {
      throw "key not found"
    }
    PollStore.emitChange();
  });
  ref.on('child_changed', function _change(snap) {
    debugger
    var i = positionFor(list, snap.key);
    if (i > -1) {
      const data = snap.val();
      list[i] = {
        $id: snap.key,
        text: data.text,
        clickCount: data.clickCount,
        choices: data.choices
      }
      PollStore.emitChange();
    } else {
      throw "key not found";
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
    } else {
      throw "key not found";
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

function syncClicks(list, ref) {
  ref.on('child_added', function _add(snap, prevChild) {
    const d = snap.val();
  });
  ref.on('child_removed', function _remove(snap) {
    debugger
    // var i = positionFor(list, snap.key());
    // if (i > -1) {
    //   list.splice(i, 1);
    // }
    PollStore.emitChange();
  });
  ref.on('child_changed', function _change(snap) {
    debugger
    // var i = positionFor(list, snap.key());
    // if (i > -1) {
    //   list[i] = snap.val();

    //   // if $id property didn't exist, we wouldn't be here ?
    //   list[i].$id = snap.key(); // assumes data is always an object
    //   PollStore.emitChange();
    // }
  });
  ref.on('child_moved', function _move(snap, prevChild) {
    debugger
    // var curPos = positionFor(list, snap.key());
    // if (curPos > -1) {
    //   var data = list.splice(curPos, 1)[0];
    //   var newPos = positionAfter(list, prevChild);
    //   list.splice(newPos, 0, data);
    //   PollStore.emitChange();
    // }
  });
}

// function wrapLocalCrudOps(list, firebaseRef) {
//   //   // we can hack directly on the array to provide some convenience methods
//     list.$add = function(data) {
//       return firebaseRef.push(data);
//     };
//     list.$remove = function(key) {
//       firebaseRef.child(key).remove();
//     };
//   list.$set = function(key, newData) {
//     // make sure we don't accidentally push our $id prop
//     if (newData.hasOwnProperty('$id')) {
//       delete newData.$id;
//     }
//     firebaseRef.child(key).set(newData);
//     newData.$id = key; // so positionFor() can find it
//   };
//   //   list.$indexOf = function(key) {
//   //     return positionFor(list, key); // positionFor in examples above
//   //   }
// }

const PollStore = assign({}, EventEmitter.prototype, {

  didMount: function() {
    debugger
    syncPolls(_polls, _db.ref("/polls"));
    syncClicks(_clicks, _db.ref("/clicks"));
    //wrapLocalCrudOps(_polls, _firebaseRef);
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

  tally: function(pollId, choiceId, uid) {
    debugger
    _db.ref('/clicks/' + pollId + '/' + choiceId).push({
      date: firebase.database.ServerValue.TIMESTAMP,
      uid: uid || null
    });
    _db.ref("/polls/" + pollId).transaction(function(poll){
      debugger
      poll.choices[choiceId].clickCount++; // per choice
      poll.clickCount++; // total
      return poll;
    })

  },
  add: function(inputPoll){
    debugger
    const newPollKey = _db.ref("/polls").push({
      text: inputPoll.text,
      clickCount: 0
    }).key;
    debugger
    inputPoll.choices.forEach(function(choice){
      _db.ref("/polls/" + newPollKey + "/choices").push({
        text: choice.text,
        clickCount: 0
      });
    });
  },
  remove: function(pollId){
    debugger
    _db.ref("/polls/" + pollId).remove().then(function(){
      debugger
      _db.ref("/clicks/" + pollId).remove();
    }, function(err){
      throw err;
    });
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


module.exports = PollStore;