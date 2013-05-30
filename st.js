function sortrows(table, n, comparator){
	
	var tbody = table.tBodies[0],	//获取tbody
		rows = tbody.getElementsByTagName("tr"); //所有行
	try{
		rows = Array.prototype.slice.call(rows, 0);	//IE中运行bug,slice 不能应用于NodeList	
	}catch(err){
		var tmp = [];
		var i, len;
		for(i=0, len=rows.length; i<len; i++){
			tmp[i] = rows[i];
		}
		rows = tmp;
		tmp = null;
	}
	

	rows.sort(function(row1, row2){

		var cell1 = row1.getElementsByTagName("td")[n],
			cell2 = row2.getElementsByTagName("td")[n],
			val1 = cell1.textContent || cell1.innerText,
			val2 = cell2.textContent || cell2.innerText;      
        if(comparator){
				return comparator(val1, val2);
        }
      
		if(val1 < val2){
			return 1;
        }else{
			return -1;
		}

	});

	//按顺序添加行到tbody最后
	(function(){
		var i,
			len;		
        for(i=0, len=rows.length; i<len; i++){
			tbody.appendChild(rows[i]);
		}
      
	})();
}

//为th添加点击事件监听函数
function makeSortable(table){
  
	var headers = table.getElementsByTagName("th"),
		i, len;

	for(i=0, len=headers.length; i<len; i++){
		//闭包插入i
		(function(n){
			headers[n].onclick = function(){sortrows(table, n);};
		})(i);
		
	}

}


makeSortable(document.getElementById("st"));
