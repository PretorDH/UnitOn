/**
 * Unit-On v0.2.5
 * @author Dark Heart aka PretorDH
 * @site uniton.deparadox.com
 * MIT license
 */

(function(o){
(Unit = function (o) {
	this.U = o;
	this.unitLoad = function (h,c) {
		var Su=Unit.U[h];
		if (Su.loaded || !!document.getElementById(h)) return Su.loaded=true;
		if (Su.loaded===false && typeof c=='function') {
			var a=Su.onload;
			return Su.onload = function (){a && a();c && c()};
		};
		Su.onload = c;
		if (Su.css) Unit.cssLoad(Su);
		if (Su.jss) Unit.jssLoad(Su);
		Su.loaded = false;
	};
	this.cssLoad = function (Su) {
		var a,f=document.createElement("link");
		f.setAttribute("rel", "stylesheet");
		f.setAttribute("type", "text/css");	
		f.setAttribute("href", Su['css']);
		if (!Su.jss && Su.onload) 
			f.setAttribute("onload", function(){Su.onload && Su.onload();});
		if (typeof f != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(f);
			console.log('Load:'+Su['css']);
		}
	};
	this.jssLoad = function (Su) {
		var callback = function(e){if (Su.loaded) return; console.log('Load: '+Su['jss']); Su.onload && Su.onload(); Su.onload=Su.onreadystatechange=null; Su.loaded=true};
		var script = document.createElement('script');
		script.setAttribute('src', Su['jss']);
		script.onreadystatechange = script.onload = callback;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	for(var h in this.U) {
		var nfn = this.U[h].fn;
		if (nfn == 'NOW') this.unitLoad(h,this.U[h].onload);
		else if (nfn == 'ONLOAD') 
			(function(h){
				$(function(){Unit.unitLoad(h,Unit.U[h].onload);});
			})(h);
		else if (typeof nfn == 'string') 
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
