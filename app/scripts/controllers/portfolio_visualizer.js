'use strict';

/**
 * @ngdoc function
 * @name myFirstAppApp.controller:portfolioVisualizerCtrl
 * @description
 * # portfolioVisualizerCtrl
 * Controller of the myFirstAppApp
 */

angular.module('myFirstAppApp')
.controller('portfolioVisualizerCtrl', function ($scope, ENV, $http) {
	$scope.portfolios = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	$scope.formatDate = function(date) {
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return day + '-' + (monthIndex + 1) + '-' + year;
	};
/*
	class AssetData {

		constructor(date, open, high, low, close, volume, adjClose, previousAssetData) {
			this.date = date;
			this.open = open;
			this.high = high;
			this.low = low;
			this.close = close;
			this.volume = volume;
			this.adjClose = adjClose;
			this.previousAssetData = previousAssetData;
		}

		getDailyReturn() {
			var result = 0;
			if(this.previousAssetData!==null){
				result = (this.adjClose - this.previousAssetData.adjClose)/this.previousAssetData.adjClose;
			}
			return result;
		}
		
	}

	class Asset {

		constructor(startDate, endDate, weight, data, name, code) {
			this.startDate = startDate;
			this.endDate = endDate;
			this.weight = weight;
			this.data = data;
			this.name = name;
			this.code = code;
		}

		getAvgReturn() {
			var sum = 0;
			for (var i = 0; i < this.data.length; i++) {
				sum += this.data[i].getDailyReturn();
			}
			return sum/this.data.length;
		}

		getBeta(){
			
		}

		getVariance(){
			var sum = 0;
			for (var i = 0; i < this.data.length; i++) {
				// Math.sqrt(((this.data[i].getDailyReturn() - this.getAvgReturn())^2)/this.data.length);
				sum += Math.pow((this.data[i].getDailyReturn() - this.getAvgReturn()),2);
			}
			console.log('asd ' + this.getAvgReturn());
			return sum/this.data.length;
		}

		getStd(){
			return Math.sqrt(this.getVariance());
		}

		getExpectedRetrun(){
			
		}

	}


	class Portfolio {

		constructor(assets, name, date) {
			this.assets = assets;
			this.name = name;
			this.date = date;
		}

		getVarCovMatrix(){

		}

		getCorMatrix(){

		}

		getBeta(){

		}
	}

	$scope.assetList = [];

	var assetData2 = new AssetData(new Date('2017-01-03'), 115.850, 116.510, 115.750, 116.020, 123, 115.173210, null);
	var assetData1 = new AssetData(new Date('2017-01-04'), 115.850, 116.510, 115.750, 116.020, 123, 115.044304, assetData2);
	
	var asset1 = new Asset(new Date('2016-01-03'), new Date('2017-01-03'), 0.2, [assetData1, assetData2], 'Asset1', 'AMZN');

	var portfolio = new Portfolio();
	console.log(portfolio);
	console.log(assetData1.getDailyReturn());
	console.log(asset1.getAvgReturn());
	console.log(ENV);
	console.log(asset1.getVariance());

	$scope.domain = ENV.DOMAIN_URL;

	var url = $scope.domain + 'services/dummyRequest';

	var apiKey = 'DKczFdjuL_16KZVxeZKk';

	$scope.databaseCode = 'WIKI';
	// $scope.datasetCode = 'AAPL';
	$scope.datasetCode = $scope.assetCode;

	$scope.startDate = new Date('2016-01-03');
	$scope.endDate = new Date('2017-01-03');

	$scope.assetDataList = [];
*/
	function search() {
		
		
		var params = 'api_key=' + apiKey + '&dataset_code=' + $scope.datasetCode + '&database_code=' + $scope.databaseCode + '&start_date=' + $scope.formatDate($scope.startDate) + '&end_date=' + $scope.formatDate($scope.endDate)  + '&order=asc&collapse=none&transformation=none' + $scope.transformation;

		if ($scope.limit > 0) {
			params = params + '&limit=' + $scope.limit;
		}
		if ($scope.colIndex !== -1) {
			params = params + '&column_index=' + $scope.colIndex;
		}

		$http.get(url + '?' + params).then(function(response) {
			
			$scope.requestResponse = response.data.dataset;
			$scope.stockName = response.data.dataset.name;
			$scope.newestAvailableDate = response.data.dataset.newest_available_date;
			$scope.oldestAvailableDate = response.data.dataset.oldest_available_date;
			
			var labels = [];
			var openValues = [];
			var highValues = [];
			var lowValues = [];
			var closeValues = [];

			var openValuesAdj = [];
			var highValuesAdj = [];
			var lowValuesAdj = [];
			var closeValuesAdj = [];

			var currentAssetData = null;
			var previousAssetData = null;

			for (var i = 0; i < $scope.requestResponse.data.length; i++) {
				labels.push($scope.requestResponse.data[i][0]);
				openValues.push($scope.requestResponse.data[i][1]);
				highValues.push($scope.requestResponse.data[i][2]);
				lowValues.push($scope.requestResponse.data[i][3]);
				closeValues.push($scope.requestResponse.data[i][4]);


				openValuesAdj.push($scope.requestResponse.data[i][8]);
				highValuesAdj.push($scope.requestResponse.data[i][9]);
				lowValuesAdj.push($scope.requestResponse.data[i][10]);
				closeValuesAdj.push($scope.requestResponse.data[i][11]);

				currentAssetData = new AssetData($scope.requestResponse.data[i][0],
												$scope.requestResponse.data[i][1],
												$scope.requestResponse.data[i][2],
												$scope.requestResponse.data[i][3],
												$scope.requestResponse.data[i][4],
												$scope.requestResponse.data[i][5],
												$scope.requestResponse.data[i][11], previousAssetData);
				
				$scope.assetDataList.push(currentAssetData);

				previousAssetData = currentAssetData;

			}

			console.log($scope.requestResponse);
			console.log($scope.assetDataList);

			var asset2 = new Asset($scope.startDate, $scope.endDate, 0.2, $scope.assetDataList, 'Asset2', $scope.datasetCode );
			console.log(asset2);
			console.log(asset2.getAvgReturn());
		});
	}

	$scope.addAssetToPortfolio = function(){
		$scope.datasetCode = $scope.assetCode;
		search();
		console.log($scope.assetCode);
		console.log($scope.assetStartDate);
		console.log($scope.assetEndDate);
	};

	// search();

});