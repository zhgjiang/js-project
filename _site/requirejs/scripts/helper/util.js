define(function() {
	"use strict";

	var version = "@VERSION@";

	return {

		version: function version() {
			if(console.log){
				console.log("Hello world!");
			}else{
				alert("Hello world!");
			}
		},

		console: function(msg){
			if(console.log){
				console.log(msg);
			}else{
				alert(msg);
			}
		}

	};

});
