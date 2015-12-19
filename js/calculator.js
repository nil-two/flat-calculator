(function() {
  var DEFAULT_BUTTONS = [
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

    calculate: function() {
      this.set('result', eval(this.get('result')));
    },

    special_buttons: {
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
