define(['chart','utils/toArray'],function(Chart,toArray){
    
    'use strict';

    // constructor
    var exports = function(element,options) {

        // get data from table
        var table = element.getElementsByTagName('table')[0];

        // get labels (dates)
        var rowLabels = toArray(element.getElementsByTagName('tbody')[0].getElementsByTagName('th'));
        var labels = rowLabels.map(function(label){
            return label.textContent;
        });

        // get values (currently only supports one dataset)
        var rowValues = toArray(element.getElementsByTagName('td'));
        var values = rowValues.map(function(value){
            return parseInt(value.getAttribute('data-value'),10);
        });

        // create canvas element
        var canvas = document.createElement('canvas');
        canvas.width = element.offsetWidth;
        canvas.height = canvas.width * .35;

        // hide element
        element.style.display = 'none';

        // append the canvas element so it is rendered by the browser
        element.appendChild(canvas);

        // hide inner table
        table.style.display='none';

        // Get the context of the canvas element we want to select
        var context = canvas.getContext('2d');

        // show the element
        element.style.display = '';

        // create the chart
        new Chart(context).Line({
            labels:labels,
            datasets:[
                {

                    label: table.getAttribute('summary'),

                    strokeColor: options.lineColor,

                    pointColor: options.pointColor,
                    pointStrokeColor: options.lineColor,

                    pointHighlightFill: options.lineColor,
                    pointHighlightStroke: options.pointColor,

                    data: values
                }
            ]
            },
            {
                animation: false,
                responsive: true,
                showTooltips: false,
                datasetFill: false,

                pointDotStrokeWidth: 2,

                scaleGridLineColor: '#DDDFDA',
                scaleGridLineWidth: 1,

                scaleLineColor: '#8e908c',
                scaleFontSize: 16,
                scaleFontFamily: 'Georgia, serif',
                scaleLineWidth: 2

            }
        );

    };

    exports.options = {
        lineColor:'#333',
        pointColor:'#333'
    };

    // Chart uses global variable, this restores original contents of that variable
    Chart.noConflict();

    // expose
    return exports;

});