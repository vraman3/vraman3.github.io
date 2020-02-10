$(document).ready(function () {

    /*$(".tab-welcome").click(function() {
    
        $("#welcome").toggle();
    
    }); 
    
    $(".tab-about").click(function() {
    
        $("#about").toggle();
    
    });

    $(".tab-portfolio").click(function() {
    
        $("#portfolio").toggle();
    
    });*/

    $('.tab-item').click(function () {

        var currentAttributeValue = $(this).attr('href');

        var currentItem = $(currentAttributeValue);

        if (currentItem.hasClass('showing')) {
            currentItem.removeClass('showing').addClass('hiding');
        }
        else {
            currentItem.removeClass('hiding').addClass('showing');
        }

        $('.content-div:not(' + currentAttributeValue + ')').removeClass('showing').addClass('hiding');
    })

    //$(".left-arrow").hide();
    var numImgs = $('div.carousel-image-holder img').length;

    var addId = numImgs;



    if (numImgs == 2) {
        var clicked = 0;
        imgCount = numImgs - 2;
    } else if (numImgs <= 1) {
        $(".right-arrow").hide();
    } else {
        var clicked = 1;
        imgCount = numImgs - 1;
    }
    if (numImgs > 2) {
        var ul = document.getElementById("carousel-dots");

        for (var i = 0; i < numImgs; i++) {
            var li = document.createElement("li");
            li.setAttribute("class", "carousel-buttons");
            li.setAttribute("id", "carousel" + addId);

            ul.appendChild(li);
            //$("ul carousel-dots").prepend('<li class="carousel-buttons" id="carousel' + addId + '"></li>');
            var addId = addId - 1;
        }
    } else {

    }

    
    $(".carousel-buttons").click(function () {

        var findIdClicked = $(this).attr("id");

        var splitString = findIdClicked.split("carousel")
        var findTheNumb = splitString[1];

        $(".carousel-buttons").removeClass("active");
        $(this).addClass("active");
        clicked = parseInt(findTheNumb);
        var adjustNumberforSlide = findTheNumb - 1;

        $(".carousel-image-holder").animate({ "left": -(600 * adjustNumberforSlide) + "px" });
        console.log(clicked);

        if (findTheNumb == 1) {
            $(".left-arrow").hide();
            $(".right-arrow").show();

            // $(".individualImage").show();
            firstImg = document.getElementsByClassName("carousel-image-holder");
            firstImg[1].show();
        } else if (findTheNumb == numImgs) {
            $(".right-arrow").hide();
            $(".left-arrow").show();

            // $(".individualImage").show();
            // firstImg = document.getElementsByClassName("individualImage");
            // firstImg[1].show();
        } else {
            $(".right-arrow").show();
            $(".left-arrow").show();

            // $(".individualImage").show();
        }

         //.style.display = "inline-block";
    
    });


    $(".carousel-buttons-container").find("li").first().addClass("active");

    //firstImg = document.getElementsByClassName("carousel-image-holder");
    //firstImg[1].style.display = "inline-block";
    

    $(".right-arrow").click(function () {

        if (clicked < imgCount) {

            $(".carousel-image-holder").animate({ "left": "-=600px" });


            console.log(clicked);
        } else {
            $(".carousel-image-holder").animate({ "left": "-=600px" });
            $(".right-arrow").hide();

            console.log(clicked);
        }

        clicked = clicked + 1;
        $(".left-arrow").show();
        $(".carousel-buttons").removeClass("active");
        $("#carousel" + clicked).addClass("active");

    });

    $(".left-arrow").click(function () {

        if (clicked > 2) {

            $(".carousel-image-holder").animate({ "left": "+=600px" });

            console.log(clicked);
        } else {
            $(".carousel-image-holder").animate({ "left": "+=600px" });
            $(".left-arrow").hide();

            console.log(clicked);
        }

        $(".right-arrow").show();
        clicked = clicked - 1;
        $(".carousel-buttons").removeClass("active");
        $("#carousel" + clicked).addClass("active");


    });

    /*var slideIndex = 1;
    showSlides(slideIndex);

    $('.prev').click(currentSlide(-1));
    $('#nextSlide').click(currentSlide(1));

    $('.dotsa').click(currentSlide(2));

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slidesClass = document.getElementsByClassName("slides");
        var dot = document.getElementsByClassName("dotsa");
        
        if(n > slidesClass.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slidesClass.length;
        }

        for(i=0; i < slidesClass.length; i++) {
            slidesClass[i].style.display = "none";
        }
        for(i=0; i < dot.length; i++) {
            dot[i].className = dot[i].className.replace("active", "");
        }

        slidesClass[slideIndex-1].style.display = "block";
        dot[slideIndex-1].className += "active";

    }*/

    /*$("#slideshow > div:gt(0)").hide();

    setInterval(function() {
    $('#slideshow > div:first')
        .fadeOut(1)
        .next()
        .fadeIn(1)
        .end()
        .appendTo('#slideshow');
    }, 3000); */
});

