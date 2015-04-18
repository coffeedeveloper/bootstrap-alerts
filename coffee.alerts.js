function Alerts(opts) {

  var isString = function (obj) {
    return typeof obj === 'string';
  };

  if (isString(opts)) opts = { el: opts };

  this.defaults = {
    el: '.alert',
    effect: 'normal',
    wrapper: null,
    hide: $.noop,
    close: $.noop,
    btn: null,
    prefix: 'alert-',
    className: ['alert-warning', 'alert-info', 'alert-danger', 'alert-success']
  };

  this.opts    = $.extend({}, this.defaults, opts);
  this.el      = $(this.opts.el);
  this.wrapper = this.opts.wrapper ? this.opts.wrapper : this.el;
  this.effect  = this.opts.effect;
  this.btn     = this.opts.btn ? this.opts.btn : this.el.find('> button[class~="close"]');

  if (isString(this.wrapper)) {
    this.wrapper = this.el.find(this.wrapper);
  }

  if (isString(this.btn)) {
    this.btn = this.el.find(this.btn);
  }

  this.hasClose = this.btn && this.btn.size() > 0;
  var that      = this;

  this.bind();
}

Alerts.fn = Alerts.prototype = {
  bind: function () {
    var that = this;
    if (this.hasClose) {
      if (this.opts.wrapper === null) {
        var $div = this.el.find('> div');
        if ($div.size() === 0) {
          $div = $('<div />');
          this.el.append($div);
        }
        this.wrapper = $div;
      }
      this.btn.on('click', function () {
        that.hide();
        if ($.isFunction(that.opts.close)) {
          that.opts.close(that.el);
        }
      });
    }
    switch (this.effect) {
      case 'fade':
        this.effectIn = 'fadeIn';
        this.effectOut = 'fadeOut';
        break;
      case 'slide':
        this.effectIn = 'slideUp';
        this.effectOut = 'slideDown';
        break;
      default:
        this.effectIn = 'show';
        this.effectOut = 'hide';
        break;
    }
  },
  success: function (msg, cb) {
    this.action('success', msg, cb);
  },
  danger: function (msg, cb) {
    this.action('danger', msg, cb);
  },
  warning: function (msg, cb) {
    this.action('warning', msg, cb);
  },
  info: function (msg, cb) {
    this.action('info', msg, cb);
  },
  action: function (type, msg, cb) {
    this.klass(this.opts.prefix + type).show(msg, cb);
  },
  klass: function (k) {
    var r = [];
    $.each(this.opts.className, function (i, c) {
      if (c != k) {
        r.push(c);
      }
    });
    this.el.removeClass(r.join(' ')).addClass(k);
    return this;
  },
  show: function (msg, cb) {
    if (msg) {
      this.wrapper.html(msg);
    }

    this.el[this.effectIn]();

    if ($.isFunction(cb)) {
      cb(this.el);
    }
  },
  hide: function (cb) {
    this.el[this.effectOut]();

    if ($.isFunction(cb)) {
      cb(this.el);
    } else if ($.isFunction(this.opts.hide)) {
      this.opts.hide(this.el);
    }
  }
};
