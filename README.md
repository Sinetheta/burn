jQuery Burn: Text flame effect
====

jQuery Burn applies a simple flame effect to text using the css text-shadow property. As such it currently does not work in IE http://caniuse.com/css-textshadow

Usage
---

	<script>
	(function(){
		$(document).ready(function() {
			$(target).burn();
		});
	})(jQuery);
	</script>

[Example](http://jsfiddle.net/sinetheta/sbfMY/)

To turn off effect `$(target).burn(false);`

Wave Equation
---

The horizontal movement of the flame is simulated by a [plane traveling wave](http://hyperphysics.phy-astr.gsu.edu/hbase/waves/wavsol.html#c5) *y(x,t) = Asin(kx - ωt)*, weighted by the distance from the target to mimic "tethering". Please play with the exposed parameters and let me know how you'd like the flame to look by default.

Options
---

	var options = {
		//Amplitude
	    a : .3,
	    //Wave Number
	    k : .05,
	    //Angular Frequency
	    w : 10,
	    //Skew
	    wind: 1,
	    //Animation speed
	    interval: 100,
	    //Each of these objects represents a shadow
	    flames : [{
	    		//Start displacement
                x: 0,
                //Color of the shadow
                hsla: [58, 96, 89, 1],
                //height above the letter in em
                y: 0,
                //Size/clarity of the shadow
                blur: .1
            },
            {
                x: 0,
                hsla: [51, 98, 76, 1],
                y: .02,
                blur: .15
            },
            {
                x: 0,
                hsla: [36, 100, 60, 1],
                y: .04,
                blur: .2
            },
            {
                x: 0,
                hsla: [28, 91, 49, 1],
                y: .08,
                blur: .25
            },
            {
                x: 0,
                hsla: [19, 94, 41, 1],
                y: .15,
                blur: .3
            },
            {
                x: 0,
                hsla: [15, 75, 34, 1],
                y: .2,
                blur: .4
            },
            {
                x: 0,
                hsla: [14, 66, 16, 1],
                y: .5,
                blur: .5
        }]
	};
	$(target).burn(options);