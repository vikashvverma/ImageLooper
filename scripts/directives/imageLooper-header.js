angular.module("imageLooperApp").directive('looperHeader', function() {
    function link(scope, element, attrs) {
        var $element = $(element);
        $element.click(function() {
            /* $("html, body").animate({ scrollTop: 0 }, "slow");
             return false;*/
        });
        scope.$on('top', function() {
            //alert();
            $element.removeClass('md-whiteframe-z3');
            $element.removeClass('nav-bar');
        });
        scope.$on('scrolling', function() {
            //alert();
            $element.addClass('md-whiteframe-z3');
            $element.addClass('nav-bar');
        });
    }

    return {
        link: link
    };
});
