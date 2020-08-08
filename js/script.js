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
    
    slideTimer.stop();
    
    var numImgs = $('div.slideshow-image-holder img').length;
    
//    console.log(numImgs);

    if(numImgs >= 2) {
        var ul = document.getElementsByClassName("carousel-dots-ul")[0];
        
        for(i=0; i < numImgs; i++ ) {
            var li = document.createElement("li");
            li.setAttribute("class", "carousel-dots-li");
            li.setAttribute("id", "carousel" + (i+1) );
            
            ul.appendChild(li);
        }
    }
    
    $(".slideshow-buttons-container").find("li").first().addClass("active");
    
    removeExistingImagesAndNavigationDots = function (selectedImage, selectedImageNavDotId) {

        // Remove any images that are not prevImg & their nav dot
        $('.slideImage:not(' + selectedImage + ')').removeClass("showing").addClass("hiding");
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
        var currNavDotClass = $(".carousel-dots-ul").find(".active").attr("id");
        
        var splitString = currNavDotClass.split("carousel");
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("slideshow-image-holder").item(0);

        // Check if it is the first dot
        if(currentImageNumber == 1) {

            // Get the handle for the last image
            var lastImg = "#" + imgContainerHandle.getElementsByTagName("img")[ parseInt(numImgs - 1) ].getAttribute("id");

            removeExistingImagesAndNavigationDots(lastImg, currNavDotClass);
            refreshImagesAndNavigationDots(lastImg, currNavDotClass, currentImageNumber, "prev");
        } else {
            
            // Get the handle for the previous image
            var prevImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 - 1].getAttribute("id");
            
            removeExistingImagesAndNavigationDots(prevImg, currNavDotClass);
            refreshImagesAndNavigationDots(prevImg, currNavDotClass, currentImageNumber, "prev");
        }

        slideTimer.reset();
    });
    
    $(".next").click(function () {

        // Find the current dot that is active
        var currNavDotId = $(".carousel-dots-ul").find(".active").attr("id");

        var splitString = currNavDotId.split("carousel")
        var currentImageNumber = splitString[1];

        // Get the handle for image container
        var imgContainerHandle = document.getElementsByClassName("slideshow-image-holder").item(0);

        // Check if it is the last dot
        if(currentImageNumber == numImgs) {
            // Get the handle for the first image
            var firstImg = "#" + imgContainerHandle.getElementsByTagName("img")[0].getAttribute("id");

            removeExistingImagesAndNavigationDots(firstImg, currNavDotId);
            refreshImagesAndNavigationDots(firstImg, currNavDotId, currentImageNumber, "next");

        } else {
            // Get the handle for the next image
            var nextImg = "#" + imgContainerHandle.getElementsByTagName("img")[currentImageNumber - 1 + 1].getAttribute("id");

            removeExistingImagesAndNavigationDots(nextImg, currNavDotId);
            refreshImagesAndNavigationDots(nextImg, currNavDotId, currentImageNumber, "next");
        }

        slideTimer.reset();
    });
});