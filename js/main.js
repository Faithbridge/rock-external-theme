document.addEventListener("DOMContentLoaded", function() {

/*

CARD SLIDERS

*/

// Get all sliders on page
var sliders = document.querySelectorAll('[data-slider]');

// Loop through them and adjust container width
sliders.forEach(function(element) {

    var cardWidth = "300";

    // Set slider element
    var slider = element.children[0];

    // Calculate count of slider child elements
    var sliderItemCount = slider.children.length;

    // Set child elements array
    var sliderChildren = slider.children
    
    var index;

    // Loop through child elements array and set widths
    for (i = 0; i < sliderChildren.length; ++i) {
        sliderChildren[i].style.width = cardWidth - 20 + "px";
    }

    // Calculate slider width
    var sliderWrapperWidth = sliderItemCount * cardWidth + 20;

    // Adjust slider width
    slider.style.width = sliderWrapperWidth + "px";

});


});