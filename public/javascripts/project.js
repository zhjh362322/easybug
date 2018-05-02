$(function(){
	$('.addtask a').click(function() {
		$('.projectmodal').show();
		$('.addproject').show();
	})
	$('.projectmodal').click(function(e) {
		$('.projectmodal').hide();
		$('.addproject').hide();
	});
})