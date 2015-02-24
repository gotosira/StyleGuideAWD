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


    $j(document).ready(function() {
        var count_wrapper = 1;
        //$j('#social, #fb-root').remove();

        $j('.map-icon-wrapper').each(function() {
            $j(this).attr('data-count', count_wrapper);
            var location_temp_id = $j(this).attr('data-locationid');
            $j('.content-map[data-locationid='+location_temp_id+']').attr('data-count', count_wrapper);
            count_wrapper++;
        });

    
        // add data-location id to the nearest content-map
        // $j('.map-icon-wrapper').each(function(){
        //     var temp_id = $j(this).attr('data-locationid');
        //     $j(this).next().next().attr('data-locationid', temp_id);
        // });
     
        check_preOpen();
        

    });
    // ------ End Toggle Maps --- //

    var check_preOpen = function(){

        if (ww >= 768) {

                 $j('.map-icon-wrapper').each(function() {

                    element = $j(this);
                     if ($j(this).attr('data-preopen') == "yes") {
                         element.click();
                     }
                 });

            }
    }


    $j('.map-icon-wrapper').click(function() {
            // test 1
          //  if( $j(this).attr('data-locationid') == $j(this).next().next().attr('data-locationid') ){
                element = $j(this);
                $j(this).toggleClass('google_icn_open');
                var count = $j(this).attr('data-count');
                var check_exist = $j('.content-map[data-count='+count+']').attr('data-count');
                if(check_exist > 0){
                    var count_2 = count;
                }
                // check data-count of buttos and maps are same / also map is not open 
                if($j('.content-map[data-count='+count+']').hasClass('open_map') ){
                    $j('.content-map[data-count='+count+']').removeClass('open_map');
                    $j('.content-map[data-count='+count+']').find('.mapLoading').remove();
                }else{
                    if(count == count_2){
                        $j('.content-map[data-count='+count+']').addClass('open_map');
                        create_map(element);
                    }else{
                        // do nothing
                    }
                }

            if (ww <= 768) {

                var h4_title;

                if($j('body').find('.top10_item_wrapper').length > 0){
                    if($j(this).parent().parent().find('.top10_item_head_wrapper').length > 0){
                        h4_title = $j(this).parent().parent().find('.top10_item_head_wrapper > .top10_item_detail_wrapper').addClass('fix_h4');
                       // alert('yes3');
                    }
                     else{
                        h4_title = $j(this).parent().find('h4');
                       //  alert('yes4');
                     }
                }

                 if($j('body').find('.page_intro_body').length > 0){
                     if($j('.content_listing_large_box').length > 0){
                        h4_title = element.parent().parent().find('.content_listing_large_box > .title-wrapper > h4').addClass('fix_h4');
                     //   alert('yes1');
                      }else{
                        h4_title = element.parent().find('.title-wrapper > h4').addClass('fix_h4');
                     //   alert('yes2');
                      }
                 } 
                

               var map_icn_click = $j(this);


                if (!map_icn_click.hasClass('fix_icn')) {

                    // first check
                    if ($j('header').hasClass('nav-header-up') || $j('header').hasClass('nav-header-down')) {
                        // add fix
                        $j('header').addClass('nav-header-fix');
                        $j('.toggle-search').addClass('nav-toggle-fix');
                        $j('header').removeClass('nav-header-down nav-header-up');
                        $j('.toggle-search').removeClass('nav-toggle-search-down nav-toggle-search-up');
                    }
                    map_icn_click.addClass('fix_icn');
                    h4_title.addClass('fix_h4');
                    $j('header').addClass('dark');

                    
                } else {
                    if ($j('header').hasClass('nav-header-fix')) {
                        $j('header').removeClass('nav-header-fix');
                        $j('.toggle-search').removeClass('nav-toggle-fix');
                    }
                    map_icn_click.removeClass('fix_icn');
                    $j('.fix_h4').removeClass('fix_h4');
                    $j('header').removeClass('dark');
                    $j(this).parent().parent().find('.top10_item_detail_wrapper').css('position','relative');

                }

                 // Check if Map Button is clicked or Open ( only when less than 768px )
                if($j('.content-map').hasClass('open_map')){
                    $j('.head_wrapper').click(false);
                }else{
                     $j('.head_wrapper').click(true);
                }
            }

       


    });




}else{
    alert(' Error');
}
