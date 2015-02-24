


$j(document).ready(function() {
    'use strict';
    var ww = document.body.clientWidth;

    if (ww < 768){
        $j('.toggle-search').click(function(){
            if( $j('.search_rate_box').hasClass('open_menu')){
                 $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
            }else{
                $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
            }
        }); 
    }

    // lowest price function
    var lowest_price = function() {
        var i = 0, currency, result, temp_min = 0, arr = [], temp_actual_min;

        $j('.tour_price').each(function() {
            var temp_value = $j(this).find('.tour_price_value').text().replace(/,/g, '');
            arr[i] = parseInt(temp_value);
            currency = $j(this).find('.tour_currency').text();
            if (temp_min === 0 && i === 0){
                temp_min = arr[i];
                temp_actual_min = $j(this).find('.tour_price_value').text();
            } else if ( temp_min > arr[i]) {
                temp_min = arr[i];
                temp_actual_min = $j(this).find('.tour_price_value').text();
            } else {
                // nothing
            }
            i++;
            
        });

        result = temp_actual_min;

    	// if no value => value none
        if (result === 0) {
            result = 'N/A';
            currency = '';
        } 

        // if infinity => value none
        if (result == Infinity){
        	result = '';
        	currency = '';
        }

        // input tour price at the top
        $j('.tourPrice').text(result);
        $j('.tourPrice_currency').text(currency);

    };
    //check lowest price of the page
    lowest_price();


    // ===== HOTEL FINDER FIX ============//


     // Disable input on mobile and desktop
    $j('#checkIn').blur();
    $j('#checkOut').blur();

    $j('#checkOut').prop('disabled', true);


    // Disable input on mobile and desktop for bottom
    $j('#checkIn-bottom').blur();
    $j('#checkOut-bottom').blur();

    $j('#checkOut-bottom').prop('disabled', true);


    /* Calculate Nights */
    var calculate_night = function() {
        var start = $j('#checkIn').datepicker('getDate');
        var end = $j('#checkOut').datepicker('getDate');
        if (!start || !end) {
            return false;
        }
        var nights = (end - start) / 1000 / 60 / 60 / 24;
        if (nights < 1) {
            alert('Please select check-in date.');
            nights = 0;
        }
        $j('.form-night-text').val(nights + ' nights');
    };


    /* =========== Start Date Picker =========== */
    $j.fn.datepicker.defaults.format = 'mm-dd-yyyy';

    var date = new Date();
    date.setDate(date.getDate());

    $j('.input-daterange').datepicker({
        autoclose: true,
        startDate: date,
        forceParse: false
    });

    //temp for user select check in
    var checkInDate = new Date();
    var checkOutDate = new Date();

    var checkin = $j('#checkIn').datepicker({
        // default values
    }).on('show', function() {
        $j('.dropdown-menu').removeClass('checkout_box');
        if (ww < 640) {
            window.scrollTo(0, 0);
            $j('body').bind('touchmove', function(e) {
                e.preventDefault();
            });
            $j('body').addClass('stop-scrolling');
        }
    }).on('changeDate', function(ev) {
        var UserDate = new Date(ev.date);
        checkInDate = UserDate;
        checkInDate.setDate(UserDate.getDate() + 1);
    }).on('hide', function() {
        $j('#checkOut').datepicker('update', checkInDate);
        $j('#checkOut').datepicker('show', function() {
            $j('.dropdown-menu').addClass('checkout_box');
        });
        $j('#checkOut').prop('disabled', false);
        $j('#checkOut')[0].focus();
        var a = $j(this);
        setTimeout(function() {
            a.show();
        }, 1);
    });

    var checkout = $j('#checkOut').datepicker({
        // default values
    }).on('show', function() {
        // change content text
        $j('.dropdown-menu').addClass('checkout_box');
    }).on('changeDate', function(ev) {
        var UserDate = new Date(ev.date);
        checkOutDate = UserDate;
    }).on('hide', function() {
        $j('body').unbind('touchmove');
        $j('body').removeClass('stop-scrolling');
        calculate_night();
        var a = $j(this);
        setTimeout(function() {
            a.show();
        }, 1);
    });

    /* =========== End Date Picker =========== */




    /* =========== Start Date Picker For Bottom =========== */

    // set input to new name at bottom
    $j('.hotelSearchBottom').find('input').attr('name','check-in-date-bottom');

     /* Calculate Nights for Bottom */
    var calculate_night_bottom = function() {
        var start = $j('#checkIn-bottom').datepicker('getDate');
        var end = $j('#checkOut-bottom').datepicker('getDate');
        if (!start || !end) {
            return false;
        }
        var nights = (end - start) / 1000 / 60 / 60 / 24;
        if (nights < 1) {
            alert('Please select check-in date.');
            nights = 0;
        }
        $j('.form-night-text-bottom').val(nights + ' nights');
    };

    /* =========== Start Date Picker =========== */
    $j.fn.datepicker.defaults.format = 'mm-dd-yyyy';

    var date_bottom = new Date();
    date_bottom.setDate(date_bottom.getDate());

    $j('#checkIn-bottom, #checkOut-bottom').datepicker({
        autoclose: true,
        startDate: date_bottom,
        forceParse: false,
    });

    //temp for user select check in
    var checkInDate_bottom = new Date();
    var checkOutDate_bottom = new Date();

    var checkin_bottom = $j('#checkIn-bottom').datepicker({
        // default values
    }).on('show', function() {
        $j('.dropdown-menu').removeClass('checkout_box');
        if (ww < 640) {
            window.scrollTo(0, 0);
            $j('body').bind('touchmove', function(e) {
                e.preventDefault();
            });
            $j('body').addClass('stop-scrolling');
        }
    }).on('changeDate', function(ev) {
        var UserDate_bottom = new Date(ev.date);
        checkInDate_bottom = UserDate_bottom;
        checkInDate_bottom.setDate(UserDate_bottom.getDate() + 1);
    }).on('hide', function() {
        $j('#checkOut-bottom').datepicker('update', checkInDate_bottom);
        $j('#checkOut-bottom').datepicker('show', function() {
            $j('.dropdown-menu').addClass('checkout_box');
        });
        $j('#checkOut-bottom').prop('disabled', false);
        $j('#checkOut-bottom')[0].focus();
        var a = $j(this);
        setTimeout(function() {
            a.show();
        }, 1);
    });

    var checkout_bottom = $j('#checkOut-bottom').datepicker({
        // default values
    }).on('show', function() {
        // change content text
        $j('.dropdown-menu').addClass('checkout_box');
    }).on('changeDate', function(ev) {
        var UserDate_bottom = new Date(ev.date);
        checkOutDate_bottom = UserDate_bottom;
    }).on('hide', function() {
        $j('body').unbind('touchmove');
        $j('body').removeClass('stop-scrolling');
        calculate_night_bottom();
        var a = $j(this);
        setTimeout(function() {
            a.show();
        }, 1);
    });

    /* =========== End Date Picker =========== */
















    $j('input[readonly]').on('focus', function(ev) {
        $j(this).trigger('blur');
    });



    // Hide Calendar Menus on first load
    $j('.dropdown-menu').css('display', 'none');



    if ($j('.search_index').length > 0) {
        $j('.top_bg').find('img').addClass('active_search');
    } else {
        // do nothing
    }

    //----- Read more function ------ ///   
    var num_toggle_content = 0;
    var temp = 'readmore_checkbox' + num_toggle_content;
    var div_num = 'readmore_btn' + num_toggle_content;

    $j('.toggle_content').each(function() {
        var height = $j(this).next().find('p').height();
        var p_count = $j(this).next().find('p').length;
        if (height <= 54 && p_count <= 1) {
            // doesn't show readmore
        } else {
            $j(this).attr('id', temp);
            $j(this).next().attr('id', div_num);
            $j(this).next().after('<label for='+temp+' class="readmore_check closed_schedule">Read More</label>');
            num_toggle_content = num_toggle_content + 1;
            div_num = 'readmore_btn' + num_toggle_content;
            temp = 'readmore_checkbox' + num_toggle_content;
        }
    });

    //----- END Read more function ------ ///   



    // Change Arrow + Read More + Hide
    $j('label.readmore_check').click(function() {
        if ($j(this).hasClass('closed_schedule')) {
            $j(this).removeClass('closed_schedule');
            $j(this).addClass('open_schedule');
            $j(this).text('Hide');
        } else {
            $j(this).removeClass('open_schedule');
            $j(this).addClass('closed_schedule');
            $j(this).text('Read More');

        }
    });


    $j('.menu_over li a').each(function() {
        if ($j(this).next().length > 0) {
            $j(this).addClass('parent');
        }
    });

    $j('.toggleMenu').click(function() {
        e.preventDefault();
        $j(this).toggleClass('active');
        $j('.menu_over').toggle();
    });

});

