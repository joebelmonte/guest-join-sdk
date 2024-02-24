// EFH: removed a bunch of stuff that we're not using from original Innerbridge file

// Mobile Dropdown

// EFH: changed $ to jQuery, not sure why $ is undefined after /site/wp/includes/js/jquery/jquery.js?ver=1.10.2 is included???
/*
jQuery(document).ready(function () {

    if (jQuery(window).width() < 797) {
		
        jQuery('#menu-top').click(function () {
            jQuery(this).find('li').toggle();
            jQuery('#menu-main').find('li').toggle();
		});
	}
});
*/

(function () {
    var menuToggle = function () {
        if (jQuery(window).width() < 797) {
            var menuOpen = false;
            jQuery('#menu-top').click(function () {
                    var d = menuOpen ? "none" : "list-item";
                    jQuery(this).find('li').css("display", d);
                    jQuery('#menu-main').find('li').css("display", d);
                    menuOpen = !menuOpen;
                });
        } else {
            jQuery('#menu-top').find('li').css("display", "");
            jQuery('#menu-main').find('li').css("display", "");
            jQuery('#menu-top').off("click");
        }
    }

    jQuery(document).ready(menuToggle);
    jQuery(window).resize(menuToggle);
})();
