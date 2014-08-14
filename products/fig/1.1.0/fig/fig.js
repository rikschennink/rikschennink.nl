/* fig v1.1.0 - Fig, decorating, loading and interacting with photo galleries in style.
 * Copyright (c) 2013 Rik Schennink - http://rikschennink.nl/products/fig
 */
(function(){var stackBlur=function(){function a(a,e,f,g,h,i){if(!(isNaN(i)||1>i)){i|=0;var j,k=a.getContext("2d");try{try{j=k.getImageData(e,f,g,h)}catch(l){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),j=k.getImageData(e,f,g,h)}catch(l){return}}}catch(l){}var m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K=j.data,L=i+i+1,M=g-1,N=h-1,O=i+1,P=O*(O+1)/2,Q=new b,R=Q;for(o=1;L>o;o++)if(R=R.next=new b,o==O)var S=R;R.next=Q;var T=null,U=null;s=r=0;var V=c[i],W=d[i];for(n=0;h>n;n++){for(B=C=D=E=t=u=v=w=0,x=O*(F=K[r]),y=O*(G=K[r+1]),z=O*(H=K[r+2]),A=O*(I=K[r+3]),t+=P*F,u+=P*G,v+=P*H,w+=P*I,R=Q,o=0;O>o;o++)R.r=F,R.g=G,R.b=H,R.a=I,R=R.next;for(o=1;O>o;o++)p=r+((o>M?M:o)<<2),t+=(R.r=F=K[p])*(J=O-o),u+=(R.g=G=K[p+1])*J,v+=(R.b=H=K[p+2])*J,w+=(R.a=I=K[p+3])*J,B+=F,C+=G,D+=H,E+=I,R=R.next;for(T=Q,U=S,m=0;g>m;m++)K[r+3]=I=w*V>>W,0!=I?(I=255/I,K[r]=(t*V>>W)*I,K[r+1]=(u*V>>W)*I,K[r+2]=(v*V>>W)*I):K[r]=K[r+1]=K[r+2]=0,t-=x,u-=y,v-=z,w-=A,x-=T.r,y-=T.g,z-=T.b,A-=T.a,p=s+((p=m+i+1)<M?p:M)<<2,B+=T.r=K[p],C+=T.g=K[p+1],D+=T.b=K[p+2],E+=T.a=K[p+3],t+=B,u+=C,v+=D,w+=E,T=T.next,x+=F=U.r,y+=G=U.g,z+=H=U.b,A+=I=U.a,B-=F,C-=G,D-=H,E-=I,U=U.next,r+=4;s+=g}for(m=0;g>m;m++){for(C=D=E=B=u=v=w=t=0,r=m<<2,x=O*(F=K[r]),y=O*(G=K[r+1]),z=O*(H=K[r+2]),A=O*(I=K[r+3]),t+=P*F,u+=P*G,v+=P*H,w+=P*I,R=Q,o=0;O>o;o++)R.r=F,R.g=G,R.b=H,R.a=I,R=R.next;for(q=g,o=1;i>=o;o++)r=q+m<<2,t+=(R.r=F=K[r])*(J=O-o),u+=(R.g=G=K[r+1])*J,v+=(R.b=H=K[r+2])*J,w+=(R.a=I=K[r+3])*J,B+=F,C+=G,D+=H,E+=I,R=R.next,N>o&&(q+=g);for(r=m,T=Q,U=S,n=0;h>n;n++)p=r<<2,K[p+3]=I=w*V>>W,I>0?(I=255/I,K[p]=(t*V>>W)*I,K[p+1]=(u*V>>W)*I,K[p+2]=(v*V>>W)*I):K[p]=K[p+1]=K[p+2]=0,t-=x,u-=y,v-=z,w-=A,x-=T.r,y-=T.g,z-=T.b,A-=T.a,p=m+((p=n+O)<N?p:N)*g<<2,t+=B+=T.r=K[p],u+=C+=T.g=K[p+1],v+=D+=T.b=K[p+2],w+=E+=T.a=K[p+3],T=T.next,x+=F=U.r,y+=G=U.g,z+=H=U.b,A+=I=U.a,B-=F,C-=G,D-=H,E-=I,U=U.next,r+=g}k.putImageData(j,e,f)}}function b(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var c=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],d=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];return a}();!function(a){var b=/(heavy)/,c=/(light)|(soft)/,d=/(blur)|(soft)/,e={_min:1,_interval:200,_groups:{},getDelay:function(a){var b,c=a.getAttribute("data-figset");return c?(b=this._groups[c],b||(this._groups[c]={item:0},b=this._groups[c]),b.item++,b.item*this._interval+this._min):this._min}},f=function(a){if(this._attempts=5,this._element=a,this._element.style.display="none",this._img=a.querySelector("img"),this._caption=this._element.querySelector(".fig-caption"),this._element.setAttribute("data-state","loading"),this._caption){for(var b,c=document.createElement("div"),d=document.createDocumentFragment();b=this._caption.firstChild;)d.appendChild(b);c.appendChild(d),c.className="fig-caption-inner",this._caption.appendChild(c)}var e=this._img.nextSibling,f=document.createElement("div");f.className="fig-img",f.appendChild(this._img),e?this._element.insertBefore(f,e):this._element.appendChild(f),this._element.style.display="";var g=this;setTimeout(function(){g.load()},0)};f.prototype={_hasSource:function(){return""!==this._img.getAttribute("src")},_isVisible:function(){var a=window.innerHeight,b=this._element.getBoundingClientRect();return b.top>=0&&b.top<=a||b.bottom>=0&&b.bottom<=a},hasLoaded:function(){return this._hasSource()&&this._img.complete},load:function(){if(!this._hasSource()){if(!this._isVisible())return;this._img.src=this._img.getAttribute("data-src")}if(this._img.complete)this._complete();else{var a=this;this._img.onload=function(){a._complete()}}},_complete:function(){var a=this;if(0===this._img.width){if(this._attempts--,0===this._attempts)return;return setTimeout(function(){a._complete()},100),void 0}this._element.getAttribute("data-caption")||"",d.test(this._element.className)&&this._caption&&this._fill(),setTimeout(function(){a._ready()},e.getDelay(this._element))},_ready:function(){this._element.setAttribute("data-state","intro");var a=this;setTimeout(function(){a._element.setAttribute("data-state","ready")},0),this._element.addEventListener("mouseover",this)},_fill:function(){var d,e=document.createElement("div"),f=this._element.className,g=document.createElement("canvas"),h=17;e.className="fig-overlay",e.appendChild(g),g.width=this._img.width,g.height=this._img.height,d=g.getContext("2d"),d.drawImage(this._img,0,0,g.width,g.height),c.test(f)?h=10:b.test(f)&&(h=40),a(g,0,0,this._img.width,this._img.height,h),this._caption.insertBefore(e,this._caption.firstChild),this._caption.clientHeight&&(e.style.height=this._caption.clientHeight+"px")}};var g={_figs:[],collect:function(){for(var a=0,b=document.querySelectorAll(".fig"),c=b.length;c>a;a++)this._figs.push(new f(b[a]))},search:function(){for(var a,b=0,c=this._figs.length;c>b;b++)a=this._figs[b],a.hasLoaded()||a.load()}};window.addEventListener&&document.querySelectorAll?(window.addEventListener("resize",function(){g.search()},!1),window.addEventListener("scroll",function(){g.search()},!1),"complete"===document.readyState?g.collect():document.addEventListener("DOMContentLoaded",function(){g.collect()})):document.querySelectorAll&&(window.onload=function(){for(var a,b,c=0,d=document.querySelectorAll(".fig"),e=d.length;e>c;c++)a=d[c],a.className+=" fig-fallback",b=a.querySelector("img"),b.getAttribute("src")||(b.src=b.getAttribute("data-src"))})}(stackBlur);}(window))