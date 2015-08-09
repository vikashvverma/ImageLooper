'use strict';

/**
 * @ngdoc function
 * @name imageLooperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imageLooperApp
 */
angular.module('imageLooperApp')
    .controller('ChartController', function ($scope,$mdDialog,chartService) {
        var vm=this;
        vm.type='bar';
        //var data = [
        //    ['Mechanical', 8],
        //    ['Electrical', 3],
        //    ['Production', 1],
        //    ['Metal', 6],
        //    ['Chemical', 8],
        //    ['Civil', 4],
        //    ['ECE', 4],
        //    ['Mining', 10],
        //    ['CSE', 4],
        //    ['IT', 1],
        //    ['Others', 1]
        //];
        vm.data=chartService.getChartData();
        this.drawPieChart = function(theme) {

            var style = chartService.getTheme('Unicia');
            //Highcharts.setOptions(style?style():{});
            //$('#piechart').highcharts(chartService.getPie(data));
            $('#piechart text').last().remove();
        };
        vm.hide = function() {
            $mdDialog.hide();
        };
        vm.cancel = function() {
            $mdDialog.cancel();
        };


    });
