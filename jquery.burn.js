/*!
 * jQuery Burn - v0.1 - 8/31/2012
 *
 * Copyright (c) 2012 Kevin Attfield
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.org/license
 *
 */
(function($)
{
    var defaultSettings = {
        a : .3,
        k : .05,
        w : 10,
        wind: 1,
        interval: 100,
        flames : [{
                x: 0,
                hsla: [58, 96, 89, 1],
                y: 0,
                blur: 20
            },
            {
                x: 0,
                hsla: [51, 98, 76, 1],
                y: 5,
                blur: 30
            },
            {
                x: 0,
                hsla: [36, 100, 60, 1],
                y: 10,
                blur: 40
            },
            {
                x: 0,
                hsla: [28, 91, 49, 1],
                y: 20,
                blur: 50
            },
            {
                x: 0,
                hsla: [19, 94, 41, 1],
                y: 30,
                blur: 60
            },
            {
                x: 0,
                hsla: [15, 75, 34, 1],
                y: 40,
                blur: 70
            },
            {
                x: 0,
                hsla: [14, 66, 16, 1],
                y: 50,
                blur: 80
        }]
    };

    $.fn.burn = function(option, settings) {

        // check if user is setting/getting properties manually after plugin creation
        if( option === false) {
            var self = this.data('_burn')

            self && self.off();
            return this

        } else if(typeof option === 'object') {

            settings = option;

        } else if(typeof option == 'string') {

            var data = this.data('_burn');

            // this will check if plugin has already been initialized for this element
            if(data) {

                if(defaultSettings[option] !== undefined) {

                    if(settings !== undefined) {

                        if(option == 'title') {

                            data.content.html(settings);
                        }

                        data.settings[option] = settings;

                        return true;
                    }
                    else {

                        return data.settings[option];
                    }
                }
            }

            return false;
        }

        settings = $.extend({}, defaultSettings, settings || {});

        return this.each(function() {

            $settings = jQuery.extend(true, {}, settings);

            var burning = new Burning($settings);

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

        ignite: function()
        {
            var self = this;
            var op = self.settings;
            this.t = 0;        

            // return the target in case its already been defined for the current element 
            if(self.burning) return self.burning;

            self.oldShadow = self.elem.css('text-shadow');
            self.interval = setInterval(function(){
                self.burn();
            }, op.interval);
        },

        wave: function(x, t, intensity){
            var op = this.settings;

            return intensity * op.a * Math.sin(op.k*x - op.w*t);
        },

        burn: function(){
            var self = this;
            var op = this.settings;
            var shadow;
            this.t = this.t + op.interval/1000;
            shadow = $.map(op.flames, function(flame, i){
                var rise = -flame.y;
                var intensity = Math.sqrt(Math.random());
                flame.x = self.wave(flame.y, self.t, intensity);
                return (flame.x + op.wind)*flame.y + 'px ' + rise + 'px ' + flame.blur + 'px hsla(' + flame.hsla[0] + ', ' + flame.hsla[1] + '%, ' + flame.hsla[2] + '%, ' + flame.hsla[3] + ')';
            });

            self.elem.css('text-shadow', shadow.join(', '));
        },

        off: function(){
            window.clearInterval(this.interval);
            this.interval = null;
            this.elem.css('text-shadow', this.oldShadow);
        }
    };
})(jQuery);