define(function() {
	"use strict";

	return {
		//命名空间
		namespace: function(global, module) {

			var parts = module.split("."),
				object = global,
				i;

			for (i = 0; i < parts.length; i = i + 1) {

				if (!object[parts[i]]) {
					object[parts[i]] = {};
				}

				object = object[parts[i]];
			}

			return global;
		}
	}

});
