$j(document)
		.ready(
				function() {

					// add arrow if third-level menu exist
					$j(
							'.top_menuv8 > ul > li > ul > li, .top_menuv8 > ul > li > ul > li > ul > li')
							.has('ul').addClass('second_arrow');
					// hide third-level menu and fourth-level menu
					$j(
							'.top_menuv8 > ul > li > ul > li > ul, .top_menuv8 > ul > li > ul > li > ul > li > ul')
							.hide();
					// second-level menu toggle
					$j('.top_menuv8 > ul > li ').hover(function() {
						$j(this).children('ul').show();
						$j(this).children('a').addClass('arrow_down');
					}, function() {
						$j(this).children('ul').hide();
						$j(this).children('a').removeClass('arrow_down');
					});

					// third-level and fourth-level menu toggle
					$j(
							'.top_menuv8 > ul > li > ul > li, .top_menuv8 > ul > li > ul > li > ul > li')
							.hover(function() {
								$j(this).children('ul').show();
							}, function() {
								$j(this).children('ul').hide();
							});
				});
