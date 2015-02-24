// function to create space for html()
function spaceToNbsp(str) {
    if (str == undefined) {
        str = "";
    }
    return str.replace(/ /g, " ");

}

// add 'a href' of image to swipebox
var image_url = "";
var caption_temp = "";
var num = '1';
var $temp = "";
var $section_content = "";
/*$j('.img_2photo').each(function(){
    image_url = $j(this).prop('src');
    // get html from twophotos
    caption_temp = $j(this).parent().parent().find('.twophotos').html();
    // replace with space
    caption_temp = spaceToNbsp(caption_temp);
    // add to a href
    $j(this).wrap('<a href='+image_url+' class="swipebox">');
    $j(this).parent().attr('title',caption_temp);
});*/


jQuery(document).ready(function() {
    $j('.item_3photo').each(function() {
        image_url = $j(this).find('.img-gallery').attr('src');
        var temp_data_alt = $j(this).find('.img-gallery').attr('data-alt');
        if (undefined !== temp_data_alt && temp_data_alt.length > 0) {
            caption_temp = $j(this).find('.img-gallery').attr('data-alt');
        } else {
            caption_temp = $j('.top_title_wrapper').find('h1').html();
        }
        // replace with space
        caption_temp = spaceToNbsp(caption_temp);
        $j(this).find('.img-gallery').wrap('<a href=' + image_url + ' class="swipebox">');
        $j(this).find('.img-gallery').parent().attr('title', caption_temp);
    });

    $j('.item_2photo').each(function() {
        image_url = $j(this).find('.img-gallery').prop('src');
        var temp_data_alt = $j(this).find('.img-gallery').attr('data-alt');
        if (undefined !== temp_data_alt && temp_data_alt.length > 0) {
            caption_temp = temp_data_alt;
        } else {
            caption_temp = $j('.page_intro_body').find('h1').html();
        }
        // replace with space
        caption_temp = spaceToNbsp(caption_temp);
        $j(this).find('.img-gallery').wrap('<a href=' + image_url + ' class="swipebox" rel="gallery2">');
        $j(this).find('.img-gallery').parent().attr('title', caption_temp);
    });


    $j('.listing-img').each(function() {

        $temp = $j(this);
        image_url = $j(this).prop('src');
        $section_content = $j('.main_wrapper').find('.content_listing ');
        $list_content = $j('.main_wrapper').find('.body_content_wrapper');
        $section_index2column = $j('.top10_item_detail_wrapper').find('.top10_item_sub_detail');
        $section_content2Col_wrapper = $j('.body_content2Col_wrapper').find('.wrapper_2column');
        // Check if listing or 2-columns layout and get html from the page to string
        if ($list_content.length > 0) {
            var check_alt = $j(this).attr('data-alt');
            if (undefined !== check_alt && check_alt.length > 0) {
                caption_temp = check_alt;
            } else {
                caption_temp = $temp.attr('data-title');
            }
            caption_temp = spaceToNbsp(caption_temp);
        } else if ($section_content2Col_wrapper.length > 0) {
            var check_alt = $j(this).attr('data-alt');
            var check_title = $j(this).attr('data-title');
            if (undefined !== check_title && check_title.length > 0)  {
                caption_temp = check_title;
            } else if (undefined !== check_alt && check_alt.length > 0) {
                caption_temp = check_alt;
            } else {
                caption_temp = $section_content2Col_wrapper.find('.page_intro_body').find('h1').html();
            }
            caption_temp = spaceToNbsp(caption_temp);
        } else if ($section_content.find('div').hasClass('listing-img-wrapper')) {
            caption_temp = $temp.parent().next().find('h4').html();
            // replace with space
            caption_temp = spaceToNbsp(caption_temp);
        } else if ($section_index2column.hasClass('content_listing_large')) {
            caption_temp = $j('.page_intro_body').find('h1').html();
            // replace with space and number
            caption_temp = spaceToNbsp(caption_temp) + ' ' + num;
            // increment number by 1
            num = ++num;
        } else if ($section_index2column.hasClass('top10_item_sub_detail')) {
            caption_temp = $temp.parent().prev().find('.top_item_title').html();
            caption_temp = num + ' ' + spaceToNbsp(caption_temp);
            num = ++num;
        }

        // add to a href
        if ($temp.parents('a').length == 1) {
            $temp.parent().attr('title', caption_temp);
        } else {
            $temp.wrap('<a href=' + image_url + ' class="swipebox" rel="gallery">');
            $temp.parent().attr('title', caption_temp);
        }

    });


    // Instantiate Image Gallery Swipe
    $j('.swipebox').swipebox({
        hideBarsDelay : 0
    });



});
