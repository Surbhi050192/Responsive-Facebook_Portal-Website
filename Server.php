<?php

// header("Access-Control-Allow-Origin: *");
	require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';



$fb = new Facebook\Facebook([
                             'app_id' => '749144261909561',
                             'app_secret' => '1f653a9f660a4f4ea63f839b27549d45',
                             'default_graph_version' => 'v2.5',]);

$fb->setDefaultAccessToken('EAAKpV72d3DkBAD4ZCfVmW03RR3nUzk6pZCNumAEhZAZBpws6N7Q6KtIc9WgZBtYNb8a8bevVsLWMtrwNouoSCzaqyKedLvewL3Mz43ZBZBu3gpqoZBYIkpsNOD1pDh7DTfZCIuuKn92r86xQaN8tacHVqJyAZAa4ThJTkZD');

$fb_token = 'EAAKpV72d3DkBAD4ZCfVmW03RR3nUzk6pZCNumAEhZAZBpws6N7Q6KtIc9WgZBtYNb8a8bevVsLWMtrwNouoSCzaqyKedLvewL3Mz43ZBZBu3gpqoZBYIkpsNOD1pDh7DTfZCIuuKn92r86xQaN8tacHVqJyAZAa4ThJTkZD';


try {


if(isset($_GET["id"])){
	if(isset($_GET["type"])){

		$type=$_GET["type"];


		if($type=="user"){

			$URLUser = "https://graph.facebook.com/v2.8/search?q=".$_GET["id"]."&type=user&fields=id,name,picture.width(700).height(700)&access_token=".$fb_token;
			$URLUser = preg_replace('~\s~', '%20', $URLUser);
			$jsonUser = file_get_contents($URLUser);
			echo $jsonUser;
		}
		if($type=="page"){
			$URLPage = "https://graph.facebook.com/v2.8/search?q=".$_GET["id"]."&type=page&fields=id,name,picture.width(700).height(700)&access_token=".$fb_token;
			$URLPage = preg_replace('~\s~', '%20', $URLPage);
			$jsonPage = file_get_contents($URLPage);
			echo $jsonPage;
		}
		if($type=="event"){
			$URLEvent = "https://graph.facebook.com/v2.8/search?q=".$_GET["id"]."&type=event&fields=id,name,picture.width(700).height(700)&access_token=".$fb_token;
			$URLEvent = preg_replace('~\s~', '%20', $URLEvent);
			$jsonEvent = file_get_contents($URLEvent);
			echo $jsonEvent;
		}
		if($type=="place"){

		$URLPlace="https://graph.facebook.com/v2.8/search?q=$_GET[id]&type=place&fields=id,name,picture.width(700).height(700)&center=$_GET[lat1],$_GET[long1]&access_token=$fb_token";
		$URLPlace = preg_replace('~\s~', '%20', $URLPlace);
		$jsonPlace = file_get_contents($URLPlace);
		echo $jsonPlace;

		}
		if($type=="group"){
			$URLGroup = "https://graph.facebook.com/v2.8/search?q=".$_GET["id"]."&type=group&fields=id,name,picture.width(700).height(700)&access_token=".$fb_token;
			$URLGroup = preg_replace('~\s~', '%20', $URLGroup);
			$jsonGroup = file_get_contents($URLGroup);
			echo $jsonGroup;
		}
	}

}

if(isset($_GET["albumid"])){
	// echo "i am inside details";
	// echo $_GET["albumid"];
$idUser = $_GET["albumid"];
$URLDetails = "https://graph.facebook.com/v2.8/$idUser?fields=albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=$fb_token";
	$URLDetails = preg_replace('~\s~', '%20', $URLDetails);
$jsonDetails = file_get_contents($URLDetails);
echo $jsonDetails;
}


// $userNode = $response->getGraphUser();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
// When Graph returns an error
echo 'Graph returned an error: ' . $e->getMessage();
exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
// When validation fails or other local issues
echo 'Facebook SDK returned an error: ' . $e->getMessage();
exit;
}
// echo 'Logged in as ' . $userNode->getName();

	?>
