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
	                'pointColor':'#F1F0ED',
	                'gridColor':'#ECECE9',
	                'axisColor':'#e4e3df',
                    'lineColor':'#ce3925',
	                'fontColor':'#b8b6ae',
                    'axisFont':'Lucida Sans Unicode, Lucida Grande, Arial, sans-serif'
                }
            }
        }
    });

});