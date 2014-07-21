requirejs.config({
    map:{
        '*':{
            conditioner:'vendor/rikschennink/conditioner',
            chart:'vendor/nnnick/Chart'
        }
    }
});

require(['conditioner'],function(conditioner) {

    conditioner.init({
        'modules':{
            'ui/LineChart':{
                'options':{
                    'lineColor':'#4271ae',
                    'pointColor':'#EDF0EA'
                }
            }
        }
    });

});