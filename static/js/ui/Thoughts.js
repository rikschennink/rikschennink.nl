define(['conditioner','Observer'],function(conditioner,Observer){

    var parentByTagName = function(tagName,node) {

        tagName = tagName.toUpperCase();

        do {
            if (node.nodeName === tagName) {
                return node;
            }
        }
        while(node = node.parentNode);

        return null;

    };

    var exports = function(element){

        var self = this;

        this._element = element;
        this._element.addEventListener('click',this);

        this._thoughts = conditioner.getModules('ui/QuickThought');
        this._thoughts.forEach(function(thoughtModule){

            Observer.subscribe(thoughtModule,'read',function(){

				console.log('read!');

                self._blur();
                self._reorder();
            });

        })

    };

    exports.prototype = {

        handleEvent:function(e) {

            if (e.target.nodeName === 'P') {
                e.preventDefault();
                this._focus(parentByTagName('li',e.target));
            }

        },

        _focus:function(item) {

            // blur rest
            this._blur();

            // focus item
            item.classList.add('focus');

			// set thought to read mode
			var module = conditioner.getModule('ui/QuickThought','.focus');
			module.execute('read');

            // reorder other thoughts
            this._reorder();

        },

        _blur:function() {

            // unfocus other items
            var current = this._element.querySelector('.focus');
            if (current) {
                current.classList.remove('focus');
            }

        },

        _reorder:function(){

            var items = Array.prototype.slice.call(this._element.children);
            var offset = 0;

            items.forEach(function(item){

                item.style.webkitTransform = 'translateY(' + offset + 'px)';

                if (item.classList.contains('focus')) {
                    offset += item.querySelector('.intro').offsetHeight - item.offsetHeight;
                }

            });

        }

    };

    return exports;


});