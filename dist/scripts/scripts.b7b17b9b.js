"use strict";function isDecimal(a){return Math.floor(a)!==a}angular.module("myFirstAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","config"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/quandl_time_series",{templateUrl:"views/quandl_time_series.html",controller:"quandlCtrl",controllerAs:"quandl"}).otherwise({redirectTo:"/"})}]),angular.module("myFirstAppApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=[{title:"HTML5 Boilerplate",description:"HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."},{title:"AngularJS",description:"AngularJS is a toolset for building the framework most suited to your application development."},{title:"Karma",description:"Spectacular Test Runner for JavaScript."}]}]),angular.module("myFirstAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("myFirstAppApp").filter("formatData",["numberFilter",function(a){return function(b){return isNaN(b)?b:isDecimal(b)?a(b,3):a(b)}}]).controller("quandlCtrl",["$scope","$http","ENV",function(a,b,c){a.collapseOptions=["none","daily","weekly","monthly","quarterly","annual"],a.transformationOptions=["none","diff","rdiff","rdiff_from","cumul","normalize"],a.orderOptions=["asc","desc"];var d=c.DOMAIN_URL;console.log(d);var e=d+"/dummyRequest",f="DKczFdjuL_16KZVxeZKk";a.datasetCode="AAPL",a.databaseCode="WIKI",a.succeded=!1,a.loading=!1,a.startDate=new Date,a.endDate=new Date,a.startDate.setFullYear(a.endDate.getFullYear()-1),a.order="asc",a.collapse="none",a.transformation="none",a.limit=0,a.colIndex=-1,a.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+"-"+(c+1)+"-"+d},a.capitalizeFirstLetter=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},a.clear=function(){a.succeded=!1,a.chartContainer=document.getElementById("chartContainer"),a.chartContainer.innerHTML="",void 0!==a.requestResponse&&void 0!==a.requestResponse.data&&(a.requestResponse.data.length=0)},a.search=function(){a.clear(),a.loading=!0;var c="api_key="+f+"&dataset_code="+a.datasetCode+"&database_code="+a.databaseCode+"&start_date="+a.formatDate(a.startDate)+"&end_date="+a.formatDate(a.endDate)+"&order="+a.order+"&collapse="+a.collapse+"&transformation="+a.transformation;a.limit>0&&(c=c+"&limit="+a.limit),-1!==a.colIndex&&(c=c+"&column_index="+a.colIndex),b.get(e+"?"+c).then(function(b){a.requestResponse=b.data.dataset,a.stockName=b.data.dataset.name,a.newestAvailableDate=b.data.dataset.newest_available_date,a.oldestAvailableDate=b.data.dataset.oldest_available_date,a.succeded=!0,a.loading=!1;for(var c=[],d=[],e=[],f=[],g=[],h=0;h<a.requestResponse.data.length;h++)c.push(a.requestResponse.data[h][0]),d.push(a.requestResponse.data[h][1]),e.push(a.requestResponse.data[h][2]),f.push(a.requestResponse.data[h][3]),g.push(a.requestResponse.data[h][4]);a.drawChart(c,d,e,f,g)})},a.drawChart=function(b,c,d,e,f){a.chartContainer=document.getElementById("chartContainer");var g=document.createElement("canvas");g.width=500,g.height=250,g.id="myChart",a.chartContainer.appendChild(g);var h=new Chart(g,{type:"line",data:{labels:b,datasets:[{label:"Open Values",data:c,backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1,fill:!1},{label:"High Values",data:d,backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:1,fill:!1},{label:"Low Values",data:e,backgroundColor:"rgba(255, 206, 86, 0.2)",borderColor:"rgba(255, 206, 86, 1)",borderWidth:1,fill:!1},{label:"Close Values",data:f,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1,fill:!1}]},options:{title:{display:!0,text:a.datasetCode+' Stock Price Variation From "'+a.formatDate(a.startDate)+'" To "'+a.formatDate(a.endDate)+'" - Collapse: '+a.capitalizeFirstLetter(a.collapse)},scales:{yAxes:[{ticks:{beginAtZero:!1}}]}}});h.update()}}]),angular.module("myFirstAppApp").run(["$templateCache",function(a){a.put("views/about.html",'<div ng-controller="AboutCtrl"> <p>This is the about view.</p> <h2>The awesome things are:</h2> <div ng-repeat="thing in awesomeThings"> <p>{{ thing }}</p> </div> </div>'),a.put("views/main.html",'<!-- <div class="jumbotron" ng-controller="MainCtrl">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#!/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div>--> <div class="row"> <h1 class="text-center">DataViz</h1> <hr> <ul> <li><h4><a ng-href="#!/quandl_time_series">Quandl Time Series</a></h4></li> </ul> </div>'),a.put("views/quandl_time_series.html",'<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script> <style type="text/css">.spin-rotation {\r\n		animation-name: spin;\r\n		animation-duration: 4000ms;\r\n		animation-iteration-count: infinite;\r\n		animation-timing-function: linear;\r\n	}\r\n\r\n	.loader {\r\n		border: 6px solid #f3f3f3;\r\n		-webkit-animation: spin 1s linear infinite;\r\n		animation: spin 1s linear infinite;\r\n		border-top: 6px solid #555;\r\n		border-radius: 50%;\r\n		width: 60px;\r\n		height: 60px;\r\n		margin-left: 20%;\r\n		display: inline-block;\r\n	}\r\n\r\n	@keyframes spin {\r\n		from {transform: rotate(0deg);}\r\n		to {transform: rotate(360deg);}\r\n	}</style> <div ng-app="quandlTimeSeriesApp" ng-controller="quandlCtrl"> <div class="row"> <div style="background-color: rgba(128, 128, 128, 0.5); width: 100%; height: 100%; margin: 0; top: 0; left: 0; position: absolute; z-index: 1" ng-show="loading"> <div style="position: absolute; top: 45%; left: 45%; font-size: xx-large"> <div class="loader"></div> <span>Loading...</span> </div> </div> <h1 class="text-center">Quandl Time Series API</h1> <div class="col-md-12"> <form> <div class="form-group col-md-2 col-md-offset-1"> <label>Database Code: </label> <input type="text" name="databaseCode" ng-model="databaseCode" class="form-control"> <label>Dataset Code: </label> <input type="text" name="datasetCode" ng-model="datasetCode" class="form-control"> </div> <div class="form-group col-md-2"> <label class="block-label">Start Date: </label> <input type="date" name="startDate" ng-model="startDate" class="form-control"> <label class="block-label">End Date: </label> <input type="date" name="endDate" ng-model="endDate" class="form-control"> </div> <div class="form-group col-md-2"> <label class="block-label">Limit: </label> <input type="number" name="limit" ng-model="limit" min="0" class="form-control"> <label class="block-label">Column Index:</label> <input type="number" name="colIndex" ng-model="colIndex" min="-1" class="form-control"> </div> <div class="form-group col-md-2"> <label class="block-label">Order:</label> <select ng-model="order" ng-options="x for x in orderOptions" class="form-control"></select> <label class="block-label">Collapse:</label> <select ng-model="collapse" ng-options="x for x in collapseOptions" class="form-control"></select> </div> <div class="form-group col-md-2"> <label class="block-label"> Transformation:</label> <select ng-model="transformation" ng-options="x for x in transformationOptions" class="form-control"></select> <label class="block-label">&nbsp;</label> <div> <div class="col-md-6" style="padding-right: 2px; padding-left: 0"> <button ng-click="search()" class="btn btn-success btn-block">Search</button> </div> <div class="col-md-6" style="padding-right: 0px; padding-left: 2px"> <button ng-click="clear()" class="btn btn-danger btn-block">Clear</button> </div> </div> </div> </form> </div> <div ng-show="succeded" class="col-md-12"> <hr> <h3>{{ stockName }}</h3> <p> <b>Newest Available Date:</b> {{ newestAvailableDate }} </p> <p> <b>Oldest Available Date:</b> {{ oldestAvailableDate }} </p> <!-- <p id="request-description"></p> --> <hr> </div> <div> <table ng-show="succeded" id="myTable" class="table table-hover table-bordered text-center"> <thead> <tr> <th class="text-center">Index</th> <th ng-repeat="column in requestResponse.column_names" class="text-center"> {{ column }}</th> </tr> </thead> <tr ng-repeat="dataElement in requestResponse.data"> <td><b>{{ $index+1 }}</b></td> <td ng-repeat="dataCol in dataElement track by $index"> {{ dataCol | formatData }}</td> </tr> <thead> <tr> <th class="text-center">Total</th> <th colspan="{{requestResponse.column_names.length}}" class="text-center"> {{ requestResponse.data.length }}</th> </tr> </thead> </table> </div> <div style="width: 100%" id="chartContainer" ng-show="succeded" class="col-md-12"> </div> </div> </div>')}]);