function SlideshowTimer(func, interval) {
    timerObj = setInterval(func, interval);

    this.stop = function () {
        if(timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    this.start = function() {
        if(!timerObj) {
            this.stop();
            timerObj = setInterval(func, interval);
        }
        return this;
    }

    // default value of newInterval is interval
    this.reset = function(newInterval = interval) {
        interval = newInterval;
        return this.stop().start();
    }
}

$(document).ready(function () {
    
    var slideTimer = new SlideshowTimer(function() {
        $(".next").trigger("click");
    }, 5000);
    
    var numImgs = $('div.slideshow-image-holder img').length;
    
//    console.log(numImgs);

    // Add carousel-buttons in real-time based on the number of 'img's present
    // in the carousel-image-holder div and set the first nav dot to active
    if(numImgs >= 2) {
        var ul = document.getElementsByClassName("carousel-dots-ul")[0];
        
        for(i=0; i < numImgs; i++ ) {
            var li = document.createElement("li");
            li.setAttribute("class", "carousel-dots-li");
            li.setAttribute("id", "dot" + (i+1) );
            
            ul.appendChild(li);
        }
    }
    
    $(".slideshow-buttons-container").find("li").first().addClass("active");
    
    $(".carousel-dots-li").click(function () {

        // Find the id of the navigation dot that was clicked and get it's number
        var findIdClicked = $(this).attr("id");
        var splitString = findIdClicked.split("dot");
        var findTheNumb = splitString[1];

        $(".carousel-dots-li").removeClass("active");
        $(this).addClass("active");
        
        // Get the handle for the image container
        var imgContainerHandle = document.getElementsByClassName("slideshow-image-holder")[0];
        
        // Get the current image handle
        var currentImg = "#" + imgContainerHandle.getElementsByTagName("img")[findTheNumb - 1].getAttribute("id");
        
        // Remove any images that are showing
        $('.slideImage:not(' + currentImg + ')').removeClass("showing").addClass("hiding");
        
        // Make the image corresponding to the nav dot visible
        $(currentImg).removeClass("hiding").addClass("showing");
        
        
        // Get the handle for the caption container
        var captionContainerHandle = document.getElementsByClassName("image-caption-container")[0];
        
        // Get the current caption handle
        var currentCaption = "#" + captionContainerHandle.getElementsByTagName("p")[findTheNumb - 1].getAttribute("id");
        
        // Remove any captions that are showing
        $('.image-caption-p:not(' + currentCaption + ')').removeClass("showing").addClass("hiding");
        
        // Make the caption corresponding to the nav dot visible
        $(currentCaption).removeClass("hiding").addClass("showing");
    });
    
    $(".prev").click(function () {

        // Find the current dot that is active
        var currNavDotClass = $(".carousel-dots-ul").find(".active").attr("id");
        
        var splitString = currNavDotClass.split("dot");
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("slideshow-image-holder").item(0);

        // Get the handle for caption container
        var captionContainerHandle = document.getElementsByClassName("image-caption-container")[0];
        
        // Check if it is the first dot
        if(currentImageNumber == 1) {

            // Get the handle for the last image
            var lastImg = "#" + imgContainerHandle.getElementsByTagName("img")[ parseInt(numImgs - 1) ].getAttribute("id");

            // Get the handle for the last caption
            var lastCaption = "#" + captionContainerHandle.getElementsByTagName("p")[parseInt(numImgs - 1) ].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(lastImg, lastCaption, currNavDotClass);
            refreshImagesAndNavigationDots(lastImg, lastCaption, currNavDotClass, currentImageNumber, numImgs, "prev");
        } else {
            
            // Get the handle for the previous image
            var prevImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 - 1].getAttribute("id");
            
            var prevCaption = "#" + captionContainerHandle.getElementsByTagName("p")[currentImageNumber - 1 - 1].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(prevImg, prevCaption, currNavDotClass);
            refreshImagesAndNavigationDots(prevImg, prevCaption, currNavDotClass, currentImageNumber, numImgs, "prev");
        }

        slideTimer.reset();
    });
    
    $(".next").click(function () {

        // Find the current dot that is active
        var currNavDotId = $(".carousel-dots-ul").find(".active").attr("id");

        var splitString = currNavDotId.split("dot")
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("slideshow-image-holder").item(0);
        
        // Get the handle for caption container
        var captionContainerHandle = document.getElementsByClassName("image-caption-container")[0];
        
        // Check if it is the last dot
        if(currentImageNumber == numImgs) {
            // Get the handle for the first image
            var firstImg = "#" + imgContainerHandle.getElementsByTagName("img")[0].getAttribute("id");
                        
            var firstCaption = "#" + captionContainerHandle.getElementsByTagName("p")[0].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(firstImg, firstCaption, currNavDotId);
            refreshImagesAndNavigationDots(firstImg, firstCaption, currNavDotId, currentImageNumber, numImgs, "next");

        } else {
            // Get the handle for the next image
            var nextImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 + 1].getAttribute("id");
            
            var nextCaption = "#" + captionContainerHandle.getElementsByTagName("p")[currentImageNumber - 1 + 1].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(nextImg, nextCaption, currNavDotId);
            refreshImagesAndNavigationDots(nextImg, nextCaption, currNavDotId, currentImageNumber, numImgs, "next");
        }

        slideTimer.reset();
    });
});


    removeExistingImagesAndNavigationDots = function (selectedImage, selectedCaption, selectedImageNavDotId) {

        // Remove any images that are not selectedImg & their nav dot
        $('.slideImage:not(' + selectedImage + ')').removeClass("showing").addClass("hiding");
        
        $("#" + selectedImageNavDotId).removeClass("active");
        
        // Remove the captions that are not for selectedImg
        $('.image-caption-p:not(' + selectedCaption + ')').removeClass("showing").addClass("hiding");

    }
    
    refreshImagesAndNavigationDots = function (selectedImage, selectedCaption, selectedImageNavDotId, currentImageNumber, numImgs, buttonString) {

        // Make the selected image and it's nav dot active.
        $(selectedImage).removeClass("hiding").addClass("showing");

        $(selectedCaption).removeClass("hiding").addClass("showing");
        
        if(buttonString === "prev") {

            var newNavDotId = Number(currentImageNumber) - 1;
            
            if(newNavDotId == 0) {
                newCarouselString = "#dot" + String(parseInt(numImgs));
            } else {
                newCarouselString = "#dot" + String(newNavDotId);
            }
            
        } else if(buttonString === "next") {

            var newNavDotId = Number(currentImageNumber) + 1;

            if(newNavDotId > numImgs) {
                //
                // Could also do the following for consistency, but unnecessary
                // newCarouselString = "#carousel" + String(parseInt(1));
                ///
                newCarouselString = "#dot1";
            } else {
                newCarouselString = "#dot" + String(newNavDotId);
            }
        }

        $(newCarouselString).addClass("active");
    }
    
    
//});