define(['vendor/rikschennink/tilt/node'],function(TiltNode){

    var exports = function(element) {
        new TiltNode(element);
    };

    return exports;

});