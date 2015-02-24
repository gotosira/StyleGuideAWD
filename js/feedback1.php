<?php 
header("Content-Type", "application/json; charset=utf-8");
//echo($callback . '({"result":"true"});');exit;
//echo "<pre>".print_r($_GET,1)."<pre>";
//echo $data;
$sourceurl = "http://www.asiawebdirect.com/chang/frontend.php/portal_forms/feedback";
$a =0;
if($a==1) {
$ch = curl_init();  
curl_setopt($ch, CURLOPT_URL, $sourceurl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);       
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$sourceData = curl_exec($ch);
curl_close($ch);
}
//echo $sourceData;
//echo '["data":"'.$sourceData.'"]';
//$resultJson = '{"data":["result":"'.$sourceData.'"]}';
//if($sourceData!="true") 
$sourceData = "true";
echo($callback . '({"result":"'.$sourceData.'"});');
?>
