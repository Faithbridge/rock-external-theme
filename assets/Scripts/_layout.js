document.addEventListener("DOMContentLoaded", function() {
	function calculateLayout() {
		// Get window width to determine if nav will be fixed to top/bottom
		var windowWidth = window.innerWidth;

		// Calculate navigation section height
		var navHeight = document.querySelector('#navigation').offsetHeight;

		if(windowWidth > 667) {
			// Desktop
			// document.querySelector('#content').style.marginBottom = '0';
			// document.querySelector('#content').style.marginTop = navHeight + "px";
		} else {
			// Mobile
			// document.querySelector('#content').style.marginTop = '0';
			// document.querySelector('#content').style.marginBottom = (navHeight + 15) + "px";
		}
		
	}

	// Initial setup layout
	calculateLayout();

	window.addEventListener("resize", function(){
		// Recalculate layout on window resize
		calculateLayout();
	});

});