var adjustMenu = function() {
	'use strict';
	var ww = document.body.clientWidth;

    if (ww <= 1023) {

        $j('.search_index .top_bg > img').addClass('blur_img').removeClass('no_blur');
        if (ww >= 640 && ww <= 767) {
            $j('.destination_title').css('display', 'none');
        } else {
            $j('.destination_title').css('visibility', 'hidden');
        }

    } else if (ww >= 1024) {

        $j('.search_index .top_bg img').removeClass('no_blur');

        if ($j('body').hasClass('tour-page-detail')) {
            $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
        } else {
            $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
        }

        $j('.rate_title').show();

        $j('.main_wrapper').removeClass('push_right');
        $j('.sub_menu').removeClass('reveal');
        $j('.search_wrap').show();
        $j('.toggleMenu').css('display', 'none');
        $j('.menu_over').show();
    }

    if (ww >= 768) {
        $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
    }


    // Side mobile menu fixed height
    if (ww <= 768) {

        $j('nav#main-nav').addClass('mobile-menu');
        /*
        $j('.toggle-search').click(function() {

            if ($j('.search_rate_box').hasClass('closed_menu')) {
                $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
            } else {
                if ($j('.search_rate_box').hasClass('open_menu')) {
                    $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
                }
                //     $j('.search_rate_box').removeClass('open_menu'); 
                //    $j('.search_rate_box').addClass('closed_menu'); 
                $j('.search_rate_box').find('rate_title').show();
            }
        });
*/


    } else {
        $j('nav#main-nav').removeClass('mobile-menu');
        /*
        if ($j('.search_rate_box').hasClass('closed_menu')) {
            $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
        }
        */
    }


    if (ww < 1023) {
        $j('.search_cover').addClass('search_hide');
        check_responsive(ww);
        $j('.menu_over li').removeClass('hover');
        $j('.menu_over li').addClass('mobile');
        $j('.menu_over li').unbind('mouseenter mouseleave');
        $j('.menu_over li a.parent').bind('click', function(event) {
            // must be attached to anchor element to prevent bubbling
            event.preventDefault();
            //Toggle Hover and Active
            $j(this).parent('li').toggleClass('hover');
            // remove hover class from 2nd levels menu 
            if (!$j(this).parent('li').hasClass('hover')) {
                $j(this).next().find('li').removeClass('hover active');
            }
        });

        
        $j('.menu_over li a').click(function() {
            /* exit */
            if($j(this).parent().hasClass('active') && $j(this).parent().parent().hasClass('menu_over')){
                $j('.menu_over > li').show();
                $j('.menu_over').find('li').removeClass('active');
            }else if($j(this).parent().hasClass('active') && $j(this).parent().parent().parent().parent().hasClass('menu_over')){
                $j('.menu_over > li > li').show();
                $j(this).parent().parent().parent().addClass('active');
            }else{
                $j('.menu_over li').removeClass('active');
                $j(this).parent('li').addClass('active');
                /* first level check */
                if($j(this).parent().parent().hasClass('menu_over')){
                    $j('.menu_over > li:not(".hover")').hide();
                    $j('.menu_over > li:first-child').show();
                } 
                /* second level check */
                if($j(this).parent().parent().parent().hasClass('menu_over')){
                    $j('.menu_over > li > li:not(".hover")').hide();
                    $j('.menu_over > li:first-child').show();
                }

               

            }
            
        });

       

        $j('#main-nav-check').change(function() {



            
            window.scrollTo(0, 0);
            if ($j(this).prop('checked')) {
                //checked
                $j('.gssb_c').hide();
                //$j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
                $j('.search_index .top_bg img').addClass('no_blur').removeClass('blur_img');
            } else {
                // not checked
             //   $j('.toggle-menu').replaceWith('<label for="main-nav-check" class="toggle - menu"></label>');
                $j('.site_logo').removeClass('has_Scrolled');
                $j('.gssb_c').show();
                $j('.search_index .top_bg img').addClass('blur_img').removeClass('no_blur');
                var ww = document.body.clientWidth;
                if (ww >= 768) {
                    $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
                }
            }
        });

        /* SEE ALL FUNCTION 
        $j('ul.menu_over > li').click(function() {
            // Store 'href' from parent
            var see_all_href = $j(this).children('.parent').attr('href');
            var parent_node = $j(this).children('.parent').text();

            // Check if already has 'See All'
            if (!$j(this).find('ul').children('li:last-child').hasClass('see_all')) {
                // Append 'See All' from 'href' of parent
                $j(this).find('ul').append('<li class="mobile see_all"><a href=' + see_all_href + '>See All ' + parent_node + '</a></li>');
            }
        });

        */
    }

    /*
    if (ww >= 768 && ww < 1023) {
        search_cross();
        $j('.search_rate_box').addClass('open_menu').removeClass('closed_menu');

    }*/

};




