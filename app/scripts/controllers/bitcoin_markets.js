'use strict';

/**
 * @ngdoc function
 * @name myFirstAppApp.controller:bitcoinMarketCtrl
 * @description
 * # bitcoinMarketCtrl
 * Controller of the myFirstAppApp
 */

 /*, $http, ENV*/


function isDecimal(number) {
  return Math.floor(number) !== number;
}

angular.module('myFirstAppApp').filter('formatData', function(numberFilter) {
  return function(dataElement) {
    if (isNaN(dataElement)) {
      return dataElement;
    } else {
      if (!isDecimal(dataElement)) {
        return numberFilter(dataElement);
      } else {
        return numberFilter(dataElement, 3);
      }
    }
  };
})
  .controller('bitcoinMarketCtrl', function ($scope, $http, ENV) {
    $scope.awesomeThings = ['bilal' , 'chami'];

    $scope.collapseOptions = ['none', 'daily', 'weekly', 'monthly', 'quarterly', 'annual'];

    $scope.transformationOptions = ['none', 'diff', 'rdiff', 'cumul'];

    $scope.domain = ENV.DOMAIN_URL;

    var url = $scope.domain + 'services/bitcoinBaseEUR';

    var apiKey = 'DKczFdjuL_16KZVxeZKk';

    $scope.datasetCode = 'COINBASEEUR';
    $scope.databaseCode = 'BCHARTS';

    $scope.succeded = false;

    $scope.loading = false;

    $scope.startDate = new Date();
    $scope.endDate = new Date();
    //One year before
    $scope.startDate.setFullYear($scope.endDate.getFullYear() - 1);

    $scope.collapse = 'none';
    $scope.transformation = 'none';

    $scope.formatDate = function(date) {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '-' + (monthIndex + 1) + '-' + year;
    };

    $scope.clear = function() {
        $scope.succeded = false;
        $scope.chartContainer = document.getElementById('chartContainer');
        $scope.chartContainer.innerHTML = '';

        if ($scope.requestResponse !== undefined) {
            if ($scope.requestResponse.data !== undefined) {
                $scope.requestResponse.data.length = 0;
            }
        }
    };

    $scope.search = function() {
        $scope.clear();
        $scope.loading = true;

        document.body.className = 'stop-scrolling';


        var params = 'api_key=' + apiKey + '&dataset_code=' + $scope.datasetCode + '&database_code=' + $scope.databaseCode + '&start_date=' + $scope.formatDate($scope.startDate) + '&end_date=' + $scope.formatDate($scope.endDate) + '&collapse=' + $scope.collapse + '&transformation=' + $scope.transformation + '&order=asc';

        $http.get(url + '?' + params)
          .then(function(response) {
            $scope.requestResponse = response.data.dataset;
            $scope.stockName = response.data.dataset.name;
            $scope.newestAvailableDate = response.data.dataset.newest_available_date;
            $scope.oldestAvailableDate = response.data.dataset.oldest_available_date;
            $scope.succeded = true;
            $scope.loading = false;

            document.body.className = '';

            var labels = [];
            var openValues = [];
            var highValues = [];
            var lowValues = [];
            var closeValues = [];

            for (var i = 0; i < $scope.requestResponse.data.length; i++) {
              labels.push($scope.requestResponse.data[i][0]);
              openValues.push($scope.requestResponse.data[i][1]);
              highValues.push($scope.requestResponse.data[i][2]);
              lowValues.push($scope.requestResponse.data[i][3]);
              closeValues.push($scope.requestResponse.data[i][4]);
            }

            $scope.drawChart(labels, openValues, highValues, lowValues, closeValues);

          });

      };

        $scope.capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        $scope.drawChart = function(labels, openValues, highValues, lowValues, closeValues) {
            $scope.chartContainer = document.getElementById('chartContainer');

            var ctx = document.createElement('canvas');
            ctx.width = 500;
            ctx.height = 250;
            ctx.id = 'myChart';

            $scope.chartContainer.appendChild(ctx);

            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Open Values',
                  data: openValues,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 2,
                  fill: false
                }, {
                  label: 'High Values',
                  data: highValues,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2,
                  fill: false
                }, {
                  label: 'Low Values',
                  data: lowValues,
                  backgroundColor: 'rgba(255, 206, 86, 0.2)',
                  borderColor: 'rgba(255, 206, 86, 1)',
                  borderWidth: 2,
                  fill: false
                }, {
                  label: 'Close Values',
                  data: closeValues,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  fill: false
                }]
              },
              options: {
                elements: {
                    point: {
                        radius: 2
                    }
                },
                title: {
                  display: true,
                  text: $scope.stockName + ' Price Variation From "' + $scope.formatDate($scope.startDate) + '" To "' + $scope.formatDate($scope.endDate) + '" - Collapse: ' + $scope.capitalizeFirstLetter($scope.collapse)
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: false
                    }
                  }]
                }
              }
            });
            myChart.update();

          };

  });