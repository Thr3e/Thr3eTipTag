(function(){
    var tiptagObj = new THRTipTag('这里是提示内容');
    
    var btns = document.querySelectorAll('.test-btn');
    btns.forEach((val, idx) => {
        var curIdx = idx;
        btns[idx].onclick = function(){
            if (curIdx === 0) {
                tiptagObj.showTip();
            } else if (curIdx === 1) {
                tiptagObj.showTipWithConfBtn((obj) => { 
                    tiptagObj = obj;
                    if (tiptagObj.status !== 'error'){
                        var altStr = tiptagObj.status === 'cancle' ? '取消' : '确认';
                        alert('你点击了' + altStr + '键');
                    }
                })
            } else if (curIdx === 2) {
                tiptagObj.showTipWithCancleBtn((obj) => { 
                    tiptagObj = obj;
                    if (tiptagObj.status !== 'error'){
                        var altStr = tiptagObj.status === 'cancle' ? '取消' : '确认';
                        alert('你点击了' + altStr + '键');
                    }
                })
            } else if (curIdx === 3){
                tiptagObj.showTipWithInput((obj) => { 
                    tiptagObj = obj;
                    if (tiptagObj.status !== 'error'){
                        var altStr = tiptagObj.status === 'cancle' ? '取消键' : '确认键,输入的内容为：' + tiptagObj.val;
                        alert('你点击了' + altStr);
                    }
                })
            }
        };
    })

})();