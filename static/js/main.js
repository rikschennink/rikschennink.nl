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
	                'pointColor':'#FFFFFF',
	                'gridColor':'#EDF0F3',
	                'axisColor':'#EDF0F3',
                    'lineColor':'#0E6CCA',
	                'fontColor':'#B1BBC5'
                }
            }
        }
    });

});