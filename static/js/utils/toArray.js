define(function(){

    'use strict';

    return function(obj) {
        return [].map.call(obj,function(element) {
            return element;
        })
    };

});