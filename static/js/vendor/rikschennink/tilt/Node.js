var TiltNode = (function(win,doc,utils) {

    if (!utils) {
        return null;
    }

    /**
     * Tilt constants
     */
    // element perspective modifier (should be same as in CSS class)
    var WOBBLE_PERSPECTIVE = (function() {

        // old browsers don't have transforms
        if (!utils.hasTransforms()) {
            return 0;
        }

        // get perspective setting from temp dom node
        var styles,value,test = document.createElement('div');
        test.style.display = 'none';
        document.documentElement.appendChild(test);
        test.className = 'tilt';

        styles = win.getComputedStyle(test,null);
        value = styles[utils.prefix + 'Perspective'];

        // clean up
        test.parentNode.removeChild(test);

        // return perspective value
        return parseInt(value,10);

    }());

    // tilt modifier
    var WOBBLE_TILT = 2;

    // push depth modifier
    var WOBBLE_DEPTH = -(WOBBLE_PERSPECTIVE / 40);
    var WOBBLE_ORIGIN = 'opposite';

    var HOVER_X = 0;
    var HOVER_Y = .125;
    var HOVER_BLUR = .5;
    var HOVER_OPACITY = .375;

    /**
     * Tilt Class
     */
    var exports = function Tilt(element) {

        // remember element
        this._element = element;

        // original style
        this._styles = {};

        // try to scale image
        if (this._element.className.indexOf('tilt-img')!==-1) {
            var img = this._element.querySelector('img');
            this._element.style.backgroundImage = 'url(' + img.src + ')';
        }

        // if has no support for transforms, copout
        if (!utils.hasTransforms()) {
            return;
        }

        // listen to down events
        var self = this;
        utils.listen(this._element,'down',function(e){
            self._onPush(e);
        });
    };

    exports.prototype = {

        _hovers:function() {
            return this._element.className.indexOf('hover') !== -1;
        },

        _getCSS:function(property) {
            return this._styles[property] || '';
        },

        _onPush:function(e) {

            // define vars used in push
            var self = this,rect,x,y,tiltX,tiltY,moveZ,originX,originY,computedStyles,transforms;

            // remember original style elements
            computedStyles = win.getComputedStyle(this._element,null);
            this._styles['boxShadow'] = computedStyles.getPropertyValue('box-shadow');

            // listen to release events
            utils.listen(document,'up',function handleUp(){
                utils.unlisten(document,'up',handleUp);
                self._onLift();
            });

            // get current dimensions (could have changed since last click/tap)
            rect = utils.getSpecs(this._element);

            // calculate percentage location from center
            x = (e.pageX - rect.left) / rect.width;
            y = (e.pageY - rect.top) / rect.height;

            // calculate rotation origin
            originX = utils.getOriginForValue(x,WOBBLE_ORIGIN);
            originY = utils.getOriginForValue(y,WOBBLE_ORIGIN);

            // calculate tilt levels for each axis
            tiltX = (WOBBLE_PERSPECTIVE / rect.height) * WOBBLE_TILT;
            tiltY = (WOBBLE_PERSPECTIVE / rect.width) * WOBBLE_TILT;

            // z translation
            moveZ = 1 - (Math.abs(-.5 + x) + Math.abs(-.5 + y));


            // calculate transforms
            transforms = {
                perspective:WOBBLE_PERSPECTIVE + 'px',
                rotateX:((-.5 + y) * -tiltX) + 'deg',
                rotateY:((-.5 + x) * tiltY) + 'deg',
                translateZ:Math.round(moveZ * WOBBLE_DEPTH) + 'px'
            };

            var styles = {
                '-transformOrigin':originX + '% ' + originY + '% 0'
            };

            // test if is hovering, if so, calculate shadow
            if (this._hovers()) {

                var sx,sy,sb,so;

                // calculate x offset (m
                sx = HOVER_X + -(-.5 + x) * .333;

                // calculate y offset (the more to the bottom the negative y offset)
                sy = HOVER_Y + -(-.5 + y) * .333;

                // calculate blur (the more in the center the less blur)
                sb = HOVER_BLUR - (.25 * (moveZ * 1.25));

                // calculate blur opacity
                so = HOVER_OPACITY - (.1 * (moveZ * 1.25));

                // get original styles
                var css = this._getCSS('box-shadow');

                // add style
                styles['boxShadow'] = (css ? css + ',' : css) + sx + 'rem '+ sy + 'rem ' + sb + 'rem rgba(0,0,0,' + so + ')';
            }

            // fix -webkit- event bug where translating negatively over z axis blocks click events
            utils.setStyles(this._element.parentNode,{
                '-transform-style':'preserve-3d',
                '-transition':'none',
                '-transform':'none'
            });

            utils.setTransforms(this._element.parentNode,{
                translateZ:-WOBBLE_DEPTH + 'px'}
            );

            // apply transform styles to tile
            utils.setStyles(this._element,styles);
            utils.setTransforms(this._element,transforms);

        },

        _onLift:function(){

            if (this._hovers()) {

                // get original styles
                var css = this._getCSS('box-shadow');

                utils.setStyles(this._element,{
                    'boxShadow':(css ? css + ',' : css) + HOVER_X + 'rem ' + HOVER_Y + 'rem ' + HOVER_BLUR + 'rem rgba(0,0,0,' + HOVER_OPACITY + ')'
                });
            }

            utils.setTransforms(this._element,{
                perspective:WOBBLE_PERSPECTIVE + 'px',
                translateZ:null,
                rotateX:null,
                rotateY:null
            });
        }
    };

    return exports;

}(window,document,window['TiltUtils']));