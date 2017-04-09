/**
 * Main JS file for GhostScroll behaviours
 */

var $post = $('.post');
var $first = $('.post.first'); 
var $last = $('.post.last'); 
var $fnav = $('.fixed-nav');
var $postholder = $('.post-holder');
var $postafter = $('.post-after');
var $sitehead = $('#site-head');

/* Globals jQuery, document */
(function ($) {
	"use strict";
	function srcTo (el) {
		$('html, body').animate({
			scrollTop: el.offset().top
		}, 500);
	}
	$(document).ready(function(){
	 
		$postholder.each(function (e) {
			if(e % 2 != 0)
				$(this).addClass("odd");
		});

		$postafter.each(function (e) {
			var bg = $(this).parent().css('background-color')
			$(this).css('border-top-color', bg);

			if (e % 2 == 0) {
				$(this).addClass("even");
			}
		});
		
		$('.btn.first').click( function () {
			srcTo($first);
		});
		$('.btn.last').click( function () {
			srcTo($last);
		});
		$('#header-arrow').click(function () {
			srcTo($first);
		});

		$('.post-title').each(function () {
			var t = $(this).text();
			var index = $(this).parents('.post-holder').index();
			var $nav = $("<a href='#' class='fn-item' item_index='"+index+"'>"+t+"</a>");
			$fnav.append($nav);
			$(this).parents('article').attr('id',t.toLowerCase().split(' ').join('-')).attr('item_index', index);
			$nav.click(function (e) {
				e.preventDefault();
				var i = $(this).attr('item_index');
				var s = $(".post[item_index='"+i+"']");

				$('html, body').animate({
					scrollTop: s.offset().top
				}, 200, function() {
					console.log('done');
				});

			});
		});

		$('.post.last').next('.post-after').hide();
		if($sitehead.length) { 
			$(window).scroll( function () {
				var w = $(window).scrollTop();
				var g = $sitehead.offset().top;
				var h = $sitehead.offset().top + $sitehead.height()-100;
				
				// var paralex = 30 + w/13 + "%";
				// $sitehead.css("background-position-y", paralex);

				// if(w >= g && w<=h) {
				// 	$('.fixed-nav').fadeOut('fast');
				// } else if($(window).width()>500) {
				// 	$('.fixed-nav').fadeIn('fast');
				// }

				$post.each(function () {
					var f = $(this).offset().top;
					var b = $(this).offset().top + $(this).height();
					var t = $(this).parent('.post-holder').index();
					var i = $(".fn-item[item_index='"+t+"']");
					var a = $(this).parent('.post-holder').prev('.post-holder').find('.post-after');

					// if(w >= f && w<=b) {
					// 	i.addClass('active');
					// 	a.fadeOut('slow');
					// } else {
					// 	i.removeClass('active');
					// 	a.fadeIn('slow');
					// }
				});
			});
		}

		$('ul li').before('<span class="bult fa fa-asterisk icon-asterisk"></span>');
		$('blockquote p').prepend('<span class="quo icon-quote-left"></span>');
		$('blockquote p').append('<span class="quo icon-quote-right"></span>');

		// Blend 'em
		// $('#backdrop').one('load', function() {
		//   // do stuff
		// }).each(function() {
		//   if(this.complete) {
		//   	
		//   }
		// });

		// var blendImages = {
		// 	'backdrop': {
		// 		loaded: false,
		// 		src: "https://s3-us-west-2.amazonaws.com/schmolga-wedding/natural-paper-background-texture-hd-5a0b-2.jpg"
		// 	},
		// 	'alex-image': {
		// 		loaded: false,
		// 		src: "https://s3-us-west-2.amazonaws.com/schmolga-wedding/alex-cutout.png"
		// 	},
		// 	'olga-image': {
		// 		loaded: false,
		// 		src: "https://s3-us-west-2.amazonaws.com/schmolga-wedding/olga-cutout.png"
		// 	}
		// };
		// var run1 = false;
		// var imageLoaded = function() {
		// 	var key = this.attributes.id;
		// 	if(blendImages[key].canvas) {
		// 		return;
		// 	}
		// 	var canvas = document.createElement("canvas"),
		// 			ctx = canvas.getContext("2d");
		// 	canvas.width = this.width;
	 //    canvas.height = this.height;
	 //    ctx.drawImage( this, 0, 0 );
	 //    var imgSrc = canvas.toDataURL("image/png");
	 //    // localStorage.setItem( key, imgSrc );
	 //    blendImages[key].image.src =  imgSrc;
  //     blendImages[key].loaded = true;
  //     blendImages[key].canvas = canvas;
  //     if(blendImages['backdrop'].loaded && blendImages['alex-image'].loaded && blendImages['olga-image'].loaded) {
  //     	var $backdrop = $(blendImages['backdrop'].canvas); 
  //     	$('#site-head-content').append($backdrop);
  //     	// $backdrop.blendmode({'mode' : 'hardlight', 'object' : $(blendImages['alex-image'].image), 'scaletofit' : false});
  //     	run1 = true;
  //     }
  //   };
   //  Object.keys(blendImages).map(function(key) {
			// var tmpImg = new Image();
			// tmpImg.crossOrigin = "Anonymous";
   //    tmpImg.onload = imageLoaded;
   //    tmpImg.attributes.id = key;
   //    tmpImg.src = blendImages[key].src;
   //    blendImages[key].image = tmpImg;
   //  })
    
// }) ;
		// $('#sourceimage').blendmode({'mode' : modePresets.options[i].value, 'object' : $('#blendimage'), 'scaletofit' : scale});
	});
	
	$post.each(function () {
		var postText = $(this).html();
		var fa  = [];
		for(var i=0; i < icons.length; i++) {
			fa[i]       = {};
			fa[i].str   = "@"+ icons[i]+ "@";
			fa[i].icon  = icons[i];
			fa[i].int   = postText.search(fa[i].str);

			if(fa[i].int > -1 ) { 
				fa[i].count = postText.match(new RegExp(fa[i].str,"g")).length;
				for(var j=0; j < fa[i].count; j++) {
					$(this).html($(this).html().replace(fa[i].str, "<i class='fa "+fa[i].icon+"'></i>"))
				}
			}
		}
	});

	// // SVGs
 //  var imgURL = 'https://s3-us-west-2.amazonaws.com/schmolga-wedding/adaptive-border.svg';
 //  $.get(imgURL, function(data) {
 //  	$('.flourish').each(function(){
 //    	var $img = $(this);
 //      // Get the SVG tag, ignore the rest
 //      var $svg = $(data).find('svg');
 //      // Remove any invalid XML tags as per http://validator.w3.org
 //      $svg = $svg.removeAttr('xmlns:a');
 //      // Replace image with new SVG
 //      $img.append($svg);
 //     });
 //  }, 'xml');

  // Canvas background
  
  // <img id="olga-image" src="https://s3-us-west-2.amazonaws.com/schmolga-wedding/olga-cutout.png" />
  // <img id="alex-image" src="https://s3-us-west-2.amazonaws.com/schmolga-wedding/alex-cutout.png" />

 //  var canvas = document.getElementById('canvas');
	// var ctx = canvas.getContext('2d');
	// var imgback = document.createElement('img');
	// imgback.setAttribute('id', 'background');
	// imgback.src = "https://s3-us-west-2.amazonaws.com/schmolga-wedding/natural-paper-background-texture-hd-5a0b-2.jpg";
	// var imgalex = document.createElement('img');
	// imgalex.setAttribute('id', 'alex-image');
	// imgalex.src = 'https://s3-us-west-2.amazonaws.com/schmolga-wedding/alex-cutout.png';
	// var imgolga = document.createElement('img');
	// imgolga.setAttribute('id', 'olga-image');
	// imgolga.src = 'https://s3-us-west-2.amazonaws.com/schmolga-wedding/olga-cutout.png';

	// // ctx.globalCompositeOperation = 'source-over';
	// ctx.globalCompositeOperation = 'hard-light';
	// ctx.drawImage(imgback, 0, 0);
	// ctx.drawImage(imgalex, 0, 0);
	// ctx.drawImage(imgolga, 0, 0);

	function thanksForm() {
		var label = $('#bartend > p:first-child');
		label.siblings().hide();
		label.after('<p>Thanks for the information, talk to you soon!</p>');
	}

	// //
	$('#bartend-submit').click(function(e) {
		var var1 = $('input[name="optionsRadios"]:checked').val(),
		    var2 = $('textarea[name="message"]').val(),
		    var3 = $('input[name="name"]').val(),
		    var4 = $('textarea[name="address"]').val();
		e.preventDefault();
		$.ajax({
        url: "https://script.google.com/macros/s/AKfycbwL5Qrk35H76B4RJK0OQO5yzI0ZEFqk8uCauTTopyyB1hT-fWw/exec",
        data: {
        	"Would you sign up for a 30 minute shift as bartender with a partner?" : var1, 
        	"Anything else?" : var2,
        	"What is your name?": var3,
        	"What is your mailing address?": var4
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function (){
            	thanksForm();
                //Success message
            },
            200: function (){
               thanksForm();
                //Success Message
            }
        }
    });
	});

}(jQuery));
