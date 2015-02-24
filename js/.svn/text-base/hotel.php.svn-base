<?php 
header("Content-Type", "application/json; charset=utf-8");
//echo "<pre>";
//echo $callback;exit;
//header("Content-Type", "application/javascript; charset=utf-8");
//error_reporting(0);

//Asia|/|Thailand|/|Bangkok|/|
//"DestinationPath": "Asia|/|Thailand|/|Bangkok|/|Siam|/|",
$destpath = str_replace("/", "|/|", $destpath);
//echo $destpath;exit;


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

$textsearch = $sname;// . " " . $destname;
$arr = explode(" ", $textsearch);
if(is_array($arr) && (sizeof($arr)>1))
{
	$textsearch = "+".implode(" +", $arr);
}
//echo $textsearch;exit;
$temp = array();
$temp['indent'] = on;
$temp['q'] = "LanguageCode:(en_US) AND search:(".addslashes($textsearch).") AND DestinationPath:(".addslashes($destpath)."*)";
//$temp['q'] = 'search:("'.addslashes($textsearch).'") and LanguageCode:("en_US")';
//echo $temp['q'];exit;
$temp['rows'] = 10;
$temp['sort'] = "entity_sort asc,num_bookings desc,DestinationLevel asc,DestinationPath asc";
$temp['start'] = 0;
$temp['version'] = 2.2;
$temp['wt'] = json;

$sourceurl = "http://www.asiawebdirect.com/solr/select?".http_build_query($temp);
//echo $sourceurl;exit;
$ch = curl_init($sourceurl);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$sourceData = curl_exec($ch);
curl_close($ch);

//echo $sourceData;exit;
$showall = null;
$js = json_decode($sourceData, 1);
if(is_array($js['responseHeader']) && (sizeof($js['response']['docs'])>0)) 
{
	if($js['response']['numFound']>$temp['rows']) 
	{
		$showall = array("label"=>"See ".$js['response']['numFound']." more results for ".addslashes($textsearch),
			"category"=> "showall" , 
			"id"=>$data[$i]['ref_id'] , "url"=>"http://www.asiawebdirect.com/freetextsearch/?q=".addslashes($textsearch));	
	}
}
else
{
	echo '{"list":[]}';return false;
}
$data = $js['response']['docs'];
//echo $data[0]['DestinationPath'];
//echo strlen($destpath);
//echo substr($data[0]['DestinationPath'],0,strlen($destpath));
//echo "<br>".$destpath;exit;
for($i=0;$i<sizeof($data);$i++)
{
	if(
		(($data[$i]['entity']=='destination') || ($data[$i]['entity']=='hotel'))
		&& ($data[$i]['LanguageCode']=='en_US')
	) 
	{
		$json[] = array("label"=>$data[$i]['name'] , "category"=> $data[$i]['entity'] , 
			"id"=>$data[$i]['ref_id'] , "url"=>$data[$i]['url']);
	}
}
if($showall!=null)
{
	$json[] = $showall;
}

if(is_array($json) && (sizeof($json)>0)){}
else
{
	echo '{"list":[]}';return false;
}

$outp = array("list" => $json);
$resultJson = json_encode($outp);
//echo $resultJson;exit;
echo($callback . "(". str_replace("{", "\n{", $resultJson) . ");" );
?>
