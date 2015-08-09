angular.module("imageLooperApp").directive('looperChart', function (chartService) {
    function getData(type, obj) {
        var data = [];
        var total = 0;
        if (type == 'pie') {
            for (var key in obj)
                total += obj[key];
            for (var key in obj) {
                data.push([].concat(key, Number(Number(100 * obj[key] / total).toFixed(2))));
            }
            return data;
        }
        data = {name: [], data: []};
        for (var key in obj)
            total += obj[key];
        for (var key in obj) {
            data.name.push(key);
            data.data.push(Number(Number(100 * obj[key] / total).toFixed(2)));
        }
        return data;
    }

    return {
        restrict: 'EA',
        scope: {
            data: '=',
            type: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('type', function (newType, oldType) {

                if (newType == 'pie') {
                    console.log(newType);
                    $(element).highcharts(chartService.getPie( getData(newType, scope.data)));
                }
                else {
                    $(element).highcharts(chartService.getChart(newType, getData(newType, scope.data)));
                }

            });

        }
    };
});