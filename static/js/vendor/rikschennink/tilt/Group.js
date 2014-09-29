var TiltGroup = (function(win,utils){

    if (!utils) {
        return null;
    }

    return function TiltGroup(element) {

        this._element = element;

        // setup items
        var tiles = element.querySelectorAll('.tilt-wrapper');

        // setup init animation delays
        var self=this,i=0,l=tiles.length;
        for (;i<l;i++) {
            utils.setStyle(
                tiles[i],'-transitionDelay',i * .1 + 's'
            );
        }

        // ready, when organized class is applied animations are enabled
        setTimeout(function(){
            self._element.setAttribute('data-ready','true');
        },1);
    };

}(window,window['TiltUtils']));