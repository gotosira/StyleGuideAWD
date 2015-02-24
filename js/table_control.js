var ww = $j(window).width();
var limit_count = 0;

$j(document).ready(function() {

	$j(document).ready(onResize);

	$j(window).bind('resize', onResize);

});
		// Thead Counter Limit from first table
  var count_counter = function(){
   $j('.car-table:first thead tr th').each(function(){
     limit_count++;
   });
   limit_count = limit_count - 2;
  }
 
  var add_td_change_counter = function(){

   var i = 0;
  
   $j('.car-table tbody tr td').each(function(){
    $j(this).addClass('change'+i);
    $j(this).addClass('thead_info');
    if(i == limit_count){
     i = 0;
    }else{
     i++;
    }
   });
  }


onResize = function() { 



	if( ww <= 768){
		$j('.rwd-table').not('.driver').find('tbody > tr > td').find('br').remove();

		// if($j('.rwd-table > tbody > tr > td').not('.td_first').find('p').length) {
		// 	// do nothing
		// }else{
		// 	$j(this).not('.td_first').contents().eq(2).wrap('<p></p>');
		// }


		$j('.bg-table1').show();
		$j('.car-table th').css('text-align','center');

		var count = 0;
		var temp_name;
		var change_counter;
		var arr_temp = [];

		// Find Thead Counter Limit 
		count_counter();

		// add Change Counter to TBody > TD
		add_td_change_counter();

		// store TH classes
		$j('.car-table:first thead tr th').each(function(){
			temp_name = $j(this).text();
			//alert(temp_name);
			arr_temp.push(temp_name);
			count++;
		});

		// Push data content from Thead to Change Counter
		$j('.car-table tbody tr').each(function(){

			if(count > 0){
				count = 0;
			}

			$j('td', this).each(function(){
				change_counter_class = '.change'+count;
				// Change Tbody > TD content
				$j(change_counter_class+'.thead_info').attr('data-content', arr_temp[count+1]);

				count++;

			});
		});

	}
		
}

	if($j('.rwd-table > tbody > tr > td').not('.td_first').find('p').length) {
			// do nothing
		}else{
			$j(this).not('.td_first').contents().eq(2).wrap('<p></p>');
		}

	