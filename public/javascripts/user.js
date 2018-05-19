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

    $('.tableoptions .del').click(function() {
        var checklist = $('.userlist .check:checked');
        var data = [];
        checklist.each(function(index, ele) {
            data[index] = ele.value;
        });

        $.ajax({
            url: '/users/deluser',
            type: 'post',
            data: {'checklist': data},
            traditional: true,
            success: function(rst, status) {
                location.href = '/users/userlist';
            },
            error: function(rst, status) {
                var rstJson = rst.responseJSON;
                // $('.err').text(rstJson.err).show();
            }
        });
    });

    $('.checkall').click(function() {
        if($(this).prop('checked')) {
            $('.check').prop('checked', true);
        } else {
            $('.check').prop('checked', false);
        }
    });
    //  table 编辑
    // $('.tableoptions .update').click(function() {
    //     var formData = $('.updateuser form').serializeArray();
    //     console.log(formData);
    // });
    // $('table .edit').dblclick(function(e) {
    //     // var _id = $(this).parent('tr').children().children('input').val();
    //     var td = $(this);
    //     var txt = td.text();
    //     var select = $("<select>" +
    //                         "<option value='10'>普通用户</option>" +
    //                         "<option value='20'>管理员</option>" +
    //                     "</select>");
    //     td.html(select);
    //     td.blur(function() {
    //         console.log(111);
    //     });
    // });
});