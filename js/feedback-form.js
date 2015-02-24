function getURLParameter(name) {
    return unescape(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}
$j(document).ready(function($j) {

    jQuery('#signup').change(function() {
        if (jQuery(this).is(':checked')) {
            jQuery('select[name="country_of_residence"], select[name="nationality"]').removeAttr('disabled').filter('select[name="country_of_residence"]').focus();
        } else {
            jQuery('select[name="country_of_residence"], select[name="nationality"]').attr('disabled', 'disabled');
        }
    });

    jQuery.validator.addMethod("reCaptcha", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\.\,\-\!\']+ [a-zA-Z0-9\.\,\-\!\']+$/i.test(value);
    }, "Please enter the two words with one space in between");

    jQuery('form#feedback').submit(function() {
        return false;
    });

	jQuery('form#feedback').validate({
	        errorPlacement: function(error, element) {
	            if (jQuery(element[0]).attr('id') == 'recaptcha_response_field') {
	                jQuery('label[for="recaptcha_response_field"]').remove();
	                error.appendTo(jQuery('#recaptcha_container'));
	            } else error.insertAfter(element);
	        },
	        rules: {
	            feedback: "required",
	            name: "required",
	            email: {
	                required: true,
	                email: true
	            },
	            recaptcha_response_field: {
	                required: true,
	                reCaptcha: true
	            }
	        },
	        messages: {
	            email: {
	                required: "Please enter a valid email address."
	            },
	            feedback: {
	                required: "Please enter your feedback."
	            }
	        },
	        submitHandler: function(form) {
	            var xhr;
	            data = 'page=' + escape(jQuery('form#feedback input[name="page"]').val());
	            data += '&feedback=' + escape(jQuery('form#feedback textarea').val());
	            data += '&name=' + escape(jQuery('form#feedback #name').val());
	            data += '&email=' + escape(jQuery('form#feedback #email').val());
	            data += '&g-recaptcha-response=' + jQuery('form#feedback #g-recaptcha-response').val();

	            if (jQuery('form#feedback #signup').is(':checked')) {

	                data += '&signup=' + escape(jQuery('form#feedback #signup').val());

	                if (jQuery('form#feedback #country_of_residence').val() != '') {
	                    data += '&country_of_residence=' + escape(jQuery('form#feedback #country_of_residence').val());
	                }

	                if (jQuery('form#feedback #nationality').val() != '') {
	                    data += '&nationality=' + escape(jQuery('form#feedback #nationality').val());
	                }
	            }



	            var urluse = 'static.asiawebdirect.com';
	            if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

	            //var regex = new RegExp(request.term, 'i');
	            if (xhr) {
	                xhr.abort();
	            }

	            var urluse = 'static.asiawebdirect.com';
	            if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

	            xhr = $j.ajax({
	                url: '//' + urluse + '/v8/js/feedback.php',
	                dataType: 'jsonp',
	                data: {
	                    data: data
	                },
	                cache: false,
	                beforeSend: function() {
					    $j('.feedback .remodal-confirm').empty().append('<div class="loading-svg" alt="Loading icon"></div>');
					    $j('.feedback .remodal-confirm').attr('disabled', 'disabled');
					},
	                success: function(data) {
	                    if (data.result == 'true') {
	                        	$j('form#feedback').fadeOut('1000', function() {
	                            $j(this).parent().hide().append('<h4 class="thankyou">Thanks for your feedback</h4>').fadeIn();
	                            $j('.feedback .remodal-confirm, .feedback .remodal-cancel').remove();
	                            $j('.loading-svg').remove();
	                        });
	                        setTimeout(function() {
	                            location.href = "#";
	                        }, 4000);
	                    } else {

	                    }
	                }
	            });
	        }
	});


    // Check FeedBack Form after clicked!
    $j('.feedback .remodal-confirm').click(function() {

    	event.preventDefault();
        
        $j('form#feedback').submit();

    });


});





