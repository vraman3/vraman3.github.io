$(document).ready(function() { 

    /* --------------------------------------------------------------------------- */
    /*  Easytabs
    /* --------------------------------------------------------------------------- */

    var $content            = $("#content");

    $content.easytabs({
        tabs                :"> .navigation > ul > li",
        animate             : true,
        updateHash          : true,
        animationSpeed      :'normal',
    });
    /* /Easytabs ----------------------------------------------------------------- */

    

});

$('.tab-welcome').click(function() {
    
    $('#about').css('display', 'none');

});