// TABLE LOGIC
var temp_array = [], a = 0, b = 0;
var ww = $j(window).width();

if($j('.rwd-table').hasClass('tb1')){

	//First TH head Count
	temp_array[a] = $j('.tb1 .bg-table1:first-child').text();
	a++;

	// Count how many TH header
	$j('.tb1 th.bg-table2').each(function(){
		temp_array[a] = $j(this).text();
		a++;
	});

	// Set columnspan of header equals to 'a' counter of TH header
	$j('.tb1 .bg-table1:nth-child(2)').attr('colspan',a-1);

	// Create TR of Data
	$j('.tb1 tbody td').each(function(){
		$j(this).attr('data-th', temp_array[b]);
		b++;
	});

}

if($j('.rwd-table').hasClass('tb2')){

	//reset all
	var new_temp_array = [], a = 0, b = 0;

	//Count TH head 
	$j('.tb2 tr .bg-table1').each(function(){
		new_temp_array[a] = $j(this).text();
		a++;
	});

	// Create TR of Data
	$j('.tb2 > tbody > tr > td').each(function(){
		$j(this).attr('data-th', new_temp_array[b]);
		if(b == a){ b = 0; }else{ b++; }
	});	

}

if($j('.rwd-table').hasClass('tb3')){

	//reset all
	var new_temp_array = [], a = 0, b = 0;

	//Count TH head 
	$j('.tb3 tr .bg-table1').each(function(){
		new_temp_array[a] = $j(this).text();
		a++;
	});

	// Create TR of Data
	$j('.tb3 > tbody > tr > td').each(function(){
		$j(this).attr('data-th', new_temp_array[b]);
		if(b == 2){ b = 0; }else{ b++; }
	});	

}

if($j('.rwd-table').hasClass('tb4')){

	//reset all
	temp_array = [], a = 0, b = 0;

	//First TH head Count
	temp_array[a] = $j('.tb4 .bg-table1:first-child').text();
	a++;

	// Count how many TH header
	$j('.tb4 th.bg-table2').each(function(){
		temp_array[a] = $j(this).text();
		a++;
	});

	// Set columnspan of header equals to 'a' counter of TH header
	$j('.tb4 .bg-table1:nth-child(2)').attr('colspan',a-4);
	$j('.tb4 .bg-table1:nth-child(3)').attr('colspan',a-4);

	// Create TR of Data
	$j('.tb4  > tbody > tr > td').each(function(){
		$j(this).attr('data-th', temp_array[b]);
		if(b == 6){ b = 0; }else{ b++; }
	});

}

if($j('.rwd-table').hasClass('tb5')){

	//reset all
	temp_array = [], a = 0, b = 0;

	//First TH head Count
	temp_array[a] = $j('.tb5 .bg-table1:first-child').text();
	a++;


	// Count how many TH header
	$j('.tb5 th.bg-table2').each(function(){
		temp_array[a] = $j(this).text();
		a++;
	});
	
	temp_array[a] = $j('.tb5 .bg-table1:last-child').text();
	

	// Set columnspan of header equals to 'a' counter of TH header
	$j('.tb5 .bg-table1:nth-child(2)').attr('colspan',a-4);
	$j('.tb5 .bg-table1:nth-child(3)').attr('colspan',a-4);


	// Create TR of Data
	$j('.tb5  > tbody > tr > td').each(function(){
		$j(this).attr('data-th', temp_array[b]);
		if(b == 7){ b = 0; }else{ b++; }
	});

}

if($j('.rwd-table').hasClass('tb6')){

	//reset all
	temp_array = [], a = 0, b = 0;

	//Count TH head 
	$j('.tb6 tr .bg-table1').each(function(){
		new_temp_array[a] = $j(this).text();
		a++;
	});

	// Create TR of Data
	$j('.tb6 > tbody > tr > td').each(function(){
		$j(this).attr('data-th', new_temp_array[b]);
		if(b == 3){ b = 0; }else{ b++; }
	});	

}

if($j('.rwd-table').hasClass('tb7')){

	//reset all
	temp_array = [], a = 0, b = 0;

	//Count TH head 
	$j('.tb7 tr .bg-table1').each(function(){
		new_temp_array[a] = $j(this).text();
		a++;
	});

	// Create TR of Data
	$j('.tb7 > tbody > tr > td').each(function(){
		$j(this).attr('data-th', new_temp_array[b]);
		if(b == a-1){ b = 0; }else{ b++; }
	});	


}


