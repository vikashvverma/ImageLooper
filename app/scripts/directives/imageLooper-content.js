angular.module("imageLooperApp").directive('looperContent', function() {
    function link(scope, element, attrs) {
        var $element = $(window);
        //alert(JSON.stringify(attrs));
        $element.scroll(function() {
            //alert();
            if ($element.scrollTop() == 0)
                scope.$emit("top");
            else {
                scope.$emit("scrolling");
            }
        });
    }

    return {
        link: link
    };
});
