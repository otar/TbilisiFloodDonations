
var app = {

    chart: null,

    initialize: function ()
    {

        if (app.chart === null)
        {
            app.chart = $('#container');
        }

        // app.chart.text('Loading...');

    },

    loadData: function (callback)
    {

        $.getJSON('data.json', function(response)
        {

            if (
                   typeof response === 'undefined'
                || typeof response.data === 'undefined'
                || !response.data.length
            )
            {
                return;
            }

            var newData = app.formatData(response.data);

            if (typeof callback === 'function')
            {
                callback(newData);
            }

        });

    },

    formatData: function(data)
    {

        var ranges = [
            {
                from: 0,
                to: 10,
                fontSize: 10
            },
            {
                from: 10,
                to: 25,
                fontSize: 11
            },
            {
                from: 25,
                to: 50,
                fontSize: 12
            },
            {
                from: 50,
                to: 100,
                fontSize: 13
            },
            {
                from: 100,
                to: 300,
                fontSize: 14
            },
            {
                from: 300,
                to: 1000,
                fontSize: 15
            },
            {
                from: 1000,
                to: 99999999,
                fontSize: 16
            },
        ];

        var newData = [];

        $.each(data, function(index, item)
        {

            $.each(ranges, function(rangeIndex, range)
            {

                if (
                       item.value >= range.from
                    && item.value <= range.to
                )
                {
                    item.colorValue = rangeIndex + 2;
                    item.dataLabels = {
                        style: {
                            fontSize: range.fontSize + 'px'
                        }
                    };
                    return false;
                }

            });

            newData.push(item);

        });

        return newData;

    },

    render: function(data)
    {

        var options = {
            colorAxis: {
                minColor: '#FFCCCC',
                maxColor: '#FF0000'
            },
            legend: {
                enabled: false
            },
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
                layoutAlgorithm: 'strip',
                levels: [{
                    level: 1,
                    borderWidth: 3
                }],
                data: data
            }],
            title: {
                text: ''
            },
            credits: {
                enabled: false
            }
        };

        app.chart.highcharts(options);

    }
};
