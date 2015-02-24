var _hotel_map;
_LISTING_ITEM_MAP_PARAMS_ = {
    "verbosity": VERBOSITY_PORTAL_SHOW_LANDMARK_ON_MAP,
    "mapType"  : "Map",
    "init" : function(m) {
              m.loadLocationsCloseToLocation(47289, 4, 500, 16);
    }
};

$j(document).ready(function(){
	$j('a.show-map')
		.click(function(e){
			e.preventDefault();
			
			$element = $j(this);
			$para = _getPara($element);
			divId = $element.attr('data-id');
			if (!$para.children().last().hasClass('mapLoading')) {
				showOnMap($element);
				$element.children('img').first().attr('src', 'http://static.asiawebdirect.com/images/icons/map-icon-close.png');
			} else {
				closeMap(divId);
			}
		})
        .children("img").attr('src', 'http://static.asiawebdirect.com/images/icons/map-icon-show.png');
	
	var displayMapList = new Array();
	var displayMapListCount = 0;
	$j("a.show-map").each(function() {
		$element = $j(this);
		if ($element.attr('data-preopen') == 'yes') {
			// $element.trigger('click');
			displayMapList[displayMapListCount] = $element.attr('data-id');
			displayMapListCount++;
		}
	});
	
	var displayMapListCountUse = 0;
	var delayTriggerClock = self.setInterval(function(){delayTrigger()},3000);
	
	function delayTrigger() {
		$element = $j('#mapBtn_'+ displayMapList[displayMapListCountUse]);
		$element.trigger('click');
		displayMapListCountUse++;
		if (displayMapListCountUse >= displayMapListCount) {
			delayTriggerClock = window.clearInterval(delayTriggerClock);
		}
	}
});

function showOnMap ($element) {
	// closeMap();
	$para = _getPara($element); 
	
	locationId = $element.attr('data-locationId');	
	divId = $element.attr('data-id');	
	_setLandmarkId(locationId);
	$j('<div id="_map_container_'+ divId +'" class="mapLoading" style="height:500px;"> </div>')
		.hide()
		.appendTo($para)
		.slideDown(1000, function(){
			_hotelMap = new HotelMap($j('#_map_container_'+ divId)[0], _LISTING_ITEM_MAP_PARAMS_);
		})
}

function closeMap (divId) {
	$j('#_map_container_'+ divId).slideUp(1000, function(){
		$j('#_map_container_'+ divId).remove();
	})
	$j('#mapBtn_'+ divId +' img').attr('src', 'http://static.asiawebdirect.com/images/icons/map-icon-show.png');
}

function _getPara ($element) {
	return $element.closest('.content-listing-item, .content-listing-item-featured, .content-listing-item-highlight, .listing-wrapper');
}

function _setLandmarkId(locationId) {
	_LISTING_ITEM_MAP_PARAMS_.init = function(m) {
          m.loadLocationsCloseToLocation(locationId, 4, 500, 16);
	}
}
