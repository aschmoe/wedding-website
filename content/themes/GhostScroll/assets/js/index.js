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
			$fnav.append("<a class='fn-item' item_index='"+index+"'>"+t+"</a>")
			$(this).parents('article').attr('id',t.toLowerCase().split(' ').join('-'));
			$('.fn-item').click(function () {
				var i = $(this).attr('item_index');
				var s = $(".post[item_index='"+i+"']");

				$('html, body').animate({
					scrollTop: s.offset().top
				}, 400);

			});
		});

		$('.post.last').next('.post-after').hide();
		if($sitehead.length) { 
			$(window).scroll( function () {
				var w = $(window).scrollTop();
				var g = $sitehead.offset().top;
				var h = $sitehead.offset().top + $sitehead.height()-100;
				
				var paralex = 30 + w/13 + "%";
				$sitehead.css("background-position-y", paralex);

				if(w >= g && w<=h) {
					$('.fixed-nav').fadeOut('fast');
				} else if($(window).width()>500) {
					$('.fixed-nav').fadeIn('fast');
				}

				$post.each(function () {
					var f = $(this).offset().top;
					var b = $(this).offset().top + $(this).height();
					var t = $(this).parent('.post-holder').index();
					var i = $(".fn-item[item_index='"+t+"']");
					var a = $(this).parent('.post-holder').prev('.post-holder').find('.post-after');

					$(this).attr('item_index', t);

					if(w >= f && w<=b) {
						i.addClass('active');
						a.fadeOut('slow');
					} else {
						i.removeClass('active');
						a.fadeIn('slow');
					}
				});
			});
		}

		$('ul li').before('<span class="bult fa fa-asterisk icon-asterisk"></span>');
		$('blockquote p').prepend('<span class="quo icon-quote-left"></span>');
		$('blockquote p').append('<span class="quo icon-quote-right"></span>');
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

	function thanksForm() {
		var label = $('#bartend > .form-label:first-child');
		label.siblings().hide();
		label.after('<p>Thanks for your input!</p>');
	}
	
	$('#bartend-submit').click(function(e) {
		console.log('yolo');
		var var1 = $('input[name="optionsRadios"]').val(),
		    var2 = $('textarea[name="message"]').val();
		e.preventDefault();
		$.ajax({
        url: "https://script.google.com/macros/s/AKfycbwL5Qrk35H76B4RJK0OQO5yzI0ZEFqk8uCauTTopyyB1hT-fWw/exec",
        data: {"Sign up for a 30 minute shift as bartender with a partner?" : var1, "Comments" : var2 },
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
