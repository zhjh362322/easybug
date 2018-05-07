$(function() {
    $('.showuserlist').click(function() {
        $.get('/users/userlist', function(data, status) {

        });
    });
});