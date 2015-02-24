$j(document).ready(function(){

    var ids = [];
    $j('.top10_item_wrapper[data-id]').each(function() {

        ids.push($j(this).attr('data-id'));
     
    })
    if (ids.length) {
        $j.ajax({
            url: "http://www.asiawebdirect.com/chang/frontend.php/low_rate",
            dataType: "jsonp",
            data: {
                ids: ids.join()
            },
            success: function( data ) {
                $j.each(data, function() {
                   $j('.top10_item_wrapper[data-id="' + this.hotel_id + '"]').find('.top10_item_price_wrapper > span.top10_item_price').append(this.rate);
                   $j('.top10_item_wrapper[data-id="' + this.hotel_id + '"]').find('.currency_price > span').append(this.ccy);
                   
                });
            }
        });
    }

});
