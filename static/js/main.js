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
	                'gridColor':'#F1F0ED',
	                'axisColor':'#e4e3df',
                    'lineColor':'#ce3925',
	                'fontColor':'#b8b6ae',
                    'axisFont':'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif'
                }
            }
        }
    });

});