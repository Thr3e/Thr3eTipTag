(function() {
    var btn1 = document.getElementsByClassName('test-btn')[0],
        btn2 = document.getElementsByClassName('test-btn')[1],
        btn3 = document.getElementsByClassName('test-btn')[2],
        btn4 = document.getElementsByClassName('test-btn')[3];

        
    //默认弹出框
    btn1.onclick = function () {
        new THRTipTag({
            type: "default",
            autoClose: 3000,
            message: "我是一段很长的提示信息我是一段很长的提示信息我是一段很长的提示信息我是一段很长的提示信息我是一段很长的提示信息",
            styleFamily: 'red'
        });
    };
    //警告框
    btn2.onclick = function () {
        new THRTipTag({
            type: "alert",
            message: "您确定要退出游戏吗？",
            styleFamily: 'blue'
        });
    };
    //确认框
    btn3.onclick = function () {
        new THRTipTag({
            type: "confirm",
            title: "注册提示",
            styleFamily: 'green',
            message: "您确定要退出登录吗？",
            confCallBack: function () {
                console.log("用户点击了确定按钮！");
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
    //输入框
    btn4.onclick = function () {
        new THRTipTag({
            type: "prompt",
            title: "xxx 提示",
            styleFamily: 'gray',
            placeholder: "请输入您的身份证号！",
            confCallBack: function (text) {
                console.log(text);
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
})();