$(function() {
    $('.showuserlist').click(function() {
        location.href = "/users/userlist";
    });

    $('.newuser').click(function() {
        location.href = "/users/adduser";
    });
});