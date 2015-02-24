<?php 
//echo "<pre>";
//echo $callback;exit;
header("Content-Type", "application/javascript; charset=utf-8");
//header("Content-Type", "application/json; charset=utf-8");
//error_reporting(0);
$destid = trim($destid);
if($destid=="")
{
	echo '{"list":[]}';return false;
}
$idestid = intval($destid);
if($idestid!=$destid)
{
	echo '{"list":[]}';return false;
}

$sourceurl = "http://www.asiawebdirect.com/en_US/destination/info/".$idestid."/";
$ch = curl_init($sourceurl);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$sourceData = curl_exec($ch);
curl_close($ch);

$js = json_decode($sourceData, 1);
if(is_array($js['SubDestinations']) && (sizeof($js['SubDestinations'])>0)) {}
else
{
	echo '{"list":[]}';return false;
}

function array_diff_fixed($array1, $array2) {
	$result = array();
	foreach ($array1 as $val) {
		if (($key = array_search($val, $array2, TRUE))===false) 
		{
			$result[] = $val;
		}
	}
	return $result;
} 

$arrsub = $js['SubDestinations'];
$arrpop = $js['PopularSubDestinations'];
//print_r($arrsub);exit;
//print_r($arrpop);exit;
$arrNonpop = array_diff_fixed($arrsub, $arrpop);
//print_r($arrNonpop);exit;

$json = array();
if(is_array($arrpop) && (sizeof($arrpop)>0))
{
	for($i=0;$i<sizeof($arrpop);$i++)
	{
		$json[] = array("label"=>$arrpop[$i]['DestinationName'] , "category"=> "Popular Area" , 
			"id"=>$arrpop[$i]['DestinationID'] , "level"=>"destination");
	}
}

if(is_array($arrNonpop) && (sizeof($arrNonpop)>0))
{
	for($i=0;$i<sizeof($arrNonpop);$i++)
	{
		$json[] = array("label"=>$arrNonpop[$i]['DestinationName'] , "category"=> "Other Area" , 
			"id"=>$arrNonpop[$i]['DestinationID'] , "level"=>"destination");
	}
}
if(is_array($json) && (sizeof($json)>0)){}
else
{
	echo '{"list":[]}';return false;
}

$outp = array("list" => $json);
$resultJson = json_encode($outp);
//echo resultJson;exit;
/*
$resultJson = <<<EOF
{
      "list"      :     [{
                                "label":"Bangna", 
                                "category": "Popular Destinations"
                         },{    "label":"Chatuchak", 
                                "category": "Popular Destinations"
                         },{    "label":"Chidlom - Pleonchit", 
                                "category": "Popular Destinations"
                         },{    "label":"China Town", 
                                "category": "Popular Destinations"
                         },{    "label":"Don Muang Airport", 
                                "category": "Destinations"
                         },{    "label":"Impact - Nonthaburi",
                                "category": "Destinations"
                         },{    "label":"Khao San - Old City",
                                "category": "Popular Destinations"
                         },{    "label":"Other Areas",
                                "category": "Popular Destinations" 
                         },{    "label":"Petchburi",
                                "category": "Popular Destinations" 
                         },{    "label":"Pratunam", 
                                "category": "Popular Destinations" 
                         },{    "label":"Ratchada Pisek",
                                "category": "Popular Destinations" 
                         },{    "label":"Riverside",
                                "category": "Popular Destinations" 
                         },{    "label":"Sathorn",
                                "category": "Popular Destinations" 
                         },{    "label":"Siam",
                                "category": "Popular Destinations" 
                         },{    "label":"Silom",
                                "category": "Popular Destinations" 
                         },{    "label":"Sukhumvit", 
                                "category": "Popular Destinations" 
                         },{    "label":"Suvarnabhumi Airport",
                                "category": "Popular Destinations" 
                         },{    "label":"Thonburi", 
                                "category": "Popular Destinations" 
                         },{    "label":" Silom ", 
                                "category": " AA "         
                         },{    "label":" Siam ", 
                                "category": " AA "         
                        }]
}
EOF;
*/
echo($callback . "(". $resultJson . ");" ); ?>
