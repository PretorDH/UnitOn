/**
 * Unit-On v0.2.1
 * @author Dark Heart aka PretorDH
 * @site uniton.deparadox.com
 * MIT license
 */

(function(o){
(Unit = function (o) {
	this.U = o;
	this.unitLoad = function (h,c) {
		var Su=Unit.U[h];
		if (Su.loaded) return;
		if (Su.loaded===false && typeof c=='function') {
			var a=Su.onload;
			return Su.onload = function (){a && a();c && c()};
		};
		Su.onload = c;
		if (Su.css) Unit.cssLoad(Su,(Su.jss)?null:Su.onload);
		if (Su.jss) Unit.jssLoad(Su);
		Su.loaded = false;
	};
	this.cssLoad = function (Su,c) {
		var a,f=document.createElement("link");
		(a=f.setAttribute)("rel", "stylesheet");
		a("type", "text/css");
		a("onload", function(){Su.onload && Su.onload()});
		a("href", Su['css']);
		(typeof f != "undefined") && document.getElementsByTagName("head")[0].appendChild(f) && console.log('Load:'+h['css']);
	};
	this.jssLoad = function (Su) {
		var callback = function(e){if (Su.loaded) return; console.log('Load: '+Su['jss']); Su.onload && Su.onload(); Su.onload=Su.onreadystatechange=null; Su.loaded=true};
/*		$.getScript(Su['jss'],callback); */ 
		var script = document.createElement('script');
		script.setAttribute('src', src);
		script.onreadystatechange = script.onload = callback;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	for(var h in this.U) {
		var nfn = this.U[h].fn;
		if (nfn == 'NOW') this.unitLoad(h,this.U[h].onload);
		if (nfn == 'ONLOAD') 
			(function(h){
				$(function(){Unit.unitLoad(h,Unit.U[h].onload);});
			})(h);
		if (typeof nfn == 'string') 
			(function(nfn,h){
				window[nfn] = function(){
					var self=this, ar=arguments; 
					Unit.unitLoad(h,function(){window[nfn].apply(self,ar) }); 
				};
			})(nfn,h);
	};
	return o;
}).call(Unit,o);
})

({  'dragon':{jss:'http://dragon.deparadox.com/drag-on.js', fn:'NOW'},
    'baron':{jss:'http://dragon.deparadox.com/bar-on.js', fn:'ONLOAD'}      });
