(function(){

	//版本
	require(["helper/util"], function(util) {
	
		  util.version();
	});
	
	//命名空间
	require(["helper/util", "helper/namespace"], function(util, namespace) {
			
		  var global = {};
		  util.console(global);

		  namespace.namespace(global, "dom.style");
		  util.console(global);
		  
			namespace.namespace(global, "dom.crud");
		  util.console(global);
		  
	});

})();