var ShowHideDesktopSearch = function() {
    // Show and Hide Search for Desktop View 
    $j(document).click(function(e) {
        var target = e.target;
        if (!$j(target).is('.search_cover') && !$j(target).is('.gsc-input')) {
            $j('.search_cover').removeClass('active');
            $j('.gsc-input').hide();
            $j('.gsc-completion-container').hide();
            $j('.search_cover').removeClass('search_cover_holder_off');

        } else {
            $j('.search_cover').addClass('active');
            $j('.gsc-input').show();
            $j('.gsc-input').focus();
            $j('.gsc-completion-container').show();
            $j('.search_cover').addClass('search_cover_holder_off');
        }
    });
};

/*
            var search_cross = function() {

               // $j('.search_cover').hide();

                $j('.toggle-search').click(function() {
                    $j('.toggle-search').toggleClass('cross');
                    window.scrollTo(0, 0);
                    if($j('.search_cover').hasClass('search_show')){
                      $j('.search_cover').addClass('search_hide').removeClass('search_show');
                    }else{
                      $j('.search_cover').addClass('search_show').removeClass('search_hide');
                    }
                    $j('.top_ten_title').fadeToggle();
                    if ($j('.top_bg').find('img.top_bg_img').hasClass('active_search')) {
                        $j('.top_bg').find('img.top_bg_img').removeClass('active_search');
            $j('body').removeClass('stop-scrolling');
                    } else {
                        $j('.top_bg').find('img.top_bg_img').addClass('active_search');
            $j('body').addClass('stop-scrolling');
                    }

                });

            }
            */


