$(document).ready(function() { 

    /*$(".tab-welcome").click(function() {
    
        $("#welcome").toggle();
    
    }); 
    
    $(".tab-about").click(function() {
    
        $("#about").toggle();
    
    });

    $(".tab-portfolio").click(function() {
    
        $("#portfolio").toggle();
    
    });*/
       
    $('.tab-item').click(function() {

        var currentAttributeValue = $(this).attr('href');

        var currentItem = $(currentAttributeValue);

        if(currentItem.hasClass('showing')){
            currentItem.removeClass('showing').addClass('hiding');
        }
        else{
            currentItem.removeClass('hiding').addClass('showing');
        }

        $('.content-div:not('+ currentAttributeValue +')').removeClass('showing').addClass('hiding');
    })

    $("#slideshow > div:gt(0)").hide();

    setInterval(function() {
    $('#slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideshow');
    }, 3000);
});

