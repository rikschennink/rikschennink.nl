define(['Observer'],function(Observer){

    var exports = function(element,options) {

        this._element = element;
        this._options = options;

    };

    exports.option = {
        more:null,
        less:null
    };

    exports.prototype = {

        handleEvent:function(e) {

            this._onRead(e);

        },

        _onRead:function() {

            Observer.publish(this,'read');

        },

        read:function() {

            // get link to article
            var intro = this._element.getElementsByClassName('intro')[0],more,less;

            // if already attached
            if (intro.children.length>1) {
                return;
            }

            // add additional more link
            more = document.createElement('a');
            more.setAttribute('rel','nofollow');
            more.textContent = this._options.more;
            more.href = this._element.getElementsByTagName('a')[0].href;
            intro.appendChild(more);

            // add close focus state button
            less = document.createElement('button');
            less.setAttribute('type','button');
            less.textContent = this._options.less;
            less.addEventListener('click',this);
            intro.appendChild(less);

        },

		unload:function() {

			var intro = this._element.getElementsByClassName('intro')[0],more,less;

			Observer.publish(this,'read');

			// if already detached
			if (intro.children.length===1) {
				return;
			}

			// clean kids
			var kids = intro.children;
			for (var i=kids.length-1;i>0;i--) {
				kids[i].removeEventListener('click',this);
				kids[i].parentNode.removeChild(kids[i]);
			}

		}

    };

    return exports;

});