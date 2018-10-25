/*

CARD SLIDERS

*/

// Get all sliders on page
var sliders = document.querySelectorAll('[data-slider]');

function cardSliderInit(){

    // Get window width
    var windowWidth = window.innerWidth;

    // Set card margin
    var cardMargin = Number(15);

    // Loop through them and adjust container width
    sliders.forEach(function(element) {

        // Set slider element
        var slider = element.children[0];

        // Set slider to 0 scroll
        slider.parentNode.scrollLeft = 0;

        // Get slider width
        var sliderWrapperWidth = slider.parentNode.offsetWidth;

        // Calculate count of slider child elements
        var sliderItemCount = slider.children.length;

        // Get card width from data attribute
        var cardWidth = element.getAttribute('data-slider');

        // If no card width is specified in data-slider attribute, use the defaults
        if(windowWidth <= 667) {
            cardWidth = sliderWrapperWidth - cardMargin * 4;
        } else {
            if(!cardWidth) {
                cardWidth = Number(300);
            }
        }

        // Set child elements array
        var sliderChildren = slider.children
        
        // Set loop index
        var index;

        // Loop through child elements array
        for (i = 0; i < sliderChildren.length; ++i) {

            // Set card width
            sliderChildren[i].style.width = cardWidth + "px";
        }

        // Calculate slider wrapper width
        var sliderWidth = Number(sliderItemCount) * (Number(cardWidth) + Number(cardMargin));

        // Set slider width
        slider.style.width = sliderWidth + "px";

    });

};

// Bind to window resize to recalculate for breakpoints
window.addEventListener("resize", function(){
    cardSliderInit();
});

// Initial card slider init
cardSliderInit();