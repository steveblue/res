/* 
   res.js v1.0
   
   Author: Steve Belovarich
   
   The MIT License (MIT)
   Copyright (c) 2014 Steve Belovarich
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
   
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
   
   Usage: var r = new res([320,480,768,1024,1440]);
   
*/   
var res = function(arr){
    this.viewports = {
    'portrait': [0, arr[0]],
    'landscape': [arr[0]+1, arr[1]],
    'tablet': [arr[1]+1, arr[2]],
    'small': [arr[2]+1, arr[3]],
    'medium': [arr[3]+1, arr[4]],
    'large': [arr[4]+1, 10000]
    };
    this.uagent = navigator.userAgent.toLowerCase();
    this.state = undefined;
    this.input = undefined;
    this.orient = undefined;
    this.device = undefined;
    this.os = undefined;
    this.width = 0;
    this.init();
};
res.prototype = {
  
  setState: function() {
  	var that = this;
  	var vp = that.viewports;
  	
  	if(that.device === 'desktop'){
	  	that.width = window.innerWidth;
  	}
  	else if(that.device !== 'desktop'){
  	
  		if(that.orient === 'portrait'){
	  	 that.width = screen.width;
	  	}
	  	else if(that.orient === 'landscape'){
		 that.width = screen.height; 	
	  	}
  	}
  	
    for (var key in vp) {
	    if (vp.hasOwnProperty(key)) {
		  if (that.width >= vp[key][0] && that.width <= vp[key][1]) {
		    if (that.state != key) {
		        that.state = key;
		    }
		    //console.log(that.state);
		    return that.state;
		  }	      	      
	    }
	}
  },
  
  inputCheck: function() {
  	 var that = this;
     if (that.os === 'ios' || that.os === 'android' || that.os === 'winphone') {
       that.input = 'touch';
     }
     else{
	   that.input = 'mouse'; 
     }
  },
  
  browserCheck: function(){
    var that = this;
	var tem, 
    M = that.uagent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(that.uagent) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1] === 'Chrome'){
        tem = that.uagent.match(/\bOPR\/(\d+)/);
        if(tem != null) { 
          return 'Opera '+tem[1]; 
        }
    }
    
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    
    if((tem = that.uagent.match(/version\/(\d+)/i)) != null) {
	    M.splice(1, 1, tem[1]);
    } 
    return M.join(' ');
  },
    
  osCheck: function() {
  	 var that = this;
     if (navigator.appVersion.indexOf("Win")!=-1) {
       that.os = 'windows';
       that.device = 'desktop';
     }
     else if (navigator.appVersion.indexOf("Mac")!=-1 && navigator.userAgent.match(/(iPhone|iPod|iPad)/) == null) {
       that.os = 'osx';
       that.device = 'desktop';
     }
     else if (navigator.appVersion.indexOf("X11")!=-1) {
       that.os = 'unix';
       that.device = 'desktop';
     }  
     else if (navigator.appVersion.indexOf("Linux")!=-1) {
       that.os = 'linux';
       that.device = 'desktop';
     }  
     else if (navigator.userAgent.match(/(iPhone|iPod|iPad)/).length > 0) {
       that.os = 'ios';      
       if( that.uagent.indexOf("iphone") > 0 ){
	       that.device = "iphone";
       }
	   if( that.uagent.indexOf("ipod") > 0 ){
	       that.device = "ipod";
	   }
	   if( that.uagent.indexOf("ipad") > 0 ){
	       that.device = "ipad";
	   }  
     }
     else if (navigator.userAgent.indexOf("android") > 0) {
       that.os = that.device = 'android';
     }
     else if (navigator.userAgent.indexOf("windows phone") > 0) {
       that.os = that.device = 'winphone';
     }     
  },
  
  resize: function() {
     var that = this;
     if (window.innerHeight > window.innerWidth) {
       that.orient = 'portrait';
     } 
     else {
       that.orient = 'landscape';
     }
     that.setState();
  },
  
  init: function() {
     var that = this;
     that.resize();
     that.osCheck();
     that.inputCheck();
     window.onorientationchange = function() {
       that.resize();
     };
     window.onresize = function() {
       that.resize();
     };
  }
  
}; 
