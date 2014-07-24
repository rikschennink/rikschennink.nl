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
	                'gridColor':'#EDF0F3',
	                'axisColor':'#EDF0F3',
                    'lineColor':'#0E6CCA',
                    'pointColor':'#EDF0EA',
	                'fontColor':'#B1BBC5'
                }
            }
        }
    });

});