var check_responsive = function(ww) {

    wrap_toggle_search();

    if (ww < 768) {
        if ($j('.toggle-search').data('clicked')) {
            // do nothing
            alert('test');
        } else {
            hideMenu();
        }
       // $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
        $j('.toggle-search').removeClass('cross');
    }
    if (ww > 1023) {
        //$j('.search_cover').css('display','block');
        $j('.toggle-search').removeClass('cross');
        $j('.menu_over li').removeClass('mobile');

        $j('.menu_over li').unbind('click');
        $j('.menu_over li a.parent').unbind('click');
        // $j('.menu_over li a.parent').unbind(event);

        $j('.menu_over li').bind('mouseenter', function() {
            $j(this).addClass('hover');
        });
        $j('.menu_over li').bind('mouseleave', function() {
            $j(this).removeClass('hover');
        });
    } else {
        // $j('.search_cover').css('display','none');
    }
    /*
    if (ww >= 768 && ww < 1023) {
        search_cross();
    }
    else{
        $j('.search_cover').removeClass('search_show search_hide');
    }
    */

};




// -- Check and Refunction when resizing windows --- //
$j(window).bind('resize', function() {
    var ww = document.body.clientWidth;

    //check_responsive(ww);
    if (ww > 768) {
        check_responsive(ww);
        $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
    }

/*
    if (ww < 768) {
        check_responsive(ww);
        //$j('.search_cover').css('display','none');
        $j('.toggle-search').removeClass('cross');
        $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
    } else {
        $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');

    }
*/
    if (ww < 1023) {
        $j('.search_cover').addClass('search_hide');
        check_responsive(ww);
        $j('.menu_over li').removeClass('hover');
        $j('.menu_over li').addClass('mobile');
        $j('.menu_over li').unbind('mouseenter mouseleave');
        $j('.menu_over li a.parent').bind('click', function(event) {
            // must be attached to anchor element to prevent bubbling
            event.preventDefault();
            //Toggle Hover and Active
            $j(this).parent('li').toggleClass('hover');
            // remove hover class from 2nd levels menu 
            if (!$j(this).parent('li').hasClass('hover')) {
                $j(this).next().find('li').removeClass('hover active');
            }
        });
        $j('.menu_over li a').click(function() {
            $j('.menu_over li').removeClass('active');
            $j(this).parent('li').addClass('active');
        });
        /*
        $j('li > a.parent').click(function() {
            var $temp_this = $j(this).parent();
            $j(this).parent().parent().find('li:not($temp_this)').hide();
        });
        */

        $j('#main-nav-check').change(function() {
            window.scrollTo(0, 0);
            if ($j(this).prop('checked')) {
                //checked
                $j('.gssb_c').hide();
               // $j('.search_rate_box').removeClass('open_menu').addClass('closed_menu');
                $j('.search_index .top_bg img').addClass('no_blur').removeClass('blur_img');
            } else {
                // not checked
                $j('.toggle-menu').replaceWith('<label for="main-nav-check" class="toggle-menu"></label>');
                $j('.site_logo').removeClass('has_Scrolled');
                $j('.gssb_c').show();
                $j('.search_index .top_bg img').addClass('blur_img').removeClass('no_blur');
                var ww = document.body.clientWidth;
              //  if (ww >= 768) {
              //      $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
              //  }
            }
        });
        /* SEE ALL FUNCTION
        $j('ul.menu_over > li').click(function() {
            // Store 'href' from parent
            var see_all_href = $j(this).children('.parent').attr('href');
            var parent_node = $j(this).children('.parent').text();

            // Check if already has 'See All'
            if (!$j(this).find('ul').children('li:last-child').hasClass('see_all')) {
                // Append 'See All' from 'href' of parent
                $j(this).find('ul').append('<li class="mobile see_all"><a href=' + see_all_href + '>See All ' + parent_node + '</a></li>');
            }
        });
        */
    } else {
        check_responsive(ww);
        $j('.search_cover').addClass('search_show').removeClass('search_hide');
        $j('.menu_over li').removeClass('mobile');

        $j('.menu_over li').unbind('click');
        $j('.menu_over li a.parent').unbind('click');
        // $j('.menu_over li a.parent').unbind(event);

        $j('.menu_over li').bind('mouseenter', function() {
            $j(this).addClass('hover');
        });
        $j('.menu_over li').bind('mouseleave', function() {
            $j(this).removeClass('hover');
        });
    }
});



