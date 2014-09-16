(function(){

    var IFrameRefresh = {

        init:function() {
            var i=0,frames = document.querySelectorAll('iframe'),l=frames.length,btn;
            for (;i<l;i++) {
                btn = document.createElement('button');
                btn.innerHTML = '<i class="fa fa-refresh"></i>';
                btn.addEventListener('click',this._refresh,false);
                frames[i].parentNode.insertBefore(btn,frames[i]);
            }
        },

        _refresh:function(e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            if (target.nodeName !== 'BUTTON') {
                target = target.parentNode;
            }
            var iframe = target.nextSibling;
            if (iframe) {
                iframe.src = iframe.src;
            }
            return false;
        }


    };

    if (!window.addEventListener) {
        return;
    }

    if (document.readyState === 'complete') {
        IFrameRefresh.init();
    }
    else {
        document.addEventListener('DOMContentLoaded',function(){
            IFrameRefresh.init();
        });
    }

}());