'use strict';

/**
 * @ngdoc function
 * @name imageLooperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imageLooperApp
 */
angular.module('imageLooperApp')
  .controller('MainCtrl', function ($scope, $mdDialog, $log,$window, $firebaseArray, chartService, imageService, localStorageService) {
    //CREATE A FIREBASE REFERENCE
    var ref = new Firebase("https://imagelooper.firebaseio.com/");
    var vm = this;
    vm.scroll = true;
    imageService.fetchImages();
    vm.busy = false;
    vm.images = [];
    // GET MESSAGES AS AN ARRAY
    vm.likes = $firebaseArray(ref);
    vm.liked=localStorageService.get('likes') || [];

    vm.like = function (index) {
      if (!(index >= 0)) return;
      var image = vm.images[index];
      var liked = localStorageService.get('likes');
      if (!liked) {
        liked = [];
      }
      liked.push(image.name);
      localStorageService.set('likes', liked);
      vm.liked=liked;

      for (var i = vm.likes.length - 1; i >= 0; i--) {
        if (vm.likes[i].name == image.name) {
          vm.likes[i].likes += 1;
          vm.likes.$save(vm.likes[i]).then(function () {

          });
          break;
        }
      }
      if (i < 0) {
        //ADD TO FIREBASE
        vm.likes.$add({
          "name": image.name,
          "likes": 1
        });
      }

    };
    vm.getLikes = function (name) {
      var like = vm.likes.filter(function (like) {
        return like.name == name;
      });
      if (like && like.length) {
        return like[0].likes;
      }
      return 0;
    };
    vm.isLiked = function (name) {
      return vm.liked.indexOf(name)>=0?true:false;
    };
    vm.share=function(site,image){
      var sharing={
        'facebook':function(image){
          $window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(image.url) + '&p[images][0]=' + encodeURIComponent(image.url) + '&p[title]=' + encodeURIComponent(image.name) + '&p[summary]=' + encodeURIComponent('Sharing this image by ImageLooper... :)'), 'Facebook', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        'twitter':function(image){
          $window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(image.url) + '&text=' + encodeURIComponent('via ImageLooper... :)') + '%20' + encodeURIComponent(image.url), 'Twitter', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        'google':function(image){
          $window.open('//plus.google.com/share?url=' + encodeURIComponent(image.url), 'GooglePlus', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
      };
      sharing[site](image);
    };
    vm.next = function () {
      if (vm.busy) return;
      vm.busy = true;
      var page = vm.images.length / 10;
      imageService.fetchImages(page).success(function (data) {
        vm.busy = false;
        $log.info("Images fetched!");
        vm.images = vm.images.concat(data);
        $log.info(vm.images);
      }).error(function (err) {
        vm.busy = false;
        $log.error("Unable to fetch images!");
      })
    };
    vm.next();
//vm.images = [
//    {
//        "name": "2000px-National_Security_Agency.svg.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/2000px-National_Security_Agency.svg.png",
//        "demographic": {
//            "USA": 60,
//            "China": 29,
//            "India": 47
//        }
//    },
//    {
//        "name": "2000px-Virtual_Private_Network_overview.svg.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/2000px-Virtual_Private_Network_overview.svg.png",
//        "demographic": {
//            "USA": 17,
//            "China": 12,
//            "India": 15
//        }
//    },
//    {
//        "name": "207138-iPhone6-device2.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/207138-iPhone6-device2.jpg",
//        "demographic": {
//            "USA": 97,
//            "China": 46,
//            "India": 97
//        }
//    },
//    {
//        "name": "220px-Profilewireframe.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/220px-Profilewireframe.png",
//        "demographic": {
//            "USA": 73,
//            "China": 50,
//            "India": 44
//        }
//    },
//    {
//        "name": "242f0dfa63169396a65834fe2fcd55d9.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/242f0dfa63169396a65834fe2fcd55d9.jpg",
//        "demographic": {
//            "USA": 9,
//            "China": 11,
//            "India": 87
//        }
//    },
//    {
//        "name": "27f8ab925bf70045abb84eda1d94d04b.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/27f8ab925bf70045abb84eda1d94d04b.jpg",
//        "demographic": {
//            "USA": 20,
//            "China": 65,
//            "India": 14
//        }
//    },
//    {
//        "name": "297548-apple-macbook-air-11-inch-mid-2012.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/297548-apple-macbook-air-11-inch-mid-2012.jpg",
//        "demographic": {
//            "USA": 89,
//            "China": 34,
//            "India": 11
//        }
//    },
//    {
//        "name": "3b5432d2fbb445e44c68e26b9111489e-d6lva07.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/3b5432d2fbb445e44c68e26b9111489e-d6lva07.jpg",
//        "demographic": {
//            "USA": 26,
//            "China": 18,
//            "India": 60
//        }
//    },
//    {
//        "name": "402ec059fa9d8314ba7ea7752d309136-d6lv9vv.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/402ec059fa9d8314ba7ea7752d309136-d6lv9vv.jpg",
//        "demographic": {
//            "USA": 92,
//            "China": 86,
//            "India": 35
//        }
//    },
//    {
//        "name": "4682.Bing-logo-orange-RGB.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/4682.Bing-logo-orange-RGB.jpg",
//        "demographic": {
//            "USA": 61,
//            "China": 97,
//            "India": 25
//        }
//    },
//    {
//        "name": "10-25-13_pinterest-quotes.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/10-25-13_pinterest-quotes.jpg",
//        "demographic": {
//            "USA": 55,
//            "China": 60,
//            "India": 34
//        }
//    },
//    {
//        "name": "1102-swift-inset-4.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/1102-swift-inset-4.jpg",
//        "demographic": {
//            "USA": 57,
//            "China": 5,
//            "India": 85
//        }
//    },
//    {
//        "name": "11223_497006_700b.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/11223_497006_700b.jpg",
//        "demographic": {
//            "USA": 96,
//            "China": 11,
//            "India": 84
//        }
//    },
//    {
//        "name": "113009-taylor-swift-400_1.jpg%3Fitok%3D06fRPQeD",
//        "url": "http://cdn.gainsight.0x10.info/api/images/113009-taylor-swift-400_1.jpg%3Fitok%3D06fRPQeD",
//        "demographic": {
//            "USA": 5,
//            "China": 48,
//            "India": 20
//        }
//    },
//    {
//        "name": "12.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/12.png",
//        "demographic": {
//            "USA": 24,
//            "China": 62,
//            "India": 17
//        }
//    },
//    {
//        "name": "137005-Nerd-Girl-Drawing.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/137005-Nerd-Girl-Drawing.jpg",
//        "demographic": {
//            "USA": 69,
//            "China": 56,
//            "India": 64
//        }
//    },
//    {
//        "name": "141010005851bing.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/141010005851bing.jpg",
//        "demographic": {
//            "USA": 44,
//            "China": 5,
//            "India": 100
//        }
//    },
//    {
//        "name": "1499756638_fd4917c94f_b.jpg",
//        "url": "http://cdn.gainsight.0x10.info/api/images/1499756638_fd4917c94f_b.jpg",
//        "demographic": {
//            "USA": 22,
//            "China": 11,
//            "India": 86
//        }
//    },
//    {
//        "name": "2000px-9GAG_new_logo.svg.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/2000px-9GAG_new_logo.svg.png",
//        "demographic": {
//            "USA": 78,
//            "China": 62,
//            "India": 38
//        }
//    },
//    {
//        "name": "2000px-NASA_logo.svg.png",
//        "url": "http://cdn.gainsight.0x10.info/api/images/2000px-NASA_logo.svg.png",
//        "demographic": {
//            "USA": 2,
//            "China": 97,
//            "India": 27
//        }
//    }
//];

    vm.showChart = function (ev, index) {
      chartService.setChartData(vm.images[index].demographic);
      $mdDialog.show({
        controller: 'ChartController as vm',
        templateUrl: 'views/chart.html',
        parent: angular.element(document.body),
        targetEvent: ev || null
      }).then(function () {
      }, function () {
      });
    };

    vm.expand = function (ev) {
      //var element=ev.originalEvent.currentTarget;
      var element = ev.currentTarget.offsetParent.offsetParent.children[0].children[0].children[1];
      if (element.requestFullScreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };
    var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
    vm.getRandomColor = function (index) {
      return COLORS[index > COLORS.length ? index % COLORS.length : index];
      //return COLORS[Math.floor(Math.random() * COLORS.length)];
    };

  })
;
