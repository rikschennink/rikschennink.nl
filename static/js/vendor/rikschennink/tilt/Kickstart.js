(function(win,doc,WNode,WGrid,WGroup){

    /**
     * Mustard cut here
     */
    if (!doc.querySelectorAll) {
        return;
    }

    /**
     * Initialize all tilt tiles and grids on this page
     */
    function setup() {

        var elements,i;

        // bind all tilt behavior
        if (WNode) {
            elements = doc.querySelectorAll('.tilt');
            i=elements.length;
            while(i--) {
                new WNode(elements[i]);
            }
        }

        // find all grids and setup
        if (WGrid) {
            elements = doc.querySelectorAll('.tilt-grid');
            i=elements.length;
            while(i--) {
                new WGrid(elements[i]);
            }
        }

        // find all groups and setup
        if (WGrid) {
            elements = doc.querySelectorAll('.tilt-group');
            i=elements.length;
            while(i--) {
                new WGroup(elements[i]);
            }
        }
    }

    // if doc already loaded/complete than setup immidiately, else wait for DOMContentLoaded
    if (doc.readyState === 'complete') {setup();}
    else if (doc.addEventListener) {doc.addEventListener('DOMContentLoaded',setup);}
    else {

        /*!
         * domready (c) Dustin Diaz 2012 - License MIT
         */
        !function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}})

        domready(setup);
    }

}(window,document,window['TiltNode'],window['TiltGrid'],window['TiltGroup']));