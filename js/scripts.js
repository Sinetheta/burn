(function(){
	$(function() {

	    $('.burning').burn();

	    // google-code-prettify
	    prettyPrint();

	    // have example tab changes trigger examples to activate/deactivate
		$('#example-tabs a[data-toggle="tab"]').on('show', function (e) {
		  // activated tab
		  $(e.target.hash).find('.burn-demo').trigger('burnOn');
		  // previous tab
		  $(e.relatedTarget.hash).find('.burn-demo').trigger('burnOff');
		});

		// turn off all example tabs which are not visible
		$('.burn-demo').on('burnOff', function() {
			$(this).burn(false);
		});

		// activate example tabs when opened to avoid unnecessary flame animation calculation
		$('#example1').find('.burn-demo').on('burnOn', function() {
			$(this).burn();
		});
		$('#example2').find('.burn-demo').on('burnOn', function() {
			$(this).burn({
				flames : [{
			            x: 0,
			            hsla: [300, 100, 80, .1],
			            y: 0,
			            blur: .1
			        },
			        {
			            x: 0,
			            hsla: [290, 100, 80, .8],
			            y: .02,
			            blur: .15
			        },
			        {
			            x: 0,
			            hsla: [280, 100, 80, .7],
			            y: .05,
			            blur: .2
			        },
			        {
			            x: 0,
			            hsla: [260, 100, 80, .6],
			            y: .1,
			            blur: .25
			        },
			        {
			            x: 0,
			            hsla: [240, 100, 80, .5],
			            y: .15,
			            blur: .3
			        },
			        {
			            x: 0,
			            hsla: [220, 100, 80, .4],
			            y: .25,
			            blur: .4
			        },
			        {
			            x: 0,
			            hsla: [200, 100, 80, .3],
			            y: .5,
			            blur: .5
			    }]
			});
		});
		$('#example3').find('.burn-demo').on('burnOn', function() {
			$(this).burn({
		    	a : 1,
		        k : 5,
		        w : 5,
		        wind: 0,
				flames : [{
			            x: 0,
			            hsla: [0, 0, 0, .4],
			            y: -.1,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .35],
			            y: -.2,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .3],
			            y: -.3,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .25],
			            y: -.35,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .2],
			            y: -.4,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .15],
			            y: -.45,
			            blur: 0
			        },
			        {
			            x: 0,
			            hsla: [0, 0, 0, .1],
			            y: -.5,
			            blur: 0
			    }]
			});
		});
		
		var axisColor = "rgb(128, 128, 128)";
		var a = 1;
		var k = 5;
		var w = .005;
		var wind = 1;
		var dt = 100;
		var tSteps = 100;

		function showAxes(ctx, axes) {
			var w = ctx.canvas.width;
			var h = ctx.canvas.height;

			ctx.beginPath();
			ctx.strokeStyle = axisColor;
			// X axis
			ctx.moveTo(0, axes.t0);
			ctx.lineTo(w, axes.t0);
			// Y axis
			ctx.moveTo(axes.s0, 0);
			ctx.lineTo(axes.s0, h);
			ctx.stroke();
		}

		function animateWave(canvas, timer) {
			var fy = function(x, t){
				return a*Math.sin(k*x - w*t);  
			};
			var ctx = canvas.getContext("2d");
			// pixels from x=0 to x=1
			var scaleX = 100;
			var scaleY = 100;
			var t = 0;
			var dt = 100;
			var axes = {
				s0: .5*canvas.width,
				// t0 pixels from top to y=0
				t0: .5*canvas.height
			};
			var xs = function(s){
				return (s - axes.s0)/scaleX;  
			};
			var yt = function(t){
				return (axes.t0 - t)/scaleY;  
			};
			var sx = function(x){
				return x*scaleX + axes.s0;  
			};
			var ty = function(y){
				return axes.t0 - y*scaleY; 
			};
			var ds = canvas.width/tSteps;
			var dx = xs(ds) - xs(0);

			function wave(t) {
				var i = 0;
				var x = xs(0);
				var y = fy(x, t);

				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.strokeStyle = "rgb(255, 0, 0)";
				ctx.moveTo(sx(x), ty(y))

				while (i < tSteps){
					x += dx;
					y = fy(x, t);
					ctx.lineTo(sx(x), ty(y));
					i++;
				}
				ctx.stroke();
			}

			// draw function under axes
			ctx.globalCompositeOperation = 'destination-over';

			// Draw a single frame on page load
			// clear canvas
			ctx.clearRect(0, 0, 400, 200); 
			showAxes(ctx, axes);
			wave(t);

			if(timer===false) return null;

			// Turn off animation
			if(timer) return clearInterval(timer);

			// TODO: use requestAnimationFrame to turn this over to setTimeout
			return setInterval(function(){	
				t += dt;			
				ctx.clearRect(0, 0, 400, 200);
				showAxes(ctx, axes);
				wave(t);	
			}, dt);
		}

		function animateFlame(canvas, timer) {
			var fx = function(y, t, intensity){
				return intensity*a*Math.sin(k*y - w*t);  
			};
			var ctx = canvas.getContext("2d");
			// pixels from x=0 to x=1
			var scaleX = 100;
			var scaleY = 100;
			var t = 0;
			var dt = 100;
			var axes = {
				s0: 0,
				// t0 pixels from top to y=0
				t0: canvas.height
			};
			var xs = function(s){
				return (s - axes.s0)/scaleX;  
			};
			var yt = function(t){
				return (axes.t0 - t)/scaleY;  
			};
			var sx = function(x){
				return x*scaleX + axes.s0;  
			};
			var ty = function(y){
				return axes.t0 - y*scaleY; 
			};
			var ds = canvas.height/tSteps;
			var dy = yt(0) - yt(ds);
			var intensity = 1;


			function flame(t, intensity) {
				var i = 0;
				var y = yt(canvas.height);
				var x = y*(fx(y, t, intensity) + wind);

				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.strokeStyle = "rgb(255, 0, 0)";
				ctx.moveTo(sx(x), ty(y))

				while (i < tSteps){
					y += dy;
					x = y*(fx(y, t, intensity) + wind);
					ctx.lineTo(sx(x), ty(y));
					i++;
				}
				ctx.stroke();
			}

			// draw function under axes
			ctx.globalCompositeOperation = 'destination-over';

			// Draw a single frame on page load
			// clear canvas
			ctx.clearRect(0, 0, 400, 200); 
			showAxes(ctx, axes);
			flame(t, intensity);

			if(timer===false) return null;

			// Turn off animation
			if(timer) return clearInterval(timer);

			// TODO: use requestAnimationFrame to turn this over to setTimeout
			return setInterval(function(){	
				t += dt;
				intensity = Math.sqrt(Math.random());
				ctx.clearRect(0, 0, 400, 200);
				showAxes(ctx, axes);
				flame(t, intensity);	
			}, dt);
		}

		$('#plot-wave').on({
			start: function(){
				$(this).data('timer', animateWave(this));
			},
			stop: function(){
				animateWave(this, $(this).data('timer'));
			}
		});
		$('#plot-flame').on({
			start: function(){
				$(this).data('timer', animateFlame(this));
			},
			stop: function(){
				animateFlame(this, $(this).data('timer'));
			}
		});
		animateWave($('#plot-wave')[0], false);
		animateFlame($('#plot-flame')[0], false);

		$('.btn-canvas-toggle').click(function(){
			var button = $(this);
			var canvas = $('#' + button.data('control'));
			var isOn = button.hasClass('active');

			canvas.trigger(isOn? 'stop': 'start');
		});
	});
}(jQuery));