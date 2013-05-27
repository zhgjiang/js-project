(function(){

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

})();
