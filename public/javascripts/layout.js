$(function() {
	$('.userinfo').click(function() {
		if(!$(this).hasClass('active')) {
			$('.userinfodrop').show();
			$(this).addClass('active');
		} else {
			$('.userinfodrop').hide();
			$(this).removeClass('active');
		}
		return false;
	});

	$('.headermenu .task').click(function() {
		$('.headermenu ul li a').each(function() {
			$(this).parent().removeClass('current');
		})
		$('.headermenu .task').parent().addClass('current');
	});
	$('.headermenu .message').click(function() {
		$('.headermenu ul li a').each(function() {
			$(this).parent().removeClass('current');
		})
		$('.headermenu .message').parent().addClass('current');
	})
})