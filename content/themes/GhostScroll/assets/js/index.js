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

	var options = [
	  'Oksana Ostrovsky',
	  'Sebastian Ostrovsky',
	  'Idris Ostrovsky',
	  'Misha Ostrovsky',
	  'Andrew Ostrovsky',
	  'Mikhail Korol',
	  'Irina Martyanova, Andrew Martyanov, Andrew Martyanov Jr.',
	  'Cathe Muller',
	  'Maria Bush, Tony Bush',
	  'Iryna Larson, Paul Newgard',
	  'Kathy Sanford, Paul Eyestone',
	  'Dmitri Gerasimenko, Jan Adams',
	  'Irina Dobry, Yasha Muchnik',
	  'Yelena Karpuk, Petr Karpuk',
	  'Oksana Shklyanka, Andreas Schmidt',
	  'Linda Sleeper',
	  'Marina Fosnes, Kent Fosnes',
	  'Marina Shipova, Noel Price',
	  'Natalia Ross, Roger Ross',
	  'Sarah Winfield, Jesse Winfield',
	  'Julia Goudie, Denny Goudie',
	  'Ludmila Holmquist, Karl Holmquist',
	  'Anya Talis',
	  'Alex Belokon, Irena Belokon',
	  'Leilani Wood',
	  'Martha Willard, Tom Schmoe',
	  'Jesse Willard, Alix Willard, Owen Willard, Conor Willard',
	  'Ella Willard-Schmoe, Tim Lee',
	  'Kathryn Willard, Chris Willard',
	  'Meghann Wolvert, Lily Wolvert, Aurora Marie Wolvert, Brian Wolvert',
	  'Colin Willard',
	  'Steve Willard, Connie Demey',
	  'Jake Willard, Melanie Lavin',
	  'Sam Willard, Silvia Kovacsova',
	  'Kate Carson, Bob Carson',
	  'Amy Carson',
	  'Jeremy Carson, Felix Carson',
	  'Mike Schmoe, Teresa Schmoe',
	  'Olivia Schmoe, Jon Knitter',
	  'Sarah Schmoe, Mike Stearns',
	  'MiSoon Schmoe',
	  'Tomiko Schmoe',
	  'Liz Wick, Morgan Schmoe, Matt Page',
	  'Ruth Heft',
	  'Rebecca Heft, Nick Reed',
	  'Judy Rudolph',
	  'Dave Rudolph, Colleen Pinckney',
	  'Rick Bergdahl, Sarah Bergdahl',
	  'Janis Pruitt-Hamm, Bruce Pruitt-Hamm',
	  'Mia Arends, Michael Derning',
	  'Tomiko Schmoe ',
	  'Robin Lee Smith',
	  'Julia Bell',
	  'Noha Omar, Javier Tordable',
	  'Sasha Martyanova, J.M. Latronico',
	  'Elliot Watson, Grace Wandell',
	  'Tim Hanlon, Ally Jurkovich',
	  'Joey Roberts, Kate Roberts',
	  'Dan Rogers, Emily Rogers',
	  'Wes Foreman, Christina Hunsberger',
	  'Scott Yee, Lacey Yee',
	  'Jesse Berkowitz, Molly Wlodorzyk',
	  'James Baring',
	  'Christopher Goodman-Smith, Amanda Maud Jones',
	  'Pete Benoit',
	  'Charlie Parr, Jessica Rice',
	  'Ford Kerr',
	  'Heather Manley',
	  'Mary Maloney, Shawn Maloney',
	  'Connor Coombs',
	  'Moriah Grey',
	  'Ryan Schuster, Gaby Schuster',
	  'Megan Reining, Franco Orihuela',
	  'Katie Steffen, Mariano Hernandez Maza',
	  'Ada Mares, Paul Graham',
	  'Carmen Hare, Harold Hare',
	  'Chelsea Maybee, Coleman Maybee',
	  'Hailey Fox, Juan Camps',
	  'Vann Brasher, Naomi Landig',
	  'Holly Faulstich, Mike Parelskin',
	  'Adena Compton, Calvin Compton',
	  'Shane Fallon',
	  'Kate Langton',
	  'Jeff Lyon, Lisa Lyon',
	  'Kevin Herman, Ellen McCormick',
	  'Andrew Wade',
	  'Ben York, Lydia D\'Antona',
	  'Heather Catalano',
	  'Alyna Rogow, Elliot Sanders',
	  'Ashley Skoch',
	  'Michele Frix, Noah Dassel',
	  'Jones Parker, Lisa Beutler',
	  'Alden Parker, Taryn Parker',
	  'Rachael Seno',
	  'Mike Ashton, Kristen Beard',
	  'Larkin VanderHoef, Andrea Lino',
	  'Alex Manno'
	];


	var enterSearchMode = function($form, switchMode) {
		$form.html('');
		$form.off('submit');

		var self = this;
		var $search = $('<input type="text" id="name-search" />');

		var searchSubmit = function(e) {
			e.preventDefault();
			$('.form-alert').remove();
			var value = $search.val().toLowerCase();
			if (value && value.length) {
				var matches = options.filter(function(option) {
					return option.toLowerCase().indexOf(value) !== -1;
				});
			}
			if(!matches.length) {
				$search.after('<p class="form-alert">Sorry couldn\'t find an invite like that</p>');
			} else if(matches.length === 1) {
				$form.off('submit');
				switchMode($form, matches[0], enterSearchMode);
			} else {
				$search.after('<p class="form-alert">Woops, looks like there are a couple invites like that, try being more specific?</p>');
			}
		}

		$form.on('submit', searchSubmit)

		var $submit = $('<a href="#" id="rsvp-search" class="btn">Find RSVP</a>')
			.on('click', searchSubmit);

		$form
			.append('<label class="form-label">Enter the name on your invitation.</label>')
			.append($search)
			.append($submit);

		$search.wrap('<div></div>');
	}


	var enterRsvpMode = function($form, match, switchMode) {
		$form.html('');
		$form.off('submit');

		var self = this;

		var headingText = '';
		var names = match.split(', ').filter(function(name) { return name });
		var i = 1;
		var $inputs = names.map(function(name) {
			if(i > 1) {
				if(i === names.length) {
					headingText += ' and ';
				} else {
					headingText += ', ';
				}
			}
			headingText += name;
			i++;
			return $('<input type="checkbox" checked="checked" name="' + name + '" value="' + name + '"/>');
		});
		var $switch = $('<div class="switch-text" />')
			.append('(Not you? ')
			.append(
				$('<a href="#">Click here</a>')
					.on('click', function(e) {
						e.preventDefault();
						switchMode($form, enterRsvpMode);
					})
			).append(' to find your reservation)');

		// Checkboxes
		var $checkboxes = $('<div class="checkboxes" />')
			.append('<label>Check all that are attending:<label>');
		$inputs.map(function(input) {
			$checkboxes.append(
				$('<label>').append(
					$('<div />').append(input).append(' ' + input[0].name)
				)
			).append($switch);
		});

		// PLus one
		var $plusinput = $('<input type="text" />');
		var $plusinputwrap = $('<div class="guest" />')
			.append('<label class="form-label">Your guest\'s name</label>')
			.append($('<div />').append($plusinput))
			.hide();
		var $plusck3 = $('<label />')
			.append($('<input type="checkbox"/>').on('change', function() {
				$plusinputwrap.toggle();
			})).append(' I promise you\'ll want to feed and meet her/him').hide();
		var $plusck2 = $('<label />')
			.append($('<input type="checkbox"/>').on('change', function() {
				$plusck3.toggle();
			})).append(' For real though I need one, I\'m not just lonely').hide();
		var $plusck1 = $('<label/>')
			.append($('<input type="checkbox"/>').on('change', function() {
				$plusck2.toggle();
			})).append(' I need a plus one');
		var $plusOne = $('<div class="plus-one" />')
			.append($('<div />').append($plusck1))
			.append($('<div />').append($plusck2))
			.append($('<div />').append($plusck3))
			.append($plusinputwrap);

		var $note = $('<textarea name="note" />'); 

		function thanksForm() {
			$form.removeClass('posting');
			var label = $('#rsvp-wrap > p:first-child');
			label.siblings().hide();
			label.after('<p>Thanks for the information, talk to you soon!</p>');
		}

		function submit(e) {
			e.preventDefault();
			$form.addClass('posting');
			var notgoing = [];
			var going = $inputs.filter(function(input) {
				if(!input[0].checked) {
					notgoing.push(input[0].name);
					return false;
				}
				return true;
			}).map(function(input) { 
				return input[0].name 
			});
			$.ajax({
	        url: "https://script.google.com/macros/s/AKfycbwJSoCEJrKTFzCLQqPBiZwWJDqKFASAcF8mU5ClRawACh4Ub_zw/exec",
	        data: {
						"Coming to wedding": going.join(','),
						"Not coming to wedding": notgoing.join(','),
						"Party Count": going.length,
						// "Plus one": '',
						"Notes": $note.val()
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
    }

		var $submit = $('<a href="#" id="rsvp-submit" class="btn">Submit RSVP</a>')
			.on('click', submit);

		$form
			// .append('<h4>RSVP for ' + headingText + '</h4>')
			.append($checkboxes)
			// .append($plusOne)
			.append(
				$('<div class="notewrap" />')
					.append('<label class="form-label">Anything else?</label>')
					.append($note)
				).append($submit);
	};
	

	var theform = $('<form id="rsvp" target="_self" />')

	$('#rsvp-wrap')
		.append('<p>(FYI: this info is only going to us)</p>')
		.append(theform);

	enterSearchMode(theform, enterRsvpMode);

}(jQuery));
