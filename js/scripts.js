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
	});
}(jQuery));