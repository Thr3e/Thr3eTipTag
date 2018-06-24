function THRTipTag(msg){
    this.msg = msg,
    this.type = '',
    this.status = '',
    this.value = '',
    this.placeholder = '请输入...',
    this.styleFamily = 'red',
    this.style = {
        'red' : { 'background' : '#FBFBFB', 'border' : '#B9E1DC', 'btn' : '#F38181', 'color' : '#756C83'},
        'bule' : { 'background' : '#DBEDF3', 'border' : '#00818A', 'btn' : '#404B69', 'color' : '#283149'},
        'green' : { 'background' : '#F4F9F4', 'border' : '#C4E3CB', 'btn' : '#8AAE92', 'color' : '#616161'},
        'gray' : { 'background' : '#F7F7F7', 'border' : '#93DEFF', 'btn' : '#606470', 'color' : '#323643'}
    }
}

THRTipTag.prototype.showTip = function(){
    this.type = 'tips';
    var _self = this;
    createTag(_self, function(status) { 
        _self.status = status;
    });
}

THRTipTag.prototype.showTipWithConfBtn = function(callback){
    this.type = 'confTips';
    var _self = this;
    createTag(_self, function(status) { 
        _self.status = status;
        callback(_self);
    });
}

THRTipTag.prototype.showTipWithCancleBtn = function(callback){
    this.type = 'cancleTips';
    var _self = this;
    createTag(_self, function(status) { 
        _self.status = status;
        callback(_self);
    });
}

THRTipTag.prototype.showTipWithInput = function(callback){
    this.type = 'inputTips';
    var _self = this;
    createTag(_self, function(status, value) { 
        _self.status = status;
        _self.val = value;
        callback(_self);
    });
}

function getCreateElement(content, parent, idStr, docType){
    var new_doc = document.createElement(docType || 'div');
    parent.appendChild(new_doc);
    new_doc.id = 'thr3e-' + idStr;
    if (docType === 'input') {
        new_doc.setAttribute('type', 'text');
        new_doc.setAttribute('placeholder', content);
    } else {
        new_doc.textContent = content;
    }
    return new_doc;
}

function createTag (obj, callback){
    if (!obj.msg || !obj.type){
        throw('this tag must have message and type!');
        return;
    }

    var backMask = getCreateElement('', document.body, 'mask'),
        tipView  = getCreateElement('', backMask, 'tag-view'),
        Content  = getCreateElement(obj.msg, tipView, 'content', 'p'),
        userInput= getCreateElement(obj.placeholder, tipView, 'input', 'input'),        
        btnWrap  = getCreateElement('', tipView, 'btn-wrap'),
        cancleBtn= getCreateElement('取消', btnWrap, 'cancle-btn'),
        confBtn  = getCreateElement('确认', btnWrap, 'conf-btn');

    setStyle(obj, {'tipView' : tipView, 'confBtn' : confBtn, 'btnWrap' : btnWrap, 'userInput' : userInput});

    confBtn.classList.add('thr3e-hide');
    cancleBtn.classList.add('thr3e-hide');
    userInput.classList.add('thr3e-hide');

    cancleBtn.onclick = function() {
        if (removeMask() === 'seccuse') callback('cancle');
        else callback('error');
    }
    confBtn.onclick = function(){
        var val = '';
        if (!userInput.classList.contains('thr3e-hide')){
            if (userInput.value){
                val = userInput.value;
            } else {
                userInput.classList.add('thr3e-uninput');
                userInput.setAttribute('placeholder', '请输入内容');
                userInput.onfocus = function(){
                    userInput.classList.remove('thr3e-uninput');
                }
                return;
            }
        };

        if (removeMask() === 'seccuse') callback('confirm', val);
        else callback('error', 'NO-MESSAGE');
    }

    if (obj.type === 'tips'){
        tipView.className = 'tip';
        backMask.style.background = "#fff0";
    }else{
        var elArr = [confBtn, obj.type !== 'confTips' ? cancleBtn : '', obj.type === 'inputTips' ? userInput : ''];
        elArr.forEach ((val) => {
            if (val) val.classList.remove('thr3e-hide');
        })
    }
}



function removeMask(){
    var mask = document.body.querySelector('#thr3e-mask');
    if (mask) {
        mask.remove();
        return 'seccuse';
    } 

    throw('ERROR : error_0');
    return 'error'
}


function setStyle(obj, elements) {
    var style = obj.style[obj.styleFamily]
    elements['tipView'].style.cssText = `background : ${style.background}; color : ${style.color}; border-color : ${style.border}`;
    elements['confBtn'].style.cssText = `background : ${style.btn}; color : ${style.background}`;
    elements['userInput'].style.cssText = 'border-color : ' + style.border;
    elements['btnWrap'].style.cssText = 'border-color : ' + style.border;
}