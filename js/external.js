$(document).ready(function () {

    $('.tab-item').click(function () {

        var currentAttributeValue = $(this).attr('href');

        var currentItem = $(currentAttributeValue);

        if (currentItem.hasClass('showing')) {
            // currentItem.removeClass('showing').addClass('hiding');
        }
        else {
            currentItem.removeClass('hiding').addClass('showing');
        }

        $('.content-div:not(' + currentAttributeValue + ')').removeClass('showing').addClass('hiding');
    })

    /*$("#slideshow > div:gt(0)").hide();

    setInterval(function() {
    $('#slideshow > div:first')
        .fadeOut(1)
        .next()
        .fadeIn(1)
        .end()
        .appendTo('#slideshow');
    }, 3000); */

    /*setInterval(function() {
        $('.carousel-image-holder > img:first')
        .fadeOut(1000).promise().done(function () {
            $('.carousel-image-holder > img:first').next()
            .fadeIn(1000)
            .end()
            .appendTo('.carousel-image-holder');
        })
    }, 3000);*/


    var numImgs = $('div.carousel-image-holder img').length;

    var addId = numImgs;
    
    if (numImgs > 2) {
        var ul = document.getElementById("carousel-dots");

        for (var i = 0; i < numImgs; i++) {
            var li = document.createElement("li");
            li.setAttribute("class", "carousel-buttons");
            li.setAttribute("id", "carousel" + (i+1) );

            ul.appendChild(li);
            var addId = addId - 1;
        }
    }

    $(".carousel-buttons-container").find("li").first().addClass("active");

    $(".carousel-buttons").click(function () {

        // Find the id of the navigation dot that was clicked and get it's number
        var findIdClicked = $(this).attr("id");
        var splitString = findIdClicked.split("carousel")
        var findTheNumb = splitString[1];

        $(".carousel-buttons").removeClass("active");
        $(this).addClass("active");

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("carousel-image-holder").item(0);
        
        // Get the current image handle
        var currentImg = "#" + imgContainerHandle.getElementsByTagName("img")[findTheNumb - 1].getAttribute("id");

        // Remove any images that are showing
        $('.individualImage:not(' + currentImg + ')').removeClass("showing").addClass("hiding");
        
        // Make the image corresponding to the nav dot visible.
        $(currentImg).removeClass("hiding").addClass("showing");

    });
    
    removeExistingImagesAndNavigationDots = function (selectedImage, selectedImageNavDotId) {

        // Remove any images that are not prevImg & their nav dot
        $('.individualImage:not(' + selectedImage + ')').removeClass("showing").addClass("hiding");
        $("#" + selectedImageNavDotId).removeClass("active");

    }
    
    refreshImagesAndNavigationDots = function (selectedImage, selectedImageNavDotId, currentImageNumber, buttonString) {

        
        // Make the selected image and it's nav dot active.
        $(selectedImage).removeClass("hiding").addClass("showing");

        if(buttonString === "prev") {

            var newNavDotId = Number(currentImageNumber) - 1;
            
            if(newNavDotId == 0) {
                newCarouselString = "#carousel" + String(parseInt(numImgs));
            } else {
                newCarouselString = "#carousel" + String(newNavDotId);
            }
            
        } else if(buttonString === "next") {

            var newNavDotId = Number(currentImageNumber) + 1;

            if(newNavDotId > numImgs) {
                //
                // Could also do the following for consistency, but unnecessary
                // newCarouselString = "#carousel" + String(parseInt(1));
                ///
                newCarouselString = "#carousel1";
            } else {
                newCarouselString = "#carousel" + String(newNavDotId);
            }
        }

        $(newCarouselString).addClass("active");
    }

    $(".prev").click(function () {

        // Find the current dot that is active
        var currNavDotId = $("#carousel-dots").find(".active").attr("id");

        var splitString = currNavDotId.split("carousel")
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("carousel-image-holder").item(0);

        // Check if it is the first dot
        if(currentImageNumber == 1) {

            // Get the handle for the last image
            var lastImg = "#" + imgContainerHandle.getElementsByTagName("img")[ parseInt(numImgs - 1) ].getAttribute("id");

            removeExistingImagesAndNavigationDots(lastImg, currNavDotId);

            refreshImagesAndNavigationDots(lastImg, currNavDotId, currentImageNumber, "prev");
        } else {
            
            // Get the handle for the previous image
            var prevImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 - 1].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(lastImg, currNavDotId);
            refreshImagesAndNavigationDots(prevImg, currNavDotId, currentImageNumber, "prev");
        }
    });

    $(".next").click(function () {

        // Find the current dot that is active
        var currNavDotId = $("#carousel-dots").find(".active").attr("id");

        var splitString = currNavDotId.split("carousel")
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("carousel-image-holder").item(0);

        // Check if it is the last dot
        if(currentImageNumber == numImgs) {
            // Get the handle for the first image
            var firstImg = "#" + imgContainerHandle.getElementsByTagName("img")[0].getAttribute("id");

            removeExistingImagesAndNavigationDots(firstImg, currNavDotId);

            refreshImagesAndNavigationDots(firstImg, currNavDotId, currentImageNumber, "next");
            
            //$("#carousel1").addClass("active");

        } else {
            // Get the handle for the next image
            var nextImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 + 1].getAttribute("id");

            removeExistingImagesAndNavigationDots(nextImg, currNavDotId);
            
            refreshImagesAndNavigationDots(nextImg, currNavDotId, currentImageNumber, "next");
            
            //$("#carousel" + String( Number(currentImageNumber) + 1 ) ).addClass("active");
        }
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

    
});

