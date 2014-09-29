requirejs.config({
    map:{
        '*':{
			conditioner:'vendor/rikschennink/conditioner/conditioner',
            Observer:'vendor/rikschennink/conditioner/utils/Observer',
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
            },
            'ui/QuickThought':{
                'options':{
       	             'more':'read the article',
                    'less':'back'
                }
            }
        }
    });

});