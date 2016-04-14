module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('polls', JSON.stringify([
      {
        id: 'p_1',
        text: 'what is your name?',
        timestamp: Date.now() - 99999,
        choices: [
          { text: 'tim', count: 123 },
          { text: 'lancelot', count: 22 },
          { text: 'arthur', count: 42 }
        ]
      },
      {
        id: 'p_2',
        text: "what is your favorite color?",
        timestamp: Date.now() - 89999,
        choices: [
          { text: "cyan", count: 123},
          { text: "magenta", count: 22},
          { text: "yellow", count: 42}
        ]
      }
    ]));
  }

};
