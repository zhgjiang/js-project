define(function() {
	"use strict";

	var version = "@VERSION@";

	return {

		version: function version() {
			if(console && console.log){
				console.log("Hello world!");
			}else{
				alert("Hello world!");
			}
		},

		console: function(msg){
			if(console && console.log){
				console.log(msg);
			}else{
				alert(msg);
			}
		}

	};

});
