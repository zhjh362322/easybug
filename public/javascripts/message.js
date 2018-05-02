$(function(){
	// 双击message列表，显示message详情
	$('.centercontent .message li').dblclick(function(e) {
		var msgid = $(this).children('.status')[0].dataset.msgid.replace(/\"/g, '');
		$.get('/message/msginfo', {msgid: msgid}, function(data, status) {
			if(data) {
				console.log(data)
				// isedit 保存当前选中message的ID
				$('#isedit').val(data._id);
				$('#uid').val(data.receiver.uid);
				$('#receiver').val(data.receiver._id);
				$('input[name="title"]').val(data.title);
				$('textarea[name="detail"]').val(data.detail);
				$('.centercontent .message').hide();
				$('.newmsg').show();
			}
		});
	})
	// 点击左侧菜单效果，控制列表和新增面的显示隐藏。 addmsg & other
	$('.vernav li a').click(function() {
		$(this).each(function() {
			var addmsg = $(this).hasClass('addmsg');
			if(addmsg) {
				$('#isedit').val(0);
				$('#uid').val('');
				$('#receiver').val('');
				$('input[name="title"]').val('');
				$('textarea[name="detail"]').val('');
				$('.centercontent .message').hide();
				$('.newmsg').show();
			} else {
				$('.newmsg').hide();
				$('.centercontent .message').show();
			}
		})
	})
	// 收件人输入内容，查询用户列表
	$('#uid').bind('input propertychange', function(e) {
		var uid = $(this).val();
		var userlist = $('.userlist');
		// 无内容时隐藏，有输入内容时，显示查询结果
		if(!uid) {
			userlist.hide();
		} else {
			var top = $(this).position().top + 35;
			var left = $(this).position().left;
			userlist.css({top: top, left: left});
			userlist.show();
		}
		// 重新查询后，清空列表，不然会一直append
		userlist.empty();
		// 根据输入内容查询结果，并显示到页面
		$.get('/users/receiverlist', {'uid': uid}, function(data, status) {
			var html = '';
			if(data.length == 0) {
				html = "<li>" + "无结果" + "</li>";
			} else {
				$(data).each(function(i, n) {
					var li = "<li data-id=" + n['_id'] + " class='user'>" + n.uid + "</li>";
					html = html.concat(li, '');
				})
			}
			userlist.html(html)
		})

	})
	// 选择用户列表事件，主要是给收件人输入框赋值，并保存用户ID以便存入数据库
	$('.userlist').on('click','.user', function(e) {
		var id = $(this)[0].dataset.id;
		var name = $(this)[0].innerText;
		$('#receiver').val(id)
		$('#uid').val(name);
		$('.userlist').hide();
	})

	// 更新已读和星标状态
	$('.star').click(function() {
		$(this).toggleClass('current');
		var msgid = $(this).parent()[0].dataset.msgid.replace(/\"/g, '');
		var clz = $(this).hasClass('current');
		var url = '/message/updatestatus';
		var data = {star:'', msgid: msgid};
		if(clz) {
			data = {star:'current', msgid: msgid};
		}
		$.get(url, data, function(data, status) {
		})
	})
	$('.box').click(function() {
		$(this).toggleClass('current')
		var msgid = $(this).parent()[0].dataset.msgid.replace(/\"/g, '');
		var clz = $(this).hasClass('current');
		var url = '/message/updatestatus';
		var data = {box:'', msgid: msgid};
		if(clz) {
			data = {box:'current', msgid: msgid};
		}
		$.get(url, data, function(data, status) {
		})
	})

	// 保存草稿、发送、删除事件
	$('.submitButton').click(function(e) {
		var receiver = $('#receiver').val();
		console.log(receiver)
		var isedit = $('#isedit').val();
		var which = e.target.className;
		var data = {};
		var url = '/message/newmsg';
		// isedit有值时是双击message列表进入的编辑页面
		if(isedit != 0) {
			data['_id'] = isedit;
			url = '/message/editmsg'
		}
		// delete & isedit 删除
		if(which == 'delete' && isedit != 0) {
			$.get('/message/delete', {'_id': isedit}, function(data, status) {
				if(data == 'OK' && status == 'success') {
					location.href = '/message'
				}
			})
		} else {
			// 新增
			if(which == 'send') {
				data['draft'] = 0;
			} else {
				data['draft'] = 1;
			}

			var formData = $('.newmsg form').serializeArray();
			formData.forEach(function(obj, idx) {
				if(obj.name == 'receiver') {
					data[obj.name] = receiver;
					return;
				}
				data[obj.name] = obj.value;
			})

			$.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(rst, status) {
					location.href = '/message'
				},
				error: function(rst, status) {
					var rstJson = rst.responseJSON;
					// $('.err').text(rstJson.err).show();
				}
			})
		}
	});

})







