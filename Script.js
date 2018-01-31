var lat = "";
var long = "";
var dist = "";
var tempFlag = false;


var myModule = angular.module("myModule", []);

myModule.controller("myController", function ($scope, $http) {

$scope.showTables = false;
$scope.showAlbums = false;
$scope.showFavourites = false;
$scope.showProgress = false;
$scope.noPic = false;
$scope.noPost = false;
$scope.isPicture = false;
$scope.isPost = false;
$scope.slidingWindow = false;
$scope.albProgress = false;
$scope.slidingBack = false;
$scope.prevButton = false;
$scope.nextButton = false;
$scope.poProgress = false;

$(document).ready(function(){
	$('a[data-toggle="tab"]').on('shown.bs.tab',function(e){
	 $scope.chk = $(e.target).text();
	});
});

	navigator.geolocation.getCurrentPosition(success, error, options);

	$scope.storedFav = JSON.parse(localStorage.getItem("findFav11"));

	var enterValue;

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
	};

	function success(pos) {
		var crd = pos.coords;
		lat = `${crd.latitude}`;
		long = `${crd.longitude}`;
		dist = `${crd.accuracy}`;

	};

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	};
	$scope.findFavourites = function (favVal) {

		$("#" + favVal.id).find('i').toggleClass('glyphicon glyphicon-star-empty').toggleClass('glyphicon glyphicon-star');
		var Starred = $("#" + favVal.id).find('i').hasClass('glyphicon glyphicon-star');

		if (Starred) {

			if (localStorage.getItem("findFav11")) {
				//console.log("have it");
				var arr = JSON.parse(localStorage.getItem("findFav11"));
				//console.log("arr is "+ arr);
				arr.push(favVal);
				//console.log("arr is after push"+ arr);
				localStorage.setItem("findFav11", JSON.stringify(arr));
				//  console.log("arr is after set "+ localStorage.getItem("findFav11"));
			} else {
				//console.log("ini");
				var items = [];
				items.push(favVal);
				// console.log("itesm is " + items);
				localStorage.setItem("findFav11", JSON.stringify(items));
				//console.log("set is " + localStorage.getItem("findFav11"));
			}
		} else {
			var arr = JSON.parse(localStorage.getItem("findFav11"));
			var find = arr.find(findPresent);
			if (find) {
				//  console.log("delete it");
				var index = arr.map(function (d) {
					return d['id'];
				}).indexOf(favVal.id);
				arr.splice(index, 1);
				localStorage.setItem("findFav11", JSON.stringify(arr));
			} else {
				console.log("nothing to do");
			}
		}

		function findPresent(test) {
			if (test.id == favVal.id) {
				return true;
			} else {
				return false;
			}
		}
		$scope.storedFav = JSON.parse(localStorage.getItem("findFav11"));
	}

	$scope.displayFav = function(){
		document.getElementById("Favourites_section").style.display = "block";
		//document.getElementById("hideIt").style.display = "block";
		document.getElementById("makeIt").style.display = "none";
		document.getElementById("albumDiv").style.display = "none";
		//document.getElementById("Favourites_section").style.display = "block";
 		$scope.showFavourites=true;
		$scope.showTables=false;
	}

	$scope.mentionFav = function (mentionResponse) {
		if (mentionResponse == null) {
			return false;
		}

		if (!localStorage.getItem("findFav11")) {
			return false;
		} else {

			var arr = JSON.parse(localStorage.getItem("findFav11"));
			var find = arr.find(findPresent);
			if (find) {
				return true;
			} else {
				return false;
			}
		}

		function findPresent(test) {
			if (test.id == mentionResponse.id) {
				return true;
			} else {
				return false;
			}
		}

	}

	$scope.findDelete = function (favVal) {
		var arr = JSON.parse(localStorage.getItem("findFav11"));
		var find = arr.find(findPresent);
		if (find) {
			//  console.log("delete it");
			var index = arr.map(function (d) {
				return d['id'];
			}).indexOf(favVal.id);
			arr.splice(index, 1);
			localStorage.setItem("findFav11", JSON.stringify(arr));
		}
		$scope.storedFav = JSON.parse(localStorage.getItem("findFav11"));

		function findPresent(test) {
			if (test.id == favVal.id) {
				return true;
			} else {
				return false;
			}
		}
		console.log("del");

	}

	$scope.findUsers = function () {
		document.getElementById("Favourites_section").style.display = "none";
		//document.getElementById("Favourites_section").style.display = "none";
			//document.getElementById("hideIt").style.display = "none";
			document.getElementById("noShow").style.display = "none";
			//document.getElementById("makeIt").style.display = "block";
		tempFlag = true;
		if(!$scope.fetchData || $scope.fetchData==""){
			alert("Please enter the keyword");
		}
		else{

			document.getElementById("makeIt").style.display = "block";
	    enterValue = $scope.fetchData;

	    if(!enterValue){
				$scope.showTables = false;
	      return;
	    }
			$scope.showFavourites = true;
			$scope.showTables = false;
			$scope.showAlbums = false;
			$scope.showProgress = true;

			$http({
				method: 'GET',
				url: 'index.php?id=' + enterValue + '&type=user'
			}).then(function successCallback(response) {
				//console.log(response.data.data.length);
				if(response.data.data.length == 0){
					$scope.showProgress = false;
					alert("No data Found");
						return;
				}
	      if(response.data.data){
	        $scope.id = response.data.data;

					for(var i=0;i<$scope.id.length;i++){
						$scope.id[i].fav_type = "Users";
					}
	      }
				// else{
				// 	alert("No data Found");
				// 	return;
				// }
	      if(response.data.paging){
	        $scope.pagination = response.data.paging;
				if($scope.pagination.next && $scope.pagination.previous){
					console.log($scope.pagination.next + $scope.pagination.previous)
				$scope.nextButton = true;
				$scope.prevButton = true;
				}

				if($scope.pagination.next && !$scope.pagination.previous){
				$scope.nextButton = true;
				$scope.prevButton = false;
				}

				if(!$scope.pagination.next && $scope.pagination.previous){
				$scope.nextButton = false;
				$scope.prevButton = true;
				}
			}
				$scope.showProgress = false;
				$scope.showTables = true;

			}, function errorCallback(response) {});
		}

	}

	$scope.findPages = function () {
		//document.getElementById("hideIt").style.display = "none";
		document.getElementById("Favourites_section").style.display = "none";
		document.getElementById("noShow").style.display = "none";
		if((!$scope.fetchData || $scope.fetchData=="") && tempFlag == true){
			alert("Please enter the keyword");
		}
		else{
		document.getElementById("makeIt").style.display = "block";
		enterValue = $scope.fetchData;
		if(!enterValue){
			$scope.showTables = false;
			return;
		}
		$scope.showFavourites = true;
		$scope.showTables = false;
		$scope.showAlbums = false;
		$scope.showProgress = true;

		$http({
			method: 'GET',
			url: 'index.php?id=' + enterValue + '&type=page'
		}).then(function successCallback(response) {
			//console.log(response.data.data + "herte");
			if(response.data.data.length == 0){
				$scope.showProgress = false;
				alert("No data Found");
					return;
			}
			if(response.data.data){
				$scope.id = response.data.data;

				for(var i=0;i<$scope.id.length;i++){
					$scope.id[i].fav_type = "Pages";
				}
			}
			if(response.data.paging){
				$scope.pagination = response.data.paging;
			if($scope.pagination.next && $scope.pagination.previous){
				console.log($scope.pagination.next + $scope.pagination.previous)
			$scope.nextButton = true;
			$scope.prevButton = true;
			}

			if($scope.pagination.next && !$scope.pagination.previous){
			$scope.nextButton = true;
			$scope.prevButton = false;
			}

			if(!$scope.pagination.next && $scope.pagination.previous){
			$scope.nextButton = false;
			$scope.prevButton = true;
			}
		}
			$scope.showProgress = false;
			$scope.showTables = true;

		}, function errorCallback(response) {});}

	}

	$scope.findEvents = function () {
		//document.getElementById("hideIt").style.display = "none";
		document.getElementById("Favourites_section").style.display = "none";
		document.getElementById("noShow").style.display = "none";
		if((!$scope.fetchData || $scope.fetchData=="") && tempFlag == true){
			alert("Please enter the keyword");
		}
		else{
		document.getElementById("makeIt").style.display = "block";
		enterValue = $scope.fetchData;
		if(!enterValue){
			$scope.showTables = false;
			return;
		}
		$scope.showFavourites = true;
		$scope.showTables = false;
		$scope.showAlbums = false;
		$scope.showProgress = true;

		$http({
			method: 'GET',
			url: 'index.php?id=' + enterValue + '&type=event'
		}).then(function successCallback(response) {
			//console.log(response.data.data + "herte");
			if(response.data.data.length == 0){
				$scope.showProgress = false;
				alert("No data Found");
					return;
			}
			if(response.data.data){
				$scope.id = response.data.data;

				for(var i=0;i<$scope.id.length;i++){
					$scope.id[i].fav_type = "Events";
				}
			}
			if(response.data.paging){
				$scope.pagination = response.data.paging;
			if($scope.pagination.next && $scope.pagination.previous){
				console.log($scope.pagination.next + $scope.pagination.previous)
			$scope.nextButton = true;
			$scope.prevButton = true;
			}

			if($scope.pagination.next && !$scope.pagination.previous){
			$scope.nextButton = true;
			$scope.prevButton = false;
			}

			if(!$scope.pagination.next && $scope.pagination.previous){
			$scope.nextButton = false;
			$scope.prevButton = true;
			}
		}
			$scope.showProgress = false;
			$scope.showTables = true;

		}, function errorCallback(response) {});}
	}

	$scope.findPlaces = function () {
		//document.getElementById("hideIt").style.display = "none";
		document.getElementById("Favourites_section").style.display = "none";
		document.getElementById("noShow").style.display = "none";
		if((!$scope.fetchData || $scope.fetchData=="") && tempFlag == true){
			alert("Please enter the keyword");
		}
		else{
			document.getElementById("makeIt").style.display = "block";
	    enterValue = $scope.fetchData;
	    if(!enterValue){
				$scope.showTables = false;
	      return;
	    }
			$scope.showFavourites = true;
			$scope.showTables = false;
			$scope.showAlbums = false;
			$scope.showProgress = true;

			$http({
				method: 'GET',
				url: 'index.php?id=' + enterValue + '&type=place' + '&lat1=' + lat + '&long1=' + long
			}).then(function successCallback(response) {
				if(response.data.data.length == 0){
					$scope.showProgress = false;
					alert("No data Found");
						return;
				}
	      if(response.data.data){
	        $scope.id = response.data.data;

					for(var i=0;i<$scope.id.length;i++){
						$scope.id[i].fav_type = "Places";
					}
	      }
	      if(response.data.paging){
	        $scope.pagination = response.data.paging;
				if($scope.pagination.next && $scope.pagination.previous){
					console.log($scope.pagination.next + $scope.pagination.previous)
				$scope.nextButton = true;
				$scope.prevButton = true;
				}

				if($scope.pagination.next && !$scope.pagination.previous){
				$scope.nextButton = true;
				$scope.prevButton = false;
				}

				if(!$scope.pagination.next && $scope.pagination.previous){
				$scope.nextButton = false;
				$scope.prevButton = true;
				}
			}
				$scope.showProgress = false;
				$scope.showTables = true;

		}, function errorCallback(response) {});}
	}

	$scope.findGroups = function () {
		//document.getElementById("hideIt").style.display = "none";
		document.getElementById("noShow").style.display = "none";
		document.getElementById("Favourites_section").style.display = "none";
		if((!$scope.fetchData || $scope.fetchData=="") && tempFlag == true){
			alert("Please enter the keyword");
		}
		else{
		document.getElementById("makeIt").style.display = "block";
    enterValue = $scope.fetchData;
    if(!enterValue){
			$scope.showTables = false;
      return;
    }
		$scope.showFavourites = true;
		$scope.showTables = false;
		$scope.showAlbums = false;
		$scope.showProgress = true;

		$http({
			method: 'GET',
			url: 'index.php?id=' + enterValue + '&type=group'
		}).then(function successCallback(response) {
			//console.log(response.data.data + "herte");
			if(response.data.data.length == 0){
				$scope.showProgress = false;
				alert("No data Found");
					return;
			}
      if(response.data.data){
        $scope.id = response.data.data;

				for(var i=0;i<$scope.id.length;i++){
					$scope.id[i].fav_type = "Groups";
				}
      }
      if(response.data.paging){
        $scope.pagination = response.data.paging;
			if($scope.pagination.next && $scope.pagination.previous){
				console.log($scope.pagination.next + $scope.pagination.previous)
			$scope.nextButton = true;
			$scope.prevButton = true;
			}

			if($scope.pagination.next && !$scope.pagination.previous){
			$scope.nextButton = true;
			$scope.prevButton = false;
			}

			if(!$scope.pagination.next && $scope.pagination.previous){
			$scope.nextButton = false;
			$scope.prevButton = true;
			}
		}
			$scope.showProgress = false;
			$scope.showTables = true;

		}, function errorCallback(response) {});}
	}

	$scope.nextUsers = function () {

		$http.get($scope.pagination.next).then(function (response) {

			//console.log($scope.fav_type);

      if(response.data.data){
        $scope.id = response.data.data;

				for(var i=0;i<$scope.id.length;i++){
					$scope.id[i].fav_type = $scope.chk;
				}

      }
      if(response.data.paging){
        $scope.pagination = response.data.paging;
      }

			if($scope.pagination.previous){
			$scope.prevButton = true;
			}
			else{
				$scope.prevButton = false;
			}

			if($scope.pagination.next){
			$scope.nextButton = true;
			}
			else{
				$scope.nextButton = false;
			}

		})
	}

	$scope.previousUsers = function () {

     $http.get($scope.pagination.previous).then(function (response) {
       if(response.data.data){
         $scope.id = response.data.data;
				 for(var i=0;i<$scope.id.length;i++){
 					$scope.id[i].fav_type = $scope.chk;
 				}
       }
       if(response.data.paging){
         $scope.pagination = response.data.paging;
       }

			 if($scope.pagination.next){
 			$scope.nextButton = true;
 			}
			else{
				$scope.nextButton = false;
			}

			if($scope.pagination.previous){
			$scope.prevButton = true;
			}
			else{
				$scope.prevButton = false;
			}
 		})
		}

	$scope.findDetails = function (req1) {
		document.getElementById("Favourites_section").style.display = "block";
		//document.getElementById("hideIt").style.display = "none";
		document.getElementById("noShow").style.display = "block";
		document.getElementById("albumDiv").style.display = "block";
		$scope.slidingBack = false;
		$scope.slidingWindow = true;
		$scope.albProgress = true;
		//$scope.postProgress = true;
		$scope.poProgress = true;
		$scope.noPic = false;
		$scope.isPicture = false;
		$scope.showTables = false;
		$scope.showFavourites = false;

		$scope.face = req1;
		$scope.current1 = req1;
		$scope.current2 = req1;
		albrequest = req1.id;

		$http({
			method: 'GET',
			url: 'index.php?albumid=' + albrequest
		}).then(function successCallback(response) {
			$scope.output = response;

			if (response.data.albums) {

				$scope.albProgress = false;
				$scope.noPic = false;
				$scope.isPicture = true;
				$scope.album = response.data.albums.data;
				$scope.firstAlbum = response.data.albums.data[0];

			} else {

				$scope.message = "No data found";
				$scope.isPicture = false;
				$scope.albProgress = false;
				$scope.noPic = true;

			}
			if (response.data.posts) {

				$scope.noPost = false;
				$scope.isPost = true;
				$scope.post = response.data.posts.data;
        var postArray = $scope.post;
        for(i=0;i<postArray.length;i++){

        $scope.post[i].created_time = moment($scope.post[i].created_time).format("YYYY-MM-DD HH:mm:ss")
				if(!$scope.post[i].message){
					if($scope.post[i].story){
						$scope.post[i].message = $scope.post[i].story;
					}
				}
        }

			} else {

				$scope.postMessage = "No data found";
				$scope.noPost = true;
				$scope.isPost = false;

			}
			$scope.showAlbums = true;


		}, function errorCallback(response) {});
		$scope.poProgress = false;
		$scope.albProgress = false;
	}

	$scope.facebookPost = function () {

		FB.init({
			appId: '124432528096965',
			xfbml: true,
			version: 'v2.8'
		});
		FB.ui({
			app_id: '124432528096965',
			method: 'feed',
			link: window.location.href,
			picture: $scope.face.picture.data.url,
			name: $scope.face.name,
			caption: 'FB SEARCH FROM USC CSCI 571',
			href: 'https://developers.facebook.com/docs/',
		}, function (response) {
			if (response && !response.error_message) {
				alert("Posted successfully");
			} else {
				alert("Not Posted");
			}
		});
	}

  $scope.pressClear = function(){
		document.getElementById("Favourites_section").style.display = "none";
    $scope.fetchData = "";
		$scope.showAlbums = false;
		$scope.showTables = false;
		$scope.showProgress = false;
		$scope.showFavourites = true;
		tempFlag = false;
		$('.nav.nav-tabs > li').removeClass("active");
		$("#tabone").addClass("active");
  }

  $scope.pressBack = function(){


			$scope.slidingWindow = false;
			$scope.slidingBack = true;
			$scope.showAlbums = false;
			$scope.showProgress = false;
			$scope.showTables = true;
			$scope.showFavourites = true;
	  }




});
