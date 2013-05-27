(function(){

	//jQuery
	requirejs.config({
		  //To get timely, correct error triggers in IE, force a define/shim exports check.
		  enforceDefine: true,
		  paths: {
		      jquery: [
		          "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
		          //If the CDN location fails, load from this location
		          "lib/jquery/jquery"
		      ]
		  }
	});


	//版本
	require(["helper/util"], function(util) {
	
		  util.v();
	});
	
	//命名空间
	require(["helper/util", "helper/namespace"], function(util, namespace) {
			
		  var global = {};
		  util.p(global);

		  namespace.namespace(global, "dom.style");
		  util.p(global);
		  
			namespace.namespace(global, "dom.crud");
		  util.p(global);
		  
	});

	//Later
	require(["jquery"], function ($) {
		$("body").append("<p>jquery append</p>");
	});

})();
