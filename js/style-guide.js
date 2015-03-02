$(document).ready(function() {
	var pass_value;
	$('.code-preview-icn-all').click(function(){
		$('.code-preview').each(function(){
			if($(this).is(":checked")){
				$(this).prop('checked', false);
			}else{
				$(this).prop('checked', true);
			}
		});
	});
	$('.code-preview-button').click(function(){
		var temp_node = $(this).next('pre');
		temp_node.slideToggle();
		$('body').animate({scrollTop:temp_node.offset().top},500);
	});

	function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
	}

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

	 function displayCookie(){
	     var store_url = "lasturl";
	     var this_page_url = window.location.href;
	     document.cookie = store_url + "=" + this_page_url;
	     pass_value = getCookie('lasturl');
	 }

	function newHistory(newWin){
		// store new url
		var new_url_temp = newWin.location.href;
		// create push to change url to new url
		var stateObj = { foo: "bar" };
		newWin.history.pushState( stateObj, "page1", new_url_temp);
		// update to previous url
		newWin.history.replaceState(stateObj, "page2", pass_value);
		// test popstate
		newWin.addEvenListener('popstate', function(event){
			var state = event.state;
		});
		// location.reload();
	}

	$('.new_page').click(function(){
		displayCookie();
    	var popupwindow = window.open('new.html');
    	popupwindow.onload = function(){
    		newHistory(popupwindow);
    	}
	});

	$('.test').click(function(){
		var prev_url = getCookie('lasturl');
		alert(prev_url);
	});
});

