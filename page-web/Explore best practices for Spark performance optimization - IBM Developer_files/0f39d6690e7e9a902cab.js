"use strict";(self.webpackChunkfe_wap=self.webpackChunkfe_wap||[]).push([[7004],{2728:(t,e,n)=>{function i(t){return"object"==typeof t&&null!=t&&1===t.nodeType}function r(t,e){return(!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function o(t,e){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var n=getComputedStyle(t,null);return r(n.overflowY,e)||r(n.overflowX,e)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return!1}function l(t,e,n,i,r,o,l,f){return o<t&&l>e||o>t&&l<e?0:o<=t&&f<=n||l>=e&&f>=n?o-t-i:l>e&&f<n||o<t&&f>n?l-e+r:0}n.d(e,{A:()=>f});var f=function(t,e){var n=window,r=e.scrollMode,f=e.block,d=e.inline,h=e.boundary,u=e.skipOverflowHiddenElements,s="function"==typeof h?h:function(t){return t!==h};if(!i(t))throw new TypeError("Invalid target");for(var a,c,p=document.scrollingElement||document.documentElement,g=[],m=t;i(m)&&s(m);){if((m=null==(c=(a=m).parentElement)?a.getRootNode().host||null:c)===p){g.push(m);break}null!=m&&m===document.body&&o(m)&&!o(document.documentElement)||null!=m&&o(m,u)&&g.push(m)}for(var w=n.visualViewport?n.visualViewport.width:innerWidth,v=n.visualViewport?n.visualViewport.height:innerHeight,W=window.scrollX||pageXOffset,b=window.scrollY||pageYOffset,H=t.getBoundingClientRect(),y=H.height,k=H.width,E=H.top,M=H.right,C=H.bottom,V=H.left,I="start"===f||"nearest"===f?E:"end"===f?C:E+y/2,x="center"===d?V+k/2:"end"===d?M:V,R=[],T=0;T<g.length;T++){var B=g[T],D=B.getBoundingClientRect(),O=D.height,X=D.width,Y=D.top,L=D.right,S=D.bottom,_=D.left;if("if-needed"===r&&E>=0&&V>=0&&C<=v&&M<=w&&E>=Y&&C<=S&&V>=_&&M<=L)return R;var j=getComputedStyle(B),A=parseInt(j.borderLeftWidth,10),N=parseInt(j.borderTopWidth,10),q=parseInt(j.borderRightWidth,10),z=parseInt(j.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in B?B.offsetWidth-B.clientWidth-A-q:0,K="offsetHeight"in B?B.offsetHeight-B.clientHeight-N-z:0,P="offsetWidth"in B?0===B.offsetWidth?0:X/B.offsetWidth:0,Q="offsetHeight"in B?0===B.offsetHeight?0:O/B.offsetHeight:0;if(p===B)F="start"===f?I:"end"===f?I-v:"nearest"===f?l(b,b+v,v,N,z,b+I,b+I+y,y):I-v/2,G="start"===d?x:"center"===d?x-w/2:"end"===d?x-w:l(W,W+w,w,A,q,W+x,W+x+k,k),F=Math.max(0,F+b),G=Math.max(0,G+W);else{F="start"===f?I-Y-N:"end"===f?I-S+z+K:"nearest"===f?l(Y,S,O,N,z+K,I,I+y,y):I-(Y+O/2)+K/2,G="start"===d?x-_-A:"center"===d?x-(_+X/2)+J/2:"end"===d?x-L+q+J:l(_,L,X,A,q+J,x,x+k,k);var U=B.scrollLeft,Z=B.scrollTop;I+=Z-(F=Math.max(0,Math.min(Z+F/Q,B.scrollHeight-O/Q+K))),x+=U-(G=Math.max(0,Math.min(U+G/P,B.scrollWidth-X/P+J)))}R.push({el:B,top:F,left:G})}return R}}}]);