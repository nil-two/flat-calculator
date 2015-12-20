(function() {
  var DEFAULT_BUTTONS = [
    ['C', '±', ' ', '←'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+'],
  ];

  var Calculator = Ractive.extend({
    template: '#calculator_template',

    click: function(x, y) {
      var button = this.get('buttons')[y][x];
      if (this.special_buttons[button]) {
        this.special_buttons[button].bind(this)();
      } else {
        this.set('result', this.get('result') + button);
      }
    },

    submit: function(event) {
      event.original.preventDefault();
      this.calculate();
    },

    clear: function() {
      this.set('result', '');
    },

    backspace: function() {
      var result = this.get('result');
      result = result.substr(0, result.length - 1);
      this.set('result', result);
    },

    toggle_sign: function() {
      var result = this.get('result');
      if (result.match(/^-/)) {
        result = result.substr(1);
      } else {
        result = '-' + result;
      }
      this.set('result', result);
    },

    calculate: function() {
      this.set('result', eval(this.get('result')));
    },

    special_buttons: {
      ' ': function() {
      },
      'C': function() {
        this.clear();
      },
      '←': function() {
        this.backspace();
      },
      '±': function() {
        this.toggle_sign();
      },
      '=': function() {
        this.calculate();
      },
    }
  });

  new Calculator({
    el: '#calculator_app',
    data: {
      result: '',
      buttons: DEFAULT_BUTTONS,
    },
  });
})();
