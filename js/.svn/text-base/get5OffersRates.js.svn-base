$j(document).ready(function(){
    
    var ids = [];
    $j('.teaser_hotel_item[data-id]').each(function() {

        if($j(this).attr('data-id')!="") ids.push($j(this).attr('data-id'));
     
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
                   $j('.teaser_hotel_item[data-id="' + this.hotel_id + '"]').find('.priceData > span').append(this.ccy);
                   $j('.teaser_hotel_item[data-id="' + this.hotel_id + '"]').find('.priceData').append(this.rate);
                  
                   
                });
            }
        });
        $j.ajax({
            url: "http://www.asiawebdirect.com/review/en_US/portal/" + ids.join() + "/all/",
            dataType: "jsonp",
            success: function( data ) {
		if(data.Result=="success")
		{
		        $j.each(data.data, function() {
			   if($j('.teaser_hotel_item[data-id="' + this.HotelID + '"]')!=null)
			   {
				   try {$j('.teaser_hotel_item[data-id="' + this.HotelID + '"]').find('.review_rating').append(this.ReviewScoreText);} catch(e) {}
				   try {$j('.teaser_hotel_item[data-id="' + this.HotelID + '"]').find('.review_score').append(this.ReviewInfo[0].ScoreAVG);} catch(e) {}
				   try {$j('.teaser_hotel_item[data-id="' + this.HotelID + '"]').find('.review_score_full').append("/5");} catch(e) {}
				   try {$j('.teaser_hotel_item[data-id="' + this.HotelID + '"]').find('.reviewer').append(
					this.ReviewInfo[0].ReviewBy + " - " + this.ReviewInfo[0].Country + " - " + this.ReviewInfo[0].CheckOut);} catch(e) {}
				   try {
					var textcomment = "";
					textcomment = this.ReviewInfo[0].Comment;
					if(textcomment!="") textcomment = textcomment + "<br>";
					textcomment = textcomment + "Good : " + this.ReviewInfo[0].BestThing;
					//if(textcomment!="") textcomment = textcomment + "<br>";
					//textcomment = textcomment + "Else : " + this.ReviewInfo[0].AnythingElse;
					$j('.teaser_hotel_item[data-id="' + this.HotelID + '"]').find('.box_hotel_detail >p').append(textcomment);} catch(e) {}
			   }
		        });
		}
            }
        });
    }

});