if($j('.rwd-table').hasClass('golf_tb')){

	//reset all
	temp_array = [], a = 0, b = 0;

	//First TH head Count
	temp_array[a] = $j('.golf_tb .bg-table1:first-child').text();
	a++;

	// Count how many TH header
	$j('.golf_tb th.bg-table2').each(function(){
		temp_array[a] = $j(this).text();
		a++;
	});

	// Set columnspan of header equals to 'a' counter of TH header
	$j('.golf_tb .bg-table1:nth-child(2)').attr('colspan',a-4);
	$j('.golf_tb .bg-table1:nth-child(3)').attr('colspan',a-4);

	// Create TR of Data
	$j('.golf_tb  > tbody > tr > td').each(function(){
		$j(this).attr('data-th', temp_array[b]);
		if(b == 4){ b = 0; }else{ b++; }
	});

}

if($j('.rwd-table').hasClass('airport')){

	//reset all
	var airport_array = [], a = 0, b = 0, count_tbody = 0;

	//First TH head Count
	airport_array[a] = $j('.airport .bg-table1:first-child').text();
	a++;

	// GET TH header
	$j('.airport th.bg-table2').each(function(){
		airport_array[a] = $j(this).text();
		a++;
	});

	// Set columnspan of header equals to 'a' counter of TH header
	//$j('.airport .bg-table1:nth-child(2)').attr('colspan',a-4);
	//$j('.airport .bg-table1:nth-child(3)').attr('colspan',a-4);

	// Set Head of table for first TD only
	$j('.airport > tbody > tr:first-child > td:first-child').addClass('td_first').attr('data-th', airport_array[b]);

	var removeDescription = "Description"

	// remove header
	airport_array.splice(0,1);
	//airport_array.pop();

	// remove header from array
	airport_array.splice($j.inArray(removeDescription, airport_array),1);

	$j('.airport  > tbody > tr > td').not('.td_first').each(function(){
		//alert(temp_array[b]);
		$j(this).attr('data-th', airport_array[b]);
		if(b == a-3){ b = 0; }else{ b++; }
	});

	$j('.td_first').css('content'," ");

}

if($j('.rwd-table').hasClass('driver')){

	//reset all
	var driver_array = [], a = 0, b = 0, count_tbody = 0;

	//First TH head Count
	//driver_array[a] = $j('.driver .bg-table1:first-child').text();
	//a++;

	// GET TH header
	 $j('.driver th.bg-table2').each(function(){
	 	driver_array[a] = $j(this).text();
	 	a++;
	 });

	// Set columnspan of header equals to 'a' counter of TH header
	//$j('.airport .bg-table1:nth-child(2)').attr('colspan',a-4);
	//$j('.airport .bg-table1:nth-child(3)').attr('colspan',a-4);

	// Set Head of table for first TD only
	$j('.driver > tbody > tr > td:first-child').addClass('td_first');

	//var removeDescription = "Description"

	// remove header
	//driver_array.splice(0,1);

	// remove header from array
	//driver_array.splice($j.inArray(removeDescription, driver_array),1);

	$j('.driver  > tbody > tr > td').each(function(){
		//alert(temp_array[b]);
		$j(this).attr('data-th', driver_array[b]);
		if(b == a-1){ b = 0; }else{ b++; }
	});
	if( ww <= 768){	$j('.td_first').css('width',"100%"); }else{ $j('.td_first').css('max-width','600px');}
	$j('.driver > tbody > tr:last-child > td_first').css('background', '#D6D6D6');
}


if($j('.rwd-table').hasClass('ferry')){

	//reset all
	var ferry_array = [], a = 0, b = 0, count_tbody = 0;

	//First TH head Count
	//driver_array[a] = $j('.driver .bg-table1:first-child').text();
	//a++;

	// GET TH header
	 $j('.ferry th.bg-table2').each(function(){
	 	ferry_array[a] = $j(this).text();
	 	a++;
	 });

	// Set columnspan of header equals to 'a' counter of TH header
	//$j('.airport .bg-table1:nth-child(2)').attr('colspan',a-4);
	//$j('.airport .bg-table1:nth-child(3)').attr('colspan',a-4);

	// Set Head of table for first TD only
	$j('.ferry > tbody > tr > td:first-child').addClass('td_first');

	//var removeDescription = "Description"

	// remove header
	//ferry_array.splice(0,1);

	// remove header from array
	//ferry_array.splice($j.inArray(removeDescription, ferry_array),1);

	$j('.ferry  > tbody > tr > td').each(function(){
		//alert(temp_array[b]);
		$j(this).attr('data-th', ferry_array[b]);
		if(b == a-1){ b = 0; }else{ b++; }
	});
	if( ww <= 768){	$j('.td_first').css('width',"100%"); }else{ $j('.td_first').css('max-width','600px');}
	$j('.ferry > tbody > tr:last-child > td_first').css('background', '#D6D6D6');
}
