<?php 
header("Content-Type", "application/json; charset=utf-8");
error_reporting(0);
//echo($callback . '({"result":"true"});');exit;
//echo "<pre>".print_r($_GET,1)."<pre>";
//echo $data;
parse_str($_GET['data'], $output);
if(isset($output['g-recaptcha-response']))
{
	$captcha = $output['g-recaptcha-response'];
}
//print_r($output);
if(!$captcha) 
{
	echo($callback . '({"result":"false"});');
	exit;
}

$responseCaptcha = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Ld6MQATAAAAAKzi9O4wpmu-68Qdq_ipIbJ-XBx2&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
if($responseCaptcha.success==false)
{
	echo($callback . '({"result":"false"});');
	exit;
}

$sourceurl = "http://www.asiawebdirect.com/chang/frontend.php/portal_forms/feedbacknewcapt";
$ch = curl_init();  
curl_setopt($ch, CURLOPT_URL, $sourceurl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);       
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$sourceData = curl_exec($ch);
curl_close($ch);
//echo $sourceData;
//echo '["data":"'.$sourceData.'"]';
//$resultJson = '{"data":["result":"'.$sourceData.'"]}';
if($sourceData!="true") $sourceData = "false";
echo($callback . '({"result":"'.$sourceData.'"});');
?>
