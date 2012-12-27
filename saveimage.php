<?php
function microtime_float()
{
   list($usec, $sec) = explode(" ", microtime());
   return ((float)$usec + (float)$sec);
}
/** 格式化时间戳，精确到毫秒，x代表毫秒 */
function microtime_format($tag, $time)
{
   list($usec, $sec) = explode(".", $time);
   $date = date($tag,$usec);
   return str_replace('x', $sec, $date);
}
/**
function mkdirs($dir)  
{  
	if(!is_dir($dir))  
	{  
		if(!mkdirs(dirname($dir))){  
		return false;  
	}  
	if(!mkdir($dir,0777)){  
		return false;  
		}  
	}  
	return true;  
} 
**/
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
    // Get the data
    $imageData=$GLOBALS['HTTP_RAW_POST_DATA'];
 
    // Remove the headers (data:,) part.  
    // A real application should use them according to needs such as to check image type
    $filteredData=substr($imageData, strpos($imageData, ",")+1);
 
    // Need to decode before saving since the data we received is already base64 encoded
    $unencodedData=base64_decode($filteredData);
 
    //echo "unencodedData".$unencodedData;
 
    // Save file.  This example uses a hard coded filename for testing, 
    // but a real application can specify filename in POST variable

	$times = microtime_float();
	list($usec, $msec) = explode(".", $times);

	$filename = date("ymd_His");
	//年 月日
	list($ymd,$his) = explode("_", $filename);
/**
	//创建文件夹
	$imgdir = "img/usr/".$ymd.'/';
	if(file_exists ($imgdir)):
	else:
		mkdirs ($imgdir,0777);
	endif;


	$rever_his= strrev($his);
	$sub_ymd_his = intval($ymd)-intval($his);
	$join_char = 'x';
	if($sub_ymd_his<0)
		$join_char ='z';
	$filename= base_convert($rever_his , 10, 33).$join_char.base_convert($sub_ymd_his , 10, 33).'y'.base_convert($msec , 10, 33).'.png';
//	$filename= $ymd.'_'.$his.'_'.$msec.'.png';


    $fp = fopen( $imgdir.$filename, 'wb' );
    fwrite( $fp, $unencodedData);
    fclose( $fp );
	echo $imgdir.$filename;
**/
	$imgdir = "img/usr/".$ymd.'/';
	$rever_his= strrev($his);
	$sub_ymd_his = intval($ymd)-intval($his);
	$join_char = 'x';
	if($sub_ymd_his<0)
		$join_char ='z';
	$filename= base_convert($rever_his , 10, 33).$join_char.base_convert($sub_ymd_his , 10, 33).'y'.base_convert($msec , 10, 33).'.png';
	


	$s = new SaeStorage();
	$url = $s->write( 'pituusrimage' , $imgdir.$filename,$unencodedData );
	echo $url;
}
else
echo 'no image to save';
?>