function location_complete() {

    $j.widget('custom.catcomplete', $j.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu('option', 'items', '> :not(.ui-autocomplete-category)');
        },
        _renderMenu: function(ul, items) {
            var that = this,
                currentCategory = '';
            $j.each(items, function(index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append('<li class="ui-autocomplete-category">' + item.category + '</li>');
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr('aria-label', item.category + ' : ' + item.label);
                }
            });
        }
    });

    $j('.form-field').click(function() {

        var xhr;
        $j('.form-field').catcomplete({
            delay: 0,
            source: function(request, response) {
                var regex = new RegExp(request.term, 'i');
                if (xhr) {
                    xhr.abort();
                }

                var urluse = 'static.asiawebdirect.com';
                if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

                xhr = $j.ajax({
                    url: '//' + urluse + '/v8/js/popular.php',
                    dataType: 'jsonp',
                    data: {
                        destid: $j('.form-field').attr('data-id')
                    },
                    cache: false,
                    success: function(data) {
                        response($j.map(data.list, function(item) {
                            if (regex.test(item.label)) {
                                return {
                                    label: item.label,
                                    category: item.category
                                };
                            }
                        }));

                    }
                });
            },
            minLength: 0
        }).keyup(function() {
            $j('.form-field').catcomplete({
                source: function(request, response) {
                    var regex = new RegExp(request.term, 'i');
                    if (xhr) {
                        xhr.abort();
                    }

                    var urluse = 'static.asiawebdirect.com';
                    if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

                    xhr = $j.ajax({
                        url: '//' + urluse + '/v8/js/hotel.php',
                        dataType: 'jsonp',
                        data: {
                            destid: $j('.form-field').attr('data-id'),
                            destname: $j('.form-field').attr('data-name'),
                            destpath: $j('.form-field').attr('data-path'),
                            sname: $j('.form-field').val()
                        },
                        cache: false,
                        success: function(data) {
                            response($j.map(data.list, function(item) {
                                if (regex.test(item.label)) {
                                    return {
                                        label: item.label,
                                        category: item.category
                                    };
                                }
                            }));

                        }
                    });
                },
                delay: 10,
                minLength: 3
            });
        });


        $j('.form-field').catcomplete('search', '');

        var ww = document.body.clientWidth;
        if (ww < 768) {
            $j('body').addClass('stop-scrolling');
        }

    });

    // Form field for bottom

    $j('.form-field-bottom').click(function() {

        var xhr;
        $j('.form-field-bottom').catcomplete({
            delay: 0,
            source: function(request, response) {
                var regex = new RegExp(request.term, 'i');
                if (xhr) {
                    xhr.abort();
                }

                var urluse = 'static.asiawebdirect.com';
                if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

                xhr = $j.ajax({
                    url: '//' + urluse + '/v8/js/popular.php',
                    dataType: 'jsonp',
                    data: {
                        destid: $j('.form-field-bottom').attr('data-id')
                    },
                    cache: false,
                    success: function(data) {
                        response($j.map(data.list, function(item) {
                            if (regex.test(item.label)) {
                                return {
                                    label: item.label,
                                    category: item.category
                                };
                            }
                        }));

                    }
                });
            },
            minLength: 0
        }).keyup(function() {
            $j('.form-field-bottom').catcomplete({
                source: function(request, response) {
                    var regex = new RegExp(request.term, 'i');
                    if (xhr) {
                        xhr.abort();
                    }

                    var urluse = 'static.asiawebdirect.com';
                    if (document.location.hostname.indexOf('1') != -1) urluse = document.location.hostname;

                    xhr = $j.ajax({
                        url: '//' + urluse + '/v8/js/hotel.php',
                        dataType: 'jsonp',
                        data: {
                            destid: $j('.form-field-bottom').attr('data-id'),
                            destname: $j('.form-field-bottom').attr('data-name'),
                            destpath: $j('.form-field-bottom').attr('data-path'),
                            sname: $j('.form-field-bottom').val()
                        },
                        cache: false,
                        success: function(data) {
                            response($j.map(data.list, function(item) {
                                if (regex.test(item.label)) {
                                    return {
                                        label: item.label,
                                        category: item.category
                                    };
                                }
                            }));

                        }
                    });
                },
                delay: 10,
                minLength: 3
            });
        });


        $j('.form-field-bottom').catcomplete('search', '');

        var ww = document.body.clientWidth;
            if (ww < 768) {
                $j('body').addClass('stop-scrolling');
            }
    });


}

