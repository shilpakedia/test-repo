var myApp= angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope, $http){
 console.log("controller is established");
 
	//$scope.options = [{ name: "Open", id: 1 }, { name: "Close", id: 2 }];
	//$scope.options = [{name:"Open"},{name:"Close"}];
	$scope.id="";
	$scope.Eowner="";
	$scope.EcDate="";
	$scope.EeDate="";
	$scope.Estatus="";
	$scope.Eremark="";
	$scope.Etask="";
		
		//$scope.SEARCH={};
		$scope.Contact = {};
		
 		//******************Display Functionality*********************		
		$http.get('/contactlist').success(function(response){
		//console.log("I got the data I requested");
		$scope.contactlist=response;
     
		});

		//******************Insert Functionality*********************
		$scope.addRecord = function(){
			$http.post('/contactlist', $scope.Contact).success(function(response){
				$http.get('/contactlist').success(function(response){
					$scope.contactlist = response;			 
				});
			});
		};

		//******************HideButton Functionality*********************
		$scope.toEdit=true;
		$scope.toInsert=true;
		$scope.toUpdate=false;
		$scope.toCancel=false;
		
		$scope.hide= function(Contact)
		{
			$scope.toEdit = !$scope.toEdit;
			$scope.toInsert = !$scope.toInsert;
			$scope.toUpdate = !$scope.toUpdate;
			$scope.toCancel = !$scope.toCancel;
			
			$scope.Contact.id = Contact._id;
			$scope.Contact.owner = Contact.owner;
			$scope.Contact.createDate = new Date(Contact.createDate);
			$scope.Contact.endDate = new Date(Contact.endDate);
			$scope.Contact.status = Contact.status;
			$scope.Contact.remark = Contact.remark;
			$scope.Contact.task = Contact.task;
		}
		
		$scope.cancel = function(id){
			$scope.toEdit = !$scope.toEdit;
			$scope.toInsert = !$scope.toInsert;
			$scope.toUpdate = !$scope.toUpdate;
			$scope.toCancel = !$scope.toCancel;
			
			//Clear all the data
			
			//$route.reload();
			//$window.location.reload();
		};
		
		//******************Edit/Update Functionality*********************

		$scope.edit = function(Contact){
			$http.put('/contactlist', $scope.Contact).success(function(response){
				$http.get('/contactlist').success(function(response){
					$scope.contactlist = response;			 
				});
			});
		};
		
		//******************Delete Functionality*********************
		$scope.remove =function(id){
		
			$http.delete('/contactlist/' + id).success(function(response){
				$http.get('/contactlist').success(function(response){
					$scope.contactlist = response;
				});
			});
		};
}]);