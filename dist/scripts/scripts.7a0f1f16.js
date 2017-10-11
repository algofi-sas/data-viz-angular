"use strict";function isDecimal(a){return Math.floor(a)!==a}function isDecimal(a){return Math.floor(a)!==a}var myApp=angular.module("myFirstAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","config"]);myApp.run(["$rootScope","$route",function(a,b){a.$on("$routeChangeSuccess",function(){document.title=b.current.title})}]),myApp.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",title:"Home"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about",title:"About"}).when("/quandl_time_series",{templateUrl:"views/quandl_time_series.html",controller:"quandlCtrl",controllerAs:"quandl",title:"Quandl Time Series"}).when("/bitcoin_markets",{templateUrl:"views/bitcoin_markets.html",controller:"bitcoinMarketCtrl",controllerAs:"bitcoin_markets",title:"Bitcoin Markets"}).when("/portfolio_visualizer",{templateUrl:"views/portfolio_visualizer.html",controller:"portfolioVisualizerCtrl",controllerAs:"portfolio_visualizer",title:"Portfolio Visualizer"}).otherwise({redirectTo:"/"})}]),angular.module("myFirstAppApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=[{title:"HTML5 Boilerplate",description:"HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."},{title:"AngularJS",description:"AngularJS is a toolset for building the framework most suited to your application development."},{title:"Karma",description:"Spectacular Test Runner for JavaScript."}]}]),angular.module("myFirstAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("myFirstAppApp").filter("formatData",["numberFilter",function(a){return function(b){return isNaN(b)?b:isDecimal(b)?a(b,3):a(b)}}]).controller("quandlCtrl",["$scope","$http","ENV",function(a,b,c){a.collapseOptions=["none","daily","weekly","monthly","quarterly","annual"],a.transformationOptions=["none","diff","rdiff","rdiff_from","cumul","normalize"],a.orderOptions=["asc","desc"],a.domain=c.DOMAIN_URL;var d=a.domain+"services/dummyRequest",e="DKczFdjuL_16KZVxeZKk";a.datasetCode="AAPL",a.databaseCode="WIKI",a.succeded=!1,a.loading=!1,a.startDate=new Date,a.endDate=new Date,a.startDate.setFullYear(a.endDate.getFullYear()-1),a.order="asc",a.collapse="none",a.transformation="none",a.limit=0,a.colIndex=-1,a.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+"-"+(c+1)+"-"+d},a.capitalizeFirstLetter=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},a.clear=function(){a.succeded=!1,a.chartContainer=document.getElementById("chartContainer"),a.chartContainer.innerHTML="",a.chartContainerAdj=document.getElementById("chartContainerAdj"),a.chartContainerAdj.innerHTML="",void 0!==a.requestResponse&&void 0!==a.requestResponse.data&&(a.requestResponse.data.length=0)},a.search=function(){a.clear(),a.loading=!0,document.body.className="stop-scrolling";var c="api_key="+e+"&dataset_code="+a.datasetCode+"&database_code="+a.databaseCode+"&start_date="+a.formatDate(a.startDate)+"&end_date="+a.formatDate(a.endDate)+"&order="+a.order+"&collapse="+a.collapse+"&transformation="+a.transformation;a.limit>0&&(c=c+"&limit="+a.limit),-1!==a.colIndex&&(c=c+"&column_index="+a.colIndex),b.get(d+"?"+c).then(function(b){a.requestResponse=b.data.dataset,a.stockName=b.data.dataset.name,a.newestAvailableDate=b.data.dataset.newest_available_date,a.oldestAvailableDate=b.data.dataset.oldest_available_date,a.succeded=!0,a.loading=!1,document.body.className="";for(var c=[],d=[],e=[],f=[],g=[],h=[],i=[],j=[],k=[],l=0;l<a.requestResponse.data.length;l++)c.push(a.requestResponse.data[l][0]),d.push(a.requestResponse.data[l][1]),e.push(a.requestResponse.data[l][2]),f.push(a.requestResponse.data[l][3]),g.push(a.requestResponse.data[l][4]),h.push(a.requestResponse.data[l][8]),i.push(a.requestResponse.data[l][9]),j.push(a.requestResponse.data[l][10]),k.push(a.requestResponse.data[l][11]);a.drawChart(c,d,e,f,g),a.drawChartAdj(c,h,i,j,k)})},a.drawChart=function(b,c,d,e,f){a.chartContainer=document.getElementById("chartContainer");var g=document.createElement("canvas");g.width=500,g.height=250,g.id="myChart",a.chartContainer.appendChild(g);var h=new Chart(g,{type:"line",data:{labels:b,datasets:[{label:"Open Values",data:c,backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1,fill:!1},{label:"High Values",data:d,backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:1,fill:!1},{label:"Low Values",data:e,backgroundColor:"rgba(255, 206, 86, 0.2)",borderColor:"rgba(255, 206, 86, 1)",borderWidth:1,fill:!1},{label:"Close Values",data:f,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1,fill:!1}]},options:{title:{display:!0,text:a.datasetCode+' Stock Price Variation From "'+a.formatDate(a.startDate)+'" To "'+a.formatDate(a.endDate)+'" - Collapse: '+a.capitalizeFirstLetter(a.collapse)},scales:{yAxes:[{ticks:{beginAtZero:!1}}]}}});h.update()},a.drawChartAdj=function(b,c,d,e,f){a.chartContainer=document.getElementById("chartContainerAdj");var g=document.createElement("canvas");g.width=500,g.height=250,g.id="myChart",a.chartContainer.appendChild(g);var h=new Chart(g,{type:"line",data:{labels:b,datasets:[{label:"Adj. Open Values",data:c,backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1,fill:!1},{label:"Adj. High Values",data:d,backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:1,fill:!1},{label:"Adj. Low Values",data:e,backgroundColor:"rgba(255, 206, 86, 0.2)",borderColor:"rgba(255, 206, 86, 1)",borderWidth:1,fill:!1},{label:"Adj. Close Values",data:f,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1,fill:!1}]},options:{title:{display:!0,text:a.datasetCode+' Stock Price Variation From "'+a.formatDate(a.startDate)+'" To "'+a.formatDate(a.endDate)+'" - Collapse: '+a.capitalizeFirstLetter(a.collapse)},scales:{yAxes:[{ticks:{beginAtZero:!1}}]}}});h.update()}}]),angular.module("myFirstAppApp").filter("formatData",["numberFilter",function(a){return function(b){return isNaN(b)?b:isDecimal(b)?a(b,3):a(b)}}]).controller("bitcoinMarketCtrl",["$scope","$http","ENV",function(a,b,c){a.awesomeThings=["bilal","chami"],a.collapseOptions=["none","daily","weekly","monthly","quarterly","annual"],a.transformationOptions=["none","diff","rdiff","cumul"],a.domain=c.DOMAIN_URL;var d=a.domain+"services/bitcoinBaseEUR",e="DKczFdjuL_16KZVxeZKk";a.datasetCode="COINBASEEUR",a.databaseCode="BCHARTS",a.succeded=!1,a.loading=!1,a.startDate=new Date,a.endDate=new Date,a.startDate.setFullYear(a.endDate.getFullYear()-1),a.collapse="none",a.transformation="none",a.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+"-"+(c+1)+"-"+d},a.clear=function(){a.succeded=!1,a.chartContainer=document.getElementById("chartContainer"),a.chartContainer.innerHTML="",void 0!==a.requestResponse&&void 0!==a.requestResponse.data&&(a.requestResponse.data.length=0)},a.search=function(){a.clear(),a.loading=!0,document.body.className="stop-scrolling";var c="api_key="+e+"&dataset_code="+a.datasetCode+"&database_code="+a.databaseCode+"&start_date="+a.formatDate(a.startDate)+"&end_date="+a.formatDate(a.endDate)+"&collapse="+a.collapse+"&transformation="+a.transformation+"&order=asc";b.get(d+"?"+c).then(function(b){a.requestResponse=b.data.dataset,a.stockName=b.data.dataset.name,a.newestAvailableDate=b.data.dataset.newest_available_date,a.oldestAvailableDate=b.data.dataset.oldest_available_date,a.succeded=!0,a.loading=!1,document.body.className="";for(var c=[],d=[],e=[],f=[],g=[],h=0;h<a.requestResponse.data.length;h++)c.push(a.requestResponse.data[h][0]),d.push(a.requestResponse.data[h][1]),e.push(a.requestResponse.data[h][2]),f.push(a.requestResponse.data[h][3]),g.push(a.requestResponse.data[h][4]);a.drawChart(c,d,e,f,g)})},a.capitalizeFirstLetter=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},a.drawChart=function(b,c,d,e,f){a.chartContainer=document.getElementById("chartContainer");var g=document.createElement("canvas");g.width=500,g.height=250,g.id="myChart",a.chartContainer.appendChild(g);var h=new Chart(g,{type:"line",data:{labels:b,datasets:[{label:"Open Values",data:c,backgroundColor:"rgba(54, 162, 235, 0.2)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:2,fill:!1},{label:"High Values",data:d,backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255, 99, 132, 1)",borderWidth:2,fill:!1},{label:"Low Values",data:e,backgroundColor:"rgba(255, 206, 86, 0.2)",borderColor:"rgba(255, 206, 86, 1)",borderWidth:2,fill:!1},{label:"Close Values",data:f,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:2,fill:!1}]},options:{elements:{point:{radius:2}},title:{display:!0,text:a.stockName+' Price Variation From "'+a.formatDate(a.startDate)+'" To "'+a.formatDate(a.endDate)+'" - Collapse: '+a.capitalizeFirstLetter(a.collapse)},scales:{yAxes:[{ticks:{beginAtZero:!1}}]}}});h.update()}}]),angular.module("myFirstAppApp").controller("portfolioVisualizerCtrl",["$scope","ENV","$http",function(a,b,c){function d(){var b="api_key="+apiKey+"&dataset_code="+a.datasetCode+"&database_code="+a.databaseCode+"&start_date="+a.formatDate(a.startDate)+"&end_date="+a.formatDate(a.endDate)+"&order=asc&collapse=none&transformation=none"+a.transformation;a.limit>0&&(b=b+"&limit="+a.limit),-1!==a.colIndex&&(b=b+"&column_index="+a.colIndex),c.get(url+"?"+b).then(function(b){a.requestResponse=b.data.dataset,a.stockName=b.data.dataset.name,a.newestAvailableDate=b.data.dataset.newest_available_date,a.oldestAvailableDate=b.data.dataset.oldest_available_date;for(var c=[],d=[],e=[],f=[],g=[],h=[],i=[],j=[],k=[],l=null,m=null,n=0;n<a.requestResponse.data.length;n++)c.push(a.requestResponse.data[n][0]),d.push(a.requestResponse.data[n][1]),e.push(a.requestResponse.data[n][2]),f.push(a.requestResponse.data[n][3]),g.push(a.requestResponse.data[n][4]),h.push(a.requestResponse.data[n][8]),i.push(a.requestResponse.data[n][9]),j.push(a.requestResponse.data[n][10]),k.push(a.requestResponse.data[n][11]),l=new AssetData(a.requestResponse.data[n][0],a.requestResponse.data[n][1],a.requestResponse.data[n][2],a.requestResponse.data[n][3],a.requestResponse.data[n][4],a.requestResponse.data[n][5],a.requestResponse.data[n][11],m),a.assetDataList.push(l),m=l;console.log(a.requestResponse),console.log(a.assetDataList);var o=new Asset(a.startDate,a.endDate,.2,a.assetDataList,"Asset2",a.datasetCode);console.log(o),console.log(o.getAvgReturn())})}a.portfolios=["HTML5 Boilerplate","AngularJS","Karma"],a.formatDate=function(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return b+"-"+(c+1)+"-"+d},a.addAssetToPortfolio=function(){a.datasetCode=a.assetCode,d(),console.log(a.assetCode),console.log(a.assetStartDate),console.log(a.assetEndDate)}}]),angular.module("myFirstAppApp").run(["$templateCache",function(a){a.put("views/about.html",'<div ng-controller="AboutCtrl"> <p>This is the about view.</p> <h2>The awesome things are:</h2> <div ng-repeat="thing in awesomeThings"> <p>{{ thing }}</p> </div> </div>'),a.put("views/bitcoin_markets.html",'<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script> <style type="text/css">.spin-rotation {\n    animation-name: spin;\n    animation-duration: 4000ms;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear;\n  }\n\n  .loader {\n    border: 6px solid #f3f3f3;\n    -webkit-animation: spin 1s linear infinite;\n    animation: spin 1s linear infinite;\n    border-top: 6px solid #555;\n    border-radius: 50%;\n    width: 60px;\n    height: 60px;\n    margin-left: 20%;\n    display: inline-block;\n  }\n\n  #search-btn-div {\n    padding-right: 2px;\n    padding-left: 0px;\n  }\n\n  #cancel-btn-div {\n    padding-right: 0px;\n    padding-left: 2px;\n  }\n\n  @keyframes spin {\n    from {transform: rotate(0deg);}\n    to {transform: rotate(360deg);}\n  }\n  /* Responsive: Portrait tablets and up */\n  @media screen and (max-width: 991px) {\n\n    #cancel-btn-div, #search-btn-div {\n      padding-right: 0px;\n      padding-left: 0px;\n    }\n\n    #cancel-btn-div {\n      padding-top: 10px;\n    }\n\n  }\n\n  .nav-tabs a{\n    cursor: pointer;\n  }\n\n  .stop-scrolling {\n    height: 100%;\n    overflow: hidden;\n  }\n\n  .nav-tabs > li.active > a {\n    background-color: #337ab7;\n    color: #fff;\n    transition: background-color 0.5s ease;\n  }\n\n  .nav-tabs > li.active > a:hover {\n    transition: background-color 0.5s ease;\n    background-color: #4c91cd;\n    color: #fff;\n    cursor: pointer;\n  }\n\n  .nav-tabs>li {\n    width: 50%;\n    text-align: center;\n  }\n\n  /* Absolute Center Spinner */\n  .loading {\n    position: fixed;\n    z-index: 999;\n    height: 2em;\n    width: 2em;\n    overflow: show;\n    margin: auto;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n  }\n\n  /* Transparent Overlay */\n  .loading:before {\n    content: \'\';\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0,0,0,0.3);\n  }\n\n  /* :not(:required) hides these rules from IE9 and below */\n  .loading:not(:required) {\n    /* hide "loading..." text */\n    font: 0/0 a;\n    color: transparent;\n    text-shadow: none;\n    background-color: transparent;\n    border: 0;\n  }\n\n  .loading:not(:required):after {\n    content: \'\';\n    display: block;\n    font-size: 10px;\n    width: 1em;\n    height: 1em;\n    margin-top: -0.5em;\n    -webkit-animation: spinner 1500ms infinite linear;\n    -moz-animation: spinner 1500ms infinite linear;\n    -ms-animation: spinner 1500ms infinite linear;\n    -o-animation: spinner 1500ms infinite linear;\n    animation: spinner 1500ms infinite linear;\n    border-radius: 0.5em;\n    -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;\n    box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;\n  }\n\n  /* Animation */\n\n  @-webkit-keyframes spinner {\n    0% {\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -ms-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @-moz-keyframes spinner {\n    0% {\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -ms-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @-o-keyframes spinner {\n    0% {\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -ms-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes spinner {\n    0% {\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -ms-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }</style> <div ng-controller="bitcoinMarketCtrl"> <div class="row"> <div class="loading" ng-show="loading">Loading&#8230;</div> <h1 class="text-center">Bitcoin Markets</h1> <div class="col-md-12"> <form> <!--         <div class="form-group col-md-2">\n          <label>Database Code: </label>\n          <input type="text" name="databaseCode" ng-model="databaseCode" class="form-control" />\n          <label>Dataset Code: </label>\n          <input type="text" name="datasetCode" ng-model="datasetCode" class="form-control" />\n        </div> --> <div class="form-group col-md-4"> <label class="block-label">Start Date: </label> <input type="date" name="startDate" ng-model="startDate" class="form-control"> <label class="block-label">End Date: </label> <input type="date" name="endDate" ng-model="endDate" class="form-control"> </div> <div class="form-group col-md-4"> <label class="block-label">Collapse:</label> <select ng-model="collapse" ng-options="x for x in collapseOptions" class="form-control"></select> <!-- \n          <br>\n          div class="btn-group" data-toggle="buttons" style="display: block;">\n            <label class="btn btn-primary btn-sm" ng-repeat="option in collapseOptions">\n              <input type="radio" name="options" id="option1" autocomplete="off" > {{option}}\n            </label>\n          </div> --> <label class="block-label"> Transformation:</label> <select ng-model="transformation" ng-options="x for x in transformationOptions" class="form-control"></select> </div> <div class="form-group col-md-4"> <div class="col-md-12"> <label class="block-label">&nbsp;</label> <button ng-click="search()" class="btn btn-success btn-block">Search</button> </div> <div class="col-md-12"> <label class="block-label">&nbsp;</label> <button ng-click="clear()" class="btn btn-danger btn-block">Clear</button> </div> </div> </form></div>  </div> <div ng-show="succeded" class="col-md-12"> <hr> <h3>{{ stockName }}</h3> <p> <b>Newest Available Date:</b> {{ newestAvailableDate }} </p> <p> <b>Oldest Available Date:</b> {{ oldestAvailableDate }} </p> <!-- <p id="request-description"></p> --> <hr> </div> <!-- <div style="width: 100%;" id="chartContainer" ng-show="succeded" class="col-md-12"></div> --> <div class="col-md-12 table-responsive" ng-show="succeded" id="table-wrapper"> <div style="width: 100%" id="chartContainer" ng-show="succeded" class="col-md-12"></div> <br> <hr> <h2 class="text-center">Table Results</h2> <div style="overflow-x:auto"> <table id="myTable" class="table table-hover table-bordered text-center"> <thead> <tr> <th class="text-center">Index</th> <th ng-repeat="column in requestResponse.column_names" class="text-center" style="/*white-space: nowrap;*/"> {{ column }}</th> </tr> </thead> <tr ng-repeat="dataElement in requestResponse.data"> <td><b>{{ $index+1 }}</b></td> <td ng-repeat="dataCol in dataElement track by $index" style="white-space: nowrap"> {{ dataCol | formatData }}</td> </tr> <thead> <tr> <th class="text-center">Total</th> <th colspan="{{requestResponse.column_names.length}}" class="text-center"> {{ requestResponse.data.length }}</th> </tr> </thead> </table> </div> </div> </div> '),a.put("views/main.html",'<!-- <div class="jumbotron" ng-controller="MainCtrl">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#!/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div>--> <div class="row"> <h1 class="text-center"><img src="images/ALGOFI_LOGO.ad9ef732.svg" style="display: inline-block; padding-right: 10px; padding-bottom: 5px" width="50">DataViz</h1> <hr> <ul> <li><h4><a ng-href="#!/quandl_time_series">Quandl Time Series</a> <i class="fa fa-line-chart" aria-hidden="true"></i></h4></li> <li><h4><a ng-href="#!/bitcoin_markets">Bitcoin Market</a> (<i class="fa fa-btc" style="color: orange" aria-hidden="true"></i>)</h4></li> <li><h4><a ng-href="#!/portfolio_visualizer">Portfolio Viewer</a></h4></li> </ul> </div>'),a.put("views/portfolio_visualizer.html",'<div class="row"> <div ng-include="\'views/portfolio_fragments/add.htm\'"></div> </div>'),a.put("views/quandl_time_series.html",'<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script> <style type="text/css">.spin-rotation {\r\n		animation-name: spin;\r\n		animation-duration: 4000ms;\r\n		animation-iteration-count: infinite;\r\n		animation-timing-function: linear;\r\n	}\r\n\r\n	.loader {\r\n		border: 6px solid #f3f3f3;\r\n		-webkit-animation: spin 1s linear infinite;\r\n		animation: spin 1s linear infinite;\r\n		border-top: 6px solid #555;\r\n		border-radius: 50%;\r\n		width: 60px;\r\n		height: 60px;\r\n		margin-left: 20%;\r\n		display: inline-block;\r\n	}\r\n\r\n	#search-btn-div {\r\n		padding-right: 2px;\r\n		padding-left: 0px;\r\n	}\r\n\r\n	#cancel-btn-div {\r\n		padding-right: 0px;\r\n		padding-left: 2px;\r\n	}\r\n\r\n	@keyframes spin {\r\n		from {transform: rotate(0deg);}\r\n		to {transform: rotate(360deg);}\r\n	}\r\n	/* Responsive: Portrait tablets and up */\r\n	@media screen and (max-width: 991px) {\r\n\r\n		#cancel-btn-div, #search-btn-div {\r\n			padding-right: 0px;\r\n			padding-left: 0px;\r\n		}\r\n\r\n		#cancel-btn-div {\r\n			padding-top: 10px;\r\n		}\r\n\r\n	}\r\n\r\n	.nav-tabs a{\r\n		cursor: pointer;\r\n	}\r\n\r\n	.stop-scrolling {\r\n		height: 100%;\r\n		overflow: hidden;\r\n	}\r\n\r\n	.nav-tabs > li.active > a {\r\n		background-color: #337ab7;\r\n		color: #fff;\r\n		transition: background-color 0.5s ease;\r\n	}\r\n\r\n	.nav-tabs > li.active > a:hover {\r\n		transition: background-color 0.5s ease;\r\n		background-color: #4c91cd;\r\n		color: #fff;\r\n		cursor: pointer;\r\n	}\r\n\r\n	.nav-tabs>li {\r\n		width: 50%;\r\n		text-align: center;\r\n	}\r\n\r\n	/* Absolute Center Spinner */\r\n	.loading {\r\n		position: fixed;\r\n		z-index: 999;\r\n		height: 2em;\r\n		width: 2em;\r\n		overflow: show;\r\n		margin: auto;\r\n		top: 0;\r\n		left: 0;\r\n		bottom: 0;\r\n		right: 0;\r\n	}\r\n\r\n	/* Transparent Overlay */\r\n	.loading:before {\r\n		content: \'\';\r\n		display: block;\r\n		position: fixed;\r\n		top: 0;\r\n		left: 0;\r\n		width: 100%;\r\n		height: 100%;\r\n		background-color: rgba(0,0,0,0.3);\r\n	}\r\n\r\n	/* :not(:required) hides these rules from IE9 and below */\r\n	.loading:not(:required) {\r\n		/* hide "loading..." text */\r\n		font: 0/0 a;\r\n		color: transparent;\r\n		text-shadow: none;\r\n		background-color: transparent;\r\n		border: 0;\r\n	}\r\n\r\n	.loading:not(:required):after {\r\n		content: \'\';\r\n		display: block;\r\n		font-size: 10px;\r\n		width: 1em;\r\n		height: 1em;\r\n		margin-top: -0.5em;\r\n		-webkit-animation: spinner 1500ms infinite linear;\r\n		-moz-animation: spinner 1500ms infinite linear;\r\n		-ms-animation: spinner 1500ms infinite linear;\r\n		-o-animation: spinner 1500ms infinite linear;\r\n		animation: spinner 1500ms infinite linear;\r\n		border-radius: 0.5em;\r\n		-webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;\r\n		box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;\r\n	}\r\n\r\n	/* Animation */\r\n\r\n	@-webkit-keyframes spinner {\r\n	  0% {\r\n	    -webkit-transform: rotate(0deg);\r\n	    -moz-transform: rotate(0deg);\r\n	    -ms-transform: rotate(0deg);\r\n	    -o-transform: rotate(0deg);\r\n	    transform: rotate(0deg);\r\n	  }\r\n	  100% {\r\n	    -webkit-transform: rotate(360deg);\r\n	    -moz-transform: rotate(360deg);\r\n	    -ms-transform: rotate(360deg);\r\n	    -o-transform: rotate(360deg);\r\n	    transform: rotate(360deg);\r\n	  }\r\n	}\r\n	@-moz-keyframes spinner {\r\n	  0% {\r\n	    -webkit-transform: rotate(0deg);\r\n	    -moz-transform: rotate(0deg);\r\n	    -ms-transform: rotate(0deg);\r\n	    -o-transform: rotate(0deg);\r\n	    transform: rotate(0deg);\r\n	  }\r\n	  100% {\r\n	    -webkit-transform: rotate(360deg);\r\n	    -moz-transform: rotate(360deg);\r\n	    -ms-transform: rotate(360deg);\r\n	    -o-transform: rotate(360deg);\r\n	    transform: rotate(360deg);\r\n	  }\r\n	}\r\n	@-o-keyframes spinner {\r\n	  0% {\r\n	    -webkit-transform: rotate(0deg);\r\n	    -moz-transform: rotate(0deg);\r\n	    -ms-transform: rotate(0deg);\r\n	    -o-transform: rotate(0deg);\r\n	    transform: rotate(0deg);\r\n	  }\r\n	  100% {\r\n	    -webkit-transform: rotate(360deg);\r\n	    -moz-transform: rotate(360deg);\r\n	    -ms-transform: rotate(360deg);\r\n	    -o-transform: rotate(360deg);\r\n	    transform: rotate(360deg);\r\n	  }\r\n	}\r\n	@keyframes spinner {\r\n	  0% {\r\n	    -webkit-transform: rotate(0deg);\r\n	    -moz-transform: rotate(0deg);\r\n	    -ms-transform: rotate(0deg);\r\n	    -o-transform: rotate(0deg);\r\n	    transform: rotate(0deg);\r\n	  }\r\n	  100% {\r\n	    -webkit-transform: rotate(360deg);\r\n	    -moz-transform: rotate(360deg);\r\n	    -ms-transform: rotate(360deg);\r\n	    -o-transform: rotate(360deg);\r\n	    transform: rotate(360deg);\r\n	  }\r\n	}</style> <div ng-app="quandlTimeSeriesApp" ng-controller="quandlCtrl"> <div class="row"> <div class="loading" ng-show="loading">Loading&#8230;</div> <!-- <div\r\n			style="background-color: rgba(128, 128, 128, 0.5); width: 100%; height: 100%; margin: 0; top: 0; left: 0; position: absolute; z-index: 1;"\r\n			ng-show="loading">\r\n			<div\r\n				style="position: absolute; top: 45%; left: 45%; font-size: xx-large;">\r\n				<div class="loader"></div>\r\n				<span>Loading...</span>\r\n			</div>\r\n		</div> --> <h1 class="text-center">Quandl Time Series API</h1> <div class="col-md-12"> <form> <div class="form-group col-md-2 col-md-offset-1"> <label>Database Code: </label> <input type="text" name="databaseCode" ng-model="databaseCode" class="form-control"> <label>Dataset Code: </label> <input type="text" name="datasetCode" ng-model="datasetCode" class="form-control"> </div> <div class="form-group col-md-2"> <label class="block-label">Start Date: </label> <input type="date" name="startDate" ng-model="startDate" class="form-control"> <label class="block-label">End Date: </label> <input type="date" name="endDate" ng-model="endDate" class="form-control"> </div> <div class="form-group col-md-2"> <label class="block-label">Limit: </label> <input type="number" name="limit" ng-model="limit" min="0" class="form-control"> <!-- <label class="block-label">Column Index:</label>	\r\n					<input type="number" name="colIndex" ng-model="colIndex" min="-1" class="form-control" /> --> <label class="block-label">Order:</label> <select ng-model="order" ng-options="x for x in orderOptions" class="form-control"></select> </div> <div class="form-group col-md-2"> <label class="block-label">Collapse:</label> <select ng-model="collapse" ng-options="x for x in collapseOptions" class="form-control"></select> <label class="block-label"> Transformation:</label> <select ng-model="transformation" ng-options="x for x in transformationOptions" class="form-control"></select> </div> <div class="form-group col-md-2"> <div class="col-md-12"> <label class="block-label">&nbsp;</label> <button ng-click="search()" class="btn btn-success btn-block">Search</button> </div> <div class="col-md-12"> <label class="block-label">&nbsp;</label> <button ng-click="clear()" class="btn btn-danger btn-block">Clear</button> </div> <!-- <div class="col-md-6" id="search-btn-div">\r\n							\r\n						</div> --> <!-- <div class="col-md-6" id="cancel-btn-div">\r\n							<button ng-click="clear()" class="btn btn-danger btn-block">Clear</button>\r\n						</div> --> </div> </form></div>  </div> <div ng-show="succeded" class="col-md-12"> <hr> <h3>{{ stockName }}</h3> <p> <b>Newest Available Date:</b> {{ newestAvailableDate }} </p> <p> <b>Oldest Available Date:</b> {{ oldestAvailableDate }} </p> <!-- <p id="request-description"></p> --> <hr> </div> <!-- <div style="width: 100%;" id="chartContainer" ng-show="succeded" class="col-md-12"></div> --> <div class="col-md-12 table-responsive" ng-show="succeded" id="table-wrapper"> <ul class="nav nav-tabs"> <li class="active"><a data-toggle="tab" data-target="#values">Unadjusted Values</a></li> <li><a data-toggle="tab" data-target="#adjustedValues">Adjusted Values</a></li> </ul> <div class="tab-content"> <div id="values" class="tab-pane fade in active"> <h3 class="text-center">Unadjusted Values</h3> <div style="width: 100%" id="chartContainer" ng-show="succeded" class="col-md-12"></div> </div> <div id="adjustedValues" class="tab-pane fade"> <h3 class="text-center">Adjusted Values</h3> <div style="width: 100%" id="chartContainerAdj" ng-show="succeded" class="col-md-12"></div> </div> </div> <br> <hr> <h2 class="text-center">Table Results</h2> <div style="overflow-x:auto"> <table id="myTable" class="table table-hover table-bordered text-center"> <thead> <tr> <th class="text-center">Index</th> <th ng-repeat="column in requestResponse.column_names" class="text-center" style="/*white-space: nowrap;*/"> {{ column }}</th> </tr> </thead> <tr ng-repeat="dataElement in requestResponse.data"> <td><b>{{ $index+1 }}</b></td> <td ng-repeat="dataCol in dataElement track by $index" style="white-space: nowrap"> {{ dataCol | formatData }}</td> </tr> <thead> <tr> <th class="text-center">Total</th> <th colspan="{{requestResponse.column_names.length}}" class="text-center"> {{ requestResponse.data.length }}</th> </tr> </thead> </table> </div> </div> </div> ')}]);