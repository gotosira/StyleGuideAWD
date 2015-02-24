$j(document).ready(function($j) {
    $j('.pdf-guide .remodal-confirm').click(function() {

        var confirm_button = $j(this);

        // Check in PDF Guide fill out all input         

        var pass_email = false, pass_dropdown = false;

        if($j('#email').val() != "" && $j('.required').val() != ""){
                 confirm_button.empty().append('<div class="loading-svg" alt="Loading icon"></div>');
                 confirm_button.attr('disabled', 'disabled');
                 pass_email = true;
                 pass_dropdown=true;

        }else{
                if($j('#email').val() == ""){
                  $j('#email_form > #email').addClass('alert_pop').attr('placeholder','Please fill out an email adress');
                  pass_email = false;
                }
                if($j('#email_form > .required').val() == ""){
                    $j('#email_form > .required > option:first-child').empty().append('<span class="alert_pop">Please choose your country!</span>');
                    pass_email = false;
                }
        }

        if(pass_email == true && pass_dropdown == true){
            $j.ajax({
                url: "/guide-signup",
                type: 'POST',
                data: $j(".pdf-guide form").serialize(),
                success: function(data) {
                    if (typeof(data.success) != 'undefined') {
                        $j('.pdf-guide form').html('<p>Here\'s the link to <a target="_blank" href="' + data.success + '"><font color="blue"><u>download your guide</u></font></a>.');
                    } else if (typeof(data.error) != 'undefined') {
                        $j('.pdf-guide form').text("There's been an error, please try again");
                        $j('.pdf-guide form').css('color', 'red').fadeIn();
                    } else {
                        $j('.pdf-guide form').text("There's been an error, please try again");
                        $j('.pdf-guide form').css('color', 'red').fadeIn();
                    }
                }
            });
        }else{
            return false;
        }
    });
});
