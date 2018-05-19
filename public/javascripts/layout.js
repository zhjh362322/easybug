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
		});
		$('.headermenu .task').parent().addClass('current');
	});
	$('.headermenu .message').click(function() {
		$('.headermenu ul li a').each(function() {
			$(this).parent().removeClass('current');
		});
		$('.headermenu .message').parent().addClass('current');
	});

	$('.settingAccount').click(function() {
		$('.setting').show();
	});
	$('.edituser').click(function() {
		var data = {};
        var formData = $('.setting form').serializeArray();
        formData.forEach(function(obj, idx) {
            data[obj.name] = obj.value;
        });
        $.ajax({
            url: '/users/edituser',
            type: 'post',
            data: data,
            success: function(rst, status) {
                location.href = '/users/userlist';
            },
            error: function(rst, status) {
                var rstJson = rst.responseJSON;
                // $('.err').text(rstJson.err).show();
            }
        });
	});
});