function hideMenu() {
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 200;
    var navbarHeight = $j('header').outerHeight();

    var mql = window.matchMedia("(orientation: portrait)");

                if(mql.matches) {  
                    // if portrait
                    $j('.search_rate_box').removeClass("open_menu").addClass('closed_menu');
                }
                else{
                    // if landscape
                    $j('.search_rate_box').removeClass("open_menu").addClass('closed_menu');
                }

    $j(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $j(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is 'behind' the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $j('header').removeClass('nav-header-down').addClass('nav-header-up');
            $j('.toggle-search').removeClass('nav-toggle-search-down').addClass('nav-toggle-search-up');
            $j('.datepicker').css('display', 'none');
        } else {
            // Scroll Up
            if (st + $j(window).height() < $j(document).height()) {
                $j('header').removeClass('nav-header-up').addClass('nav-header-down');
                if (ww >= 768) {
                    $j('.toggle-search').removeClass('nav-toggle-search-down').addClass('nav-toggle-search-up');
                } else {
                    $j('.toggle-search').removeClass('nav-toggle-search-up').addClass('nav-toggle-search-down');
                }
            }
        }

        lastScrollTop = st;
    }

}

function portalOpenPageSearch() {
    var cSend = '';
    var a = null;
    a = $j('.form-container .form-check-in');
    if (a != null) {
        if ((a.val() != '') && (a.val() != 'Check-In')) {
            var b = '';
            b = a.val();
            var c = b.split('-');
            if (c.length == 3) {
                cSend = 'mtxCheckIn=' + c[2] + c[0] + c[1];
            }
        }
    }

    a = $j('.form-container .form-check-out');
    if (a != null) {
        if ((a.val() != '') && (a.val() != 'Check-Out')) {
            var b = '';
            b = a.val();
            var c = b.split('-');
            if (c.length == 3) {
                if (cSend != '') cSend = cSend + '&';
                cSend = cSend + 'mtxCheckOut=' + c[2] + c[0] + c[1];
            }
        }
    }

    var checkError = true;
    a = $j('.form-container .form-field');
    if (a != null) {
        if ((a.val() != '') && (a.val() != '')) {
            checkError = false;
            if (cSend != '') cSend = cSend + '&';
            cSend = cSend + 'q=' + a.val();
        }
    }

    if (checkError == true) {
        alert('Please input search');
        return false;
    }
    var url = 'http://www.asiawebdirect.com/freetextsearch/?version=2.2&start=0&rows=10&indent=on&wt=json';
    if (cSend != '') url = url + '&' + cSend;
    window.open(url);
}


