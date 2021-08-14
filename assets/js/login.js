$(function() {
    //点击页面切换box
    $('#reglink').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#loginlink').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    let form = layui.form
    let layer = layui.layer

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }

    })


    //注册
    $('#regFrom').on('submit', function(e) {
        e.preventDefault();
        var parmar = {
            username: $('#regFrom [name=username]').val(),
            password: $('#regFrom [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', parmar, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message)
                return
            }
            layer.msg('注册成功')
            $('#loginlink').click()

        })
    })

    //登录
    $('#loginFrom').on('submit', function(e) {
        //阻止默认的表单提交行为
        e.preventDefault();
        //获取表单中的值
        let parmar = {
            username: $('#loginFrom [name=username]').val(),
            password: $('#loginFrom [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/login', parmar,
            function(res) {
                console.log(res);

                if (res.status !== 0) {
                    layer.msg('登录失败')
                    return
                }

                localStorage.setItem("token", res.token)
                    // location.href = '/index.html'
            }
        )
    })
})