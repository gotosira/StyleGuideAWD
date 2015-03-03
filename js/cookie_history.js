$(document).ready(function() {
	var didOpen = false;
	var pass_value;
	var new_url_temp;
	var popupwindow;
	var href;

	// getCookie function
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "error, cannot get cookie";
	}

	// Store current URL
	 function URLCookie(){
	     var store_url = "lasturl";
	     var this_page_url = window.location.href;
	     document.cookie = store_url + "=" + this_page_url;
	     pass_value = getCookie('lasturl');
	 }

	 
	 // function for making history
	function newHistory(newWin){
		// store new url
		new_url_temp = newWin.location.href;
		// create push to change url to new url
		newWin.history.pushState( {page: 1}, "title1", pass_value);
		newWin.history.pushState( {page: 2}, "title2", new_url_temp);
	}

	function openWindow(new_url){
			// get new window location
	    	popupwindow = window.open(new_url);
	    	// load new history function after finished loading
	    	popupwindow.onload = function(){
	    		newHistory(popupwindow);
	    	};
	}

	$('.popUpHistory').click(function(){

		// get Target URL from
		href = $(this).attr('href');
		// get current url to cookie
		URLCookie();
		alert(href);
		// check new window
		if(didOpen == false){
			openWindow(href);
			didOpen = true;
    	}
    	else{

    	}
    	// if new windows is opened
    	// 	didOpen = false;
    	// 	openWindow(href);
    	// }


	    // prevent link to work
    	return false;
	});

	// when back button clicked -> reload history
	   if (window.history) {

		    $(window).on('popstate', function() {
		      var hashLocation = location.hash;
		      var hashSplit = hashLocation.split("#!/");
		      var hashName = hashSplit[1];

		      if (hashName !== '') {
		        var hash = window.location.hash;
		        if (hash === '') {
		          location.reload();
		        }
		      }
		    });
	  }
});


