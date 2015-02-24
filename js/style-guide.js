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
});
