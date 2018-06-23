function THRTipTag(obj){
    this.msg = obj.msg,
    this.bgc = obj.bgc,
    this.btnColor = obj.btnColor
}

THRTipTag.prototype.showTip = THRTipTag.prototype.showTip || function(){
    this.type = 'tips';
    createTag(this.msg, this.type);
}

THRTipTag.prototype.showTipWithConfBtn = THRTipTag.prototype.showTipWithConfBtn || function(){
    this.type = 'confTips'
    createTag(this.msg, this.type);
}

THRTipTag.prototype.show = function(){
    
}

THRTipTag.prototype.show = function(){
    
}

THRTipTag.prototype.show = function(){
    
}

function getCreateElement(content, parent, idStr, docType){
    var new_doc = document.createElement(docType || 'div');
    new_doc.textContent = content;
    parent.appendChild(new_doc);
    new_doc.id = 'thr3e-' + idStr;
    return new_doc;
}

function createTag (msg, type){
    if (!msg || !type){
        throw('this tag must have message and type!');
        return;
    }

    var backMask = getCreateElement('', document.body, 'mask'),
        tipView  = getCreateElement('', backMask, 'tag-view'),
        Content  = getCreateElement(msg, tipView, 'content', 'p')
        btnWrap  = getCreateElement('', tipView, 'btn-wrap')
        confBtn  = getCreateElement('确认', btnWrap, 'conf-btn'),
        cancleBtn= getCreateElement('取消', btnWrap, 'cancle-btn'),
        userInput= document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.id = 'thr3e-input'
    tipView.appendChild(userInput);
    
    if (type === 'tips'){
        tipView.className = 'tip';
        backMask.style.background = "#fff0";
    }else{
        var elArr = [confBtn, type !== 'confTips' ? cancleBtn : '', type === 'inputTips' ? userInput : ''];
        elArr.forEach ((val) => {
            if (val) val.style.display = 'block';
        })
    }
    

    


}