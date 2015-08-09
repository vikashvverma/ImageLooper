angular.module('imageLooperApp').factory('imageService', function($rootScope, $http, $q, $log) {
    var images=[];
    return {
        fetchImages:function(page){
           return $http({
               method:'GET',
               url:'http://gainsight.0x10.info/api/image?page_no='+(page && page>0?page:0)
           }).success(function(data){
               images.push(data);
               $log.info(data);
           }).error(function (err) {
               $log.error(err);
           });
        },
        getImages:function(){
            return images;
        }
    }
});