function portalOpenPageSearchBottom() {
    var cSend = '';
    var a = null;
    a = $j('.form-container-bottom .form-check-in');
    if (a != null) {
        if ((a.val() != '') && (a.val() != 'Check-In')) {
            var b = '';
            b = a.val();
            var c = b.split('-');
            if (c.length == 3) {
                cSend = 'mtxCheckIn=' + c[2] + c[0] + c[1];
            }
        }
    }

    a = $j('.form-container-bottom .form-check-out');
    if (a != null) {
        if ((a.val() != '') && (a.val() != 'Check-Out')) {
            var b = '';
            b = a.val();
            var c = b.split('-');
            if (c.length == 3) {
                if (cSend != '') cSend = cSend + '&';
                cSend = cSend + 'mtxCheckOut=' + c[2] + c[0] + c[1];
            }
        }
    }

    var checkError = true;
    a = $j('.form-container-bottom .form-field-bottom');
    if (a != null) {
        if ((a.val() != '') && (a.val() != '')) {
            checkError = false;
            if (cSend != '') cSend = cSend + '&';
            cSend = cSend + 'q=' + a.val();
        }
    }

    if (checkError == true) {
        alert('Please input search');
        return false;
    }
    var url = 'http://www.asiawebdirect.com/freetextsearch/?version=2.2&start=0&rows=10&indent=on&wt=json';
    if (cSend != '') url = url + '&' + cSend;
    window.open(url);
}

