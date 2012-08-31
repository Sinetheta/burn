jQuery Burn: Text flame effect
====

jQuery Burn applies a simple flame effect to text using the css text-shadow property. As such it currently does not work in IE http://caniuse.com/css-textshadow

Usage
---

`$(target).burn();`

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
	            //height above the letter
	            y: 0,
	            //Size/clarity of the shadow
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
	$(target).burn({options});