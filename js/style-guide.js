$(document).ready(function() {

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


		
	
});

