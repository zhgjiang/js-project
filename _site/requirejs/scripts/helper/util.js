define(function() {
	"use strict";

	var version = "@VERSION@";

	var v = function() {
				p(version);
	};

	var p = function(msg) {

			if(console && console.log){
				console.log(msg);
			}else{
				alert(msg);
			}
	};

	return {
		v: v,
		p: p
	};

});
