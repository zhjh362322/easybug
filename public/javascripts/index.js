$(function() {
	$('.showmodal').click(function(e) {
		$('.loginmodal').show();
		$('.loginpage').show();
	});
	$('.loginmodal').click(function(e) {
		$('.loginmodal').hide();
		$('.loginpage').hide();
		$('.err').hide();
	});
	// 111222333
	$('#login').click(function() {
		var data = {};
		var formData = $('form').serializeArray();
		formData.forEach(function(obj, idx) {
			data[obj.name] = obj.value;
		})
		$.ajax({
			url: '/login',
			type: 'post',
			data: data,
			success: function(rst, status) {
				location.href = '/welcome'
			},
			error: function(rst, status) {
				var rstJson = rst.responseJSON;
				$('.err').text(rstJson.err).show();
			}
		})
	});
})