$j(document).ready(function() {

     
    $j('.mobileCallmeBig').addClass('animated bounceInUp');
    $j('.mobileCallmeSmall').addClass('animated bounceInUp');

    $j('.toggle-menu').click(function() {
       if ($j('.mobileCallmeBig').hasClass('bounceInUp')) {
           $j('.mobileCallmeBig').removeClass('bounceInUp').addClass('bounceOutDown');
           $j('.mobileCallmeSmall').removeClass('bounceInUp').addClass('bounceOutDown');
       }else{

           $j('.mobileCallmeBig').removeClass('bounceOutDown').addClass('bounceInUp');
           $j('.mobileCallmeSmall').removeClass('bounceOutDown').addClass('bounceInUp');
       }

   });


    var ww = document.body.clientWidth;
    // Initatilize function when page loads
    // if (ww >= 768 && ww <= 1023) {
    //    $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
    //}


    $j('.form-field').click(function() {
        $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
     });

    wrap_toggle_search();

    // Hotel Search Button Function for Top
    $j('.form-container .searchButton').click(function() {
        portalOpenPageSearch();
    });

    // Hotel Search Button Function for Bottom
    $j('.form-container-bottom .searchButton').click(function(){
        portalOpenPageSearchBottom();
    });

    $j('.top_menu > ul > li').hover(function() {
        $j(this).find('ul').show();
        $j(this).addClass('arrow_down');
    }, function() {
        $j(this).find('ul').hide();
        $j(this).removeClass('arrow_down');
    });


    adjustMenu();

    $j('.send_feed').click(function() {
        window.scrollTo(0, 0);
    });

    if (ww <= 640) {
        $j('.remodal-confirm').remove();
        $j('.remodal-cancel').before('<input class="remodal-confirm" type="submit " value="submit"></input>');

    }

   
    
       $j('.pdf_sticky').hover(function() {
          $j('.sticky_wrapper').addClass('slide_out');
        }, function() {
            $j('.sticky_wrapper').removeClass('slide_out');
        });
    /*
    $j('.sticky_wrapper').hover(function() {
        $j(this).addClass('slide_out');
    }, function() {
        $j(this).removeClass('slide_out');
    });*/


    if (ww > 1023) {
      // Suggestion when click on hotel and area search
      location_complete();
    }

    if (ww < 768) {
        if ($j('.toggle-search').data('clicked')) {
            // do nothing
            alert('test');
        } else {
            hideMenu();
        }
    }
    // prevent dragging hero image
    $j('img.top_bg_img').on('dragstart', function(event) {
        event.preventDefault();
    });

    // Enable top search active if it is a search page, and hide when it is not.
    if ($j('body').hasClass('search_index')) {
        $j('.search_cover').addClass('active');
    } else {
        ShowHideDesktopSearch();
    }

    // first check screensize
    check_responsive(ww);



    // Add Calendar check-in and check-out
    $j('.dropdown-menu').addClass('dropdown-first');
    $j('.dropdown-menu').next().addClass('dropdown-second');

    // remove stop scroll after focus out of form-field
    $j('.form-field').on('blur', function() {
        $j('body').removeClass('stop-scrolling');
        $j('.search_rate_box').removeClass('closed_menu').addClass('open_menu');
    });
    
    // Test if adBlock running
    TestBlocked();

    // tour conditions toggle
    $j('div.toggle-heading').click(function(){
        $j(this).next().slideToggle('fast');
        return false;
    });


    //map_function();

});

    // Test adBlock running
    function TestBlocked() {
        if ($j('#div-gpt-ad-1414118221795-0, #div-gpt-ad-1414118488005-0, #div-gpt-ad-1414118583001-0, #div-gpt-ad-1412304856582-0, #div-gpt-ad-1412304856582-0, #div-gpt-ad-1414118221795-0, #div-gpt-ad-1414118488005-0, #div-gpt-ad-1414118583001-0').css('display') == 'none'){
            $j('#div-gpt-ad-1414118221795-0, #div-gpt-ad-1414118488005-0, #div-gpt-ad-1414118583001-0, #div-gpt-ad-1412304856582-0, #div-gpt-ad-1414118221795-0, #div-gpt-ad-1414118488005-0, #div-gpt-ad-1414118583001-0').parent().addClass('display_block');
            $j('#div-gpt-ad-1412304856582-0').parent().addClass('display_blocked_recommend');
        }
    }

var wrap_toggle_search = function() {
    var ww = document.body.clientWidth;
    if (ww >= 768 && ww <= 1023) {
        if ($j('.toggle-search').closest('a').length) {
            // do nothing
        } else {
            $j('.toggle-search').wrap('<a class="toggle-wrapper" href="/search/index.html" ></a>');
        }
    } else {
        $j('.toggle-wrapper > .toggle-search').unwrap();
    }
}

/*
var map_function = function(){
        var count = 0;

        $j('.listing-wrapper').each(function(){
            count++;
            $(this).find('.map-icon-wrapper').attr('id',count);

        });

}
   */          
    


 
