let type = 0;
		let	tronWeb = new TronWeb({
				fullHost: 'https://api.trongrid.io',
				headers: { "TRON-PRO-API-KEY": 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
				privateKey: 'A135470B9CD950784D742F8767BAA843E0BA19B7E867CAE7499688BE6483C18A'
			});
			
		$(function() {
			for(var i in localStorage){
			    if(localStorage.hasOwnProperty(i)){
					let addr = JSON.parse(localStorage[i])
					let html2 = "地址:<span style='color:#00aa00'>"+addr.address+"</span><br />" +
					"私钥:<span style='color:#00aa00'>"+addr.privateKey+"</span><br />" +
					"<hr />" ;
					$("#addressResult").append(html2);
			    }
			}
		})
		
		
		function create(createType){
			if(type == 0){
				return;
			}
			tronWeb.createAccount().then(function(result){
				console.log(result);
				let addr = result.address.base58.toLocaleLowerCase();
				
				let _time = dateFtt("yyyy-MM-dd hh:mm:ss",new Date());
				let html = "<span style='color:#b0b0b0'>["+_time+"]-"+logmessage+":"+addr+"</span><br />";
				$("#addresslog").append(html);
				let ele = document.getElementById("addresslog");
				ele.scrollTop = ele.scrollHeight;
				
				if(pattern.test(addr)){
					//保存
					let data = {};
					data.address = addr;
					data.privateKey = result.privateKey;
					var timestamp = Date.parse( new Date());
					localStorage.setItem(timestamp,JSON.stringify(data));
					
					let html2 = "地址:<span style='color:#00aa00'>"+addr+"</span><br />" +
					"私钥:<span style='color:#00aa00'>"+result.privateKey+"</span><br />" +
					"<hr />" ;
					$("#addressResult").append(html2);
				}
				setTimeout(function(){
					create(createType);
				},1);
			});
		}
		
		let pattern;
		let logmessage ;
		function start(createType){
			type = 1;
			// 1 正则   
			let patternstr;
			if(createType == 1){
				let repeatnum = 3;
				let _num = $("#repeatnum").val();
				if(notNull(_num)){
					repeatnum = _num-1;
				}
				patternstr = "(\\w)\\1{"+repeatnum+",}$";
				let numstr = repeatnum+1;
				logmessage = "尾号"+numstr+"个重复地址生成";
			}else{
				let _num = $("#repeatstr").val();
				if(!notNull(_num)){
					alert("匹配字符不能为空");
					return;
				}
				_num = _num.toLocaleLowerCase();
				patternstr = _num+"$";
				logmessage = "尾号指定为["+_num+"]地址生成";
			}
			pattern = new RegExp(patternstr);
			create(createType);
		}
		function stop(){
			type = 0;
		}
		function clearAll(){
			$("#addressResult").html("");
			$("#addresslog").html("");
			localStorage.clear();
		}
		
		function notNull(_num){
			if(null != _num && "" != _num &&"null" != _num && undefined != _num ){
				return true;
			}
			return false;
		}
		function dateFtt(fmt,date) { 
		 var o = { 
		 "M+" : date.getMonth()+1,     //月份 
		 "d+" : date.getDate(),     //日 
		 "h+" : date.getHours(),     //小时 
		 "m+" : date.getMinutes(),     //分 
		 "s+" : date.getSeconds(),     //秒 
		 "q+" : Math.floor((date.getMonth()+3)/3), //季度 
		 "S" : date.getMilliseconds()    //毫秒 
		 }; 
		 if(/(y+)/.test(fmt)) 
		 fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		 for(var k in o) 
		 if(new RegExp("("+ k +")").test(fmt)) 
		 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
		 return fmt; 
		}