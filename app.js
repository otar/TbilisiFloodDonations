
var app = {

    chart: null,

    initialize: function () {
        if (app.chart === null) {
            app.chart = $('#container');
        }

        // app.chart.text('Loading...');

    },

    loadData: function (callback) {
        $.getJSON('data.json', callback);
    },

    render: function(response)
    {

        if (
               typeof response === 'undefined'
            || typeof response.data === 'undefined'
            || !response.data.length
        )
        {
            return;
        }

        var options = {
            tooltip: {
                useHTML: true,
                formatter: function()
                {
                    var html = [];
                    html.push('<div class="tooltip group">');
                        html.push('<div class="label">');
                            html.push('<a target="_blank" href="' + this.point.info.url + '">' + this.point.name + '</a>');
                            html.push(' - ');
                            html.push(this.point.value + ' 000 ლარი');
                        html.push('</div>');
                        html.push('<img src="' + this.point.info.logo + '" class="logo" />');
                    html.push('</div>');
                    return html.join('');
                }
            },
            series: [{
                type: 'treemap',
                alternateStartingDirection: true,
                layoutAlgorithm: 'squarified',
                levels: [{
                    level: 1,
                    dataLabels: {
                        style: {
                            fontSize: '16px'
                        }
                    }
                }],
                data: response.data
            }],
            title: {
                text: ''
            }, credits: {
                enabled: false
            }
        };

        app.chart.highcharts(options);

    }
};
