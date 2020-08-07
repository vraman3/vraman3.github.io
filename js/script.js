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
    
    var numImgs = $('div.slideshow-image-holder img').length;
    
    //console.log(numImgs);
    
    if(numImgs >= 2) {
        var ul = document.getElementById("carousel-dots");
        
        console.log(ul);
        for(i=0; i < numImgs; i++ ) {
            var li = document.createElement("li");
            li.setAttribute("class", "carousel-buttons");
            li.setAttribute("id", "carousel" + (i+1) );
            
            ul.appendChild(li);
            
        }
    }
    
    $(".slideshow-buttons-container").find("li").first().addClass("active");
});