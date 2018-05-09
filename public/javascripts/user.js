$(function() {
    $('.showuserlist').click(function() {
        location.href = '/users/userlist';
    });

    $('.newuser').click(function() {
        location.href = '/users/adduser';
    });

    $('.save').click(function() {
        var data = {};
        var formData = $('.adduser form').serializeArray();
        formData.forEach(function(obj, idx) {
            data[obj.name] = obj.value;
        });
        $.ajax({
            url: '/users/adduser',
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