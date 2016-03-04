define(['chart','utils/toArray'],function(Chart,toArray){
    
    'use strict';

    // constructor
    var exports = function(element,options) {

        this._element = element;
        this._options = options;
        this._chart = null;

        this._init();

    };

    exports.options = {
        'lineColor':'#333',
        'pointColor':'#333',
	    'gridColor':'#eee',
	    'axisColor':'#333',
	    'fontColor':'#333'
    };

    exports.prototype = {

        _init:function() {

            // get data from table
            var table = this._element.getElementsByTagName('table')[0];

            // get labels (dates)
            var rowLabels = toArray(this._element.getElementsByTagName('tbody')[0].getElementsByTagName('th'));
            var labels = rowLabels.map(function(label){
                return label.textContent;
            });

            // get values (currently only supports one dataset)
            var rowValues = toArray(this._element.getElementsByTagName('td'));
            var values = rowValues.map(function(value){
                return parseInt(value.getAttribute('data-value'),10);
            });

            // create canvas element
            var canvas = document.createElement('canvas');
            canvas.width = this._element.offsetWidth;
            canvas.height = canvas.width * .35;

            // hide element
            this._element.style.display = 'none';

            // append the canvas element so it is rendered by the browser
            this._element.appendChild(canvas);

            // hide inner table
            table.style.display = 'none';

            // Get the context of the canvas element we want to select
            var context = canvas.getContext('2d');

            // show the element
            this._element.style.display = '';

            // create the chart
            this._chart = new Chart(context).Line({
                    labels:labels,
                    datasets:[
                        {

                            label: table.getAttribute('summary'),

                            strokeColor: this._options.lineColor,

                            pointColor: this._options.pointColor,
                            pointStrokeColor: this._options.lineColor,

                            pointHighlightFill: this._options.lineColor,
                            pointHighlightStroke: this._options.pointColor,

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

                    scaleGridLineColor: this._options.gridColor,
                    scaleGridLineWidth: 2,
                    scaleFontColor: this._options.fontColor,

                    scaleLineColor: this._options.axisColor,
                    scaleFontSize: 16,
                    scaleFontFamily: this._options.axisFont,
                    scaleLineWidth: 2

                }
            );
        },

        unload:function() {

            this._element.removeChild(this._element.querySelector('canvas'));
            this._element.querySelector('table').style.display = '';

            this._chart.destroy();
            this._chart = null;
        }
    };

    // Chart uses global variable, this restores original contents of that variable
    Chart.noConflict();

    // expose
    return exports;

});