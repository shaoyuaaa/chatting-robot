$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    //为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        //判断用户是否输入了内容
        if (text.length <= 0) {
            return $('#ipt').val('');//如果全部是空格就删除这一行空格
        }
        //如果用户输入了聊天内容，则将聊天内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
        $('#ipt').val('');//文字渲染到页面后，聊天框重置
        //重置滚动条的位置
        resetui();
        //发起请求，获取聊天内容
        getMsg(text);
        resetui();
    })
    //获取聊天机器人发送回来的消息

    function getMsg(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text//机器人回复消息的内容
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
                    resetui();
                    getVoice(msg);
                }
            }

        })
    }

        function getVoice(text) {
            $.ajax({
                method: 'get',
                url: 'http://www.liulongbin.top:3006/api/synthesize',
                data: {
                    text: text
                },
                success: function (res) {
                    /* console.log(res); */
                    if (res.status === 200) {
                        $('#voice').attr('src', res.voiceUrl)
                    }
                }
            })
        }
        $('#ipt').on('keyup',function(e){
            if(e.keyCode === 13){
                $('#btnSend').click();
            }
        })
    

})

