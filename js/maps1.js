var _hotel_map;
//temporary first check
var first_open = true;



if (typeof(VERBOSITY_PORTAL_SHOW_LANDMARK_ON_MAP) != "undefined") {

    _LISTING_ITEM_MAP_PARAMS_ = {
        "verbosity": VERBOSITY_PORTAL_SHOW_LANDMARK_ON_MAP,
        "mapType": "Map",
        "init": function(m) {
            m.loadLocationsCloseToLocation(47289, 4, 500, 16);
        }
    };



    function _getPara($element) {
        return $element.closest('.content-listing-item, .content-listing-item-featured, .content-listing-item-highlight, .listing-wrapper');
    }

    function _setLandmarkId(locationId) {
        _LISTING_ITEM_MAP_PARAMS_.init = function(m) {
            m.loadLocationsCloseToLocation(locationId, 4, 500, 16);
        };
    }

    var create_map = function(obj) {
        if (typeof(obj) != "undefined") {
            $element = obj;
            $para = _getPara($element);

            locationId = $element.attr('data-locationId');
            divId = $element.attr('data-id');
            _setLandmarkId(locationId);
            $j('<div id="_map_container_' + divId + '" class="mapLoading" style="height:500px;"> </div>')
                .hide()
                .appendTo($j('#map' + divId))
                .show(function() {
                    _hotelMap = new HotelMap($j('#_map_container_' + divId)[0], _LISTING_ITEM_MAP_PARAMS_);
                });
        }
    };

    var create_map_init = function(obj) {
        if (typeof(obj) != "undefined") {
            $element = $j(obj);
            var temp_map_name, h4_value, n = 1,
                temp_map_name_func, a = $j('.content-map').length,
                arr_head = [];

            $j('.content-map').each(function() {
                //temp_map_name = 'map' + n;
                //$j(this).attr('id', temp_map_name);
                h4_value = $j(this).parent().find('h4.header-listing').eq(0).text();
                arr_head.push(h4_value);
                //n = n + 1;
            });
        }
    };

    // ------ Toggle Maps --- //
    var ww = document.body.clientWidth;
    var runinitcreate_map = false;

    if (ww < 768) {
        $j('.map-icon-wrapper').next().next().css({
            'width': '100%',
            'height': '800px'
        });
    } else {
        $j('.map-icon-wrapper').next().next().css({
            'width': '100%',
            'height': '500px'
        });
    }

    $j(document).ready(function() {

        var count = 0;

        //$j('#social, #fb-root').remove();

        $j('.listing-wrapper').each(function() {
            count++;
            $j(this).find('.map-icon-wrapper').attr('data-count', count);
            $j(this).find('.content-map').attr('data-count', count);
        });

        $j('.content_listing_large').each(function() {
            count++;
            $j(this).find('.map-icon-wrapper').attr('data-count', count);
            $j(this).find('.content-map').attr('data-count', count);
        });

        $j('.map-icon-wrapper').click(function() {

            if ($j(this).data('count') === $j(this).parent().find('.content-map').data('count')) {

                $j(this).parent().find('.content-map').toggleClass('open_map').addClass('animated fadeIn');
                $j(this).toggleClass('google_icn_open');
                var $listing_img_fix = $j(this).parent().prev().find('img');
                var $h4_title = $j(this).parent().find('h4');
                var $star_title = $j(this).parent().find('h4').next();
                var $listing_title = $j(this).parent().find('p.listing');
                var $listing_detail = $j(this).prev();
                var $map_icn_click = $j(this);
            }

            if ($j(this).data('count') === $j(this).parent().parent().find('.content-map').data('count')) {

                $j(this).parent().parent().find('.content-map').toggleClass('open_map').addClass('animated fadeIn');
                $j(this).toggleClass('google_icn_open');
                var $listing_img_fix = $j(this).parent().parent().prev().find('img');
                var $h4_title = $j(this).parent().parent().find('h4');
                var $star_title = $j(this).parent().parent().find('h4').next();
                var $listing_title = $j(this).parent().parent().find('p.listing');
                var $listing_detail = $j(this).prev();
                var $map_icn_click = $j(this);
            }

            if (ww <= 768) {

                if (!$map_icn_click.hasClass('fix_icn')) {

                    // first check
                    if ($j('header').hasClass('nav-header-up') || $j('header').hasClass('nav-header-down')) {
                        // add fix
                        $j('header').addClass('nav-header-fix');
                        $j('.toggle-search').addClass('nav-toggle-fix');
                        $j('header').removeClass('nav-header-down nav-header-up');
                        $j('.toggle-search').removeClass('nav-toggle-search-down nav-toggle-search-up');
                    }


                    $map_icn_click.addClass('fix_icn').addClass('animated fadeInUp');
                    $h4_title.addClass('fix_h4').addClass('animated fadeInDown');
                    $star_title.addClass('fix_star').addClass('animated fadeInDown');
                    $listing_title.addClass('fix_listing').addClass('animated fadeInDown');
                    $listing_img_fix.addClass('listing_img_fix');
                    $j('header').addClass('dark');
                    if ($j('body').hasClass('story-page')) {
                        $listing_detail.parent().addClass('fix_listing_detail').addClass('animated fadeInDown');
                    } else {
                        $listing_detail.addClass('fix_listing_detail').addClass('animated fadeInDown');
                    }
                } else {

                    if ($j('header').hasClass('nav-header-fix')) {
                        $j('header').removeClass('nav-header-fix');
                        $j('.toggle-search').removeClass('nav-toggle-fix');
                    }

                    $map_icn_click.removeClass('animated fadeInUp fix_icn');
                    $h4_title.removeClass('animated fadeInDown fix_h4');
                    $star_title.removeClass('animated fadeInDown fix_star');

                    $listing_title.removeClass('animated fadeInDown fix_listing');
                    $listing_img_fix.removeClass('listing_img_fix');
                    $j('header').removeClass('dark');
                    if ($j('body').hasClass('story-page')) {
                        $listing_detail.parent().removeClass('fix_listing_detail');
                    } else {
                        $listing_detail.removeClass('fix_listing_detail');
                    }
                }
            }



            if ($j(this).parent().parent().find('.content-map').hasClass('open_map')) {
                create_map($j(this));
            } else {
                $j(this).parent().parent().find('.mapLoading').remove();
            }

            if ($j(this).parent().find('.content-map').hasClass('open_map')) {
                create_map($j(this));
            } else {
                $j(this).parent().find('.mapLoading').remove();
            }



        });

        if (ww >= 768) {

            $j('.map-icon-wrapper').each(function() {

                if ($j(this).attr('data-preopen') == "yes") {
                    //$j(this).addClass('google_icn_open');
                    //$j(this).parent().next().next().addClass('open_map animated fadeIn');
                    var map_number = 0;

                    if ($j(this).parent().parent().hasClass('listing-wrapper')) {
                        // Get Map ID to compare with button
                        map_number = $j(this).parent().parent().find('.content-map').data('count');

                    }


                    if ($j(this).parent().parent().hasClass('content_listing_large')) {
                        // Get Map ID to compare with button (for 2 column)
                        map_number = $j(this).parent().parent().find('.content-map').data('count');
                    }

                    if ($j(this).parent().hasClass('content_listing_large_box')) {
                        // Get Map ID to compare with button (for 2 column)
                        map_number = $j(this).data('count');
                    }



                    $j(this).click();
                }
            });

            if ($j('body').hasClass('listing-layout')) {
                $j('.map-icon-wrapper').removeClass('google_icn_open');
            }
        }









    });
    // ------ End Toggle Maps --- //





}
