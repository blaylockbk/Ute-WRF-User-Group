var timeoutID;
$(document).ready(function(){
	$('.dropdown').mouseenter(function(){
		$('.sublinks').stop(false, true).hide();
		window.clearTimeout(timeoutID);
		var submenu = $(this).parent().next();

		submenu.css({
			position:'absolute',
			top: $(this).offset().top + $(this).height() + 'px',
			left: $(this).offset().left + 'px',
			zIndex:1000
		});
		
		submenu.stop().slideDown(300);
		
		submenu.mouseleave(function(){
			$(this).slideUp(300);
		});
		
		submenu.mouseenter(function(){
			window.clearTimeout(timeoutID);
		});
		
	});
	$('.dropdown').mouseleave(function(){
		timeoutID = window.setTimeout(function() {$('.sublinks').stop(false, true).slideUp(300);}, 250);  // slide up
	});
});