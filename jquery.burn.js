/*!
 * jQuery Burn - v0.3.2 - 1/18/2013
 *
 * Copyright (c) 2012 Kevin Attfield
 * Dual licensed under the MIT and GPL licenses.
 * http://sinetheta.github.com/burn/
 *
 */
(function($) {
    var defaultSettings = {
        a: .3,
        k: .05,
        w: 10,
        wind: 1,
        strength: 1,
        diffusion: 1,
        flames: [{
            x: 0,
            hsla: [58, 96, 89, 1],
            y: 0,
            blur: .1
        }, {
            x: 0,
            hsla: [51, 98, 76, 1],
            y: .02,
            blur: .15
        }, {
            x: 0,
            hsla: [36, 100, 60, 1],
            y: .04,
            blur: .2
        }, {
            x: 0,
            hsla: [28, 91, 49, 1],
            y: .08,
            blur: .25
        }, {
            x: 0,
            hsla: [19, 94, 41, 1],
            y: .15,
            blur: .3
        }, {
            x: 0,
            hsla: [15, 75, 34, 1],
            y: .2,
            blur: .4
        }, {
            x: 0,
            hsla: [14, 66, 16, 1],
            y: .5,
            blur: .5
        }]
    };

    $.fn.burn = function(option, settings) {
        var self;

        // check if user is setting/getting properties manually after plugin creation
        if(option === false) {
            self = this.data('_burn');
            self && self.off();

            return this;
        } else if(typeof option === 'object') {
            settings = option;
        } else if(typeof option == 'string') {
            self = this.data('_burn');
            // this will check if plugin has already been initialized for this element
            if(self) {
                if(defaultSettings[option] !== undefined) {
                    if(settings !== undefined) {
                        if(option == 'title') {
                            self.content.html(settings);
                        }
                        self.settings[option] = settings;

                        return true;
                    } else {

                        return self.settings[option];
                    }
                }
            }
        }

        settings = $.extend({}, defaultSettings, settings || {});

        return this.each(function() {
            var $settings = $.extend(true, {}, settings),
                burning = new Burning($settings);

            burning.elem = $(this);
            burning.ignite();
            burning.elem.data('_burn', burning);
        });
    };

    function Burning(settings) {

        this.burning = null;
        this.settings = settings;

        return this;
    }

    Burning.prototype = {

        ignite: function() {
            var self = this;
            var op = self.settings;

            // return the target in case its already been defined for the current element 
            if(self.burning) return self.burning;
            self.oldShadow = self.elem.css('text-shadow');
            (function animloop() {
                self.timer = window.requestAnimationFrame(animloop);
                self.burn();
            })();
        },

        wave: function(x, t, intensity) {
            var op = this.settings;

            return intensity * op.a * Math.sin(op.k * x - op.w * t);
        },

        burn: function() {
            var self = this;
            var op = this.settings;
            var shadow;

            shadow = $.map(op.flames, function(flame, i) {
                var rise = -flame.y;
                var intensity = Math.sqrt(Math.random());

                flame.x = self.wave(flame.y, Date.now() / 1000, intensity);

                return(flame.x + op.wind) * flame.y * op.strength * op.diffusion + 'em ' + rise * op.strength * op.diffusion + 'em ' + flame.blur * op.strength * op.diffusion + 'em hsla(' + flame.hsla[0] + ', ' + flame.hsla[1] + '%, ' + flame.hsla[2] + '%, ' + flame.hsla[3] + ')';
            });
            self.elem.css('text-shadow', shadow.join(', '));
        },

        off: function() {
            window.cancelAnimationFrame(this.timer);
            this.timer = null;
            this.elem.css('text-shadow', this.oldShadow);
        }
    };
})(jQuery);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if(!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());