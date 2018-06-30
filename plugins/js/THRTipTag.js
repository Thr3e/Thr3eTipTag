(function(window){
    let THRTipTag = function(options){
        // 定义属性
        this.confBtn   = null;
        this.cancelBtn = null;
        this.textInput = null;
        this.mainWrap  = null;
        this.titleWrap = null;
        this.btnBox    = null;

        //设置默认样式
        this.config = {
            "type": "default",
            "title": "温馨提示",
            "message": "",
            "autoClose": 0,
            "placeholder": "请输入...",
            "cancelTitle": "取消",
            "confTitle": "确定",
            "cancelCallBack": "",
            "confCallBack": "",
            'styleFamily' : 'red',
            'style' : {
                'red'  : { 'background' : '#FBFBFB', 'border' : '#B9E1DC', 'inverse' : '#F38181', 'color' : '#756C83'},
                'blue' : { 'background' : '#DBEDF3', 'border' : '#00818A', 'inverse' : '#404B69', 'color' : '#283149'},
                'green': { 'background' : '#F4F9F4', 'border' : '#C4E3CB', 'inverse' : '#8AAE92', 'color' : '#616161'},
                'gray' : { 'background' : '#F7F7F7', 'border' : '#93DEFF', 'inverse' : '#606470', 'color' : '#323643'}
            }
        }
        // 扩展默认属性
        options && this.extend(this.config, options);
        // 初始化方法
        this.init();
        //设置样式
        this.mainWrap  && this.loadStyle(this.mainWrap,  this.config, 'wrap');
        this.confBtn   && this.loadStyle(this.confBtn,   this.config, 'inverse');
        this.titleWrap && this.loadStyle(this.titleWrap, this.config, 'inverse');
        this.btnBox    && this.loadStyle(this.btnBox,    this.config, 'border');
        this.textInput && this.loadStyle(this.textInput, this.config, 'border');
        // 事件添加
        this.confBtn && this.addEvent(this.confBtn, "click", this.btnClick.bind(this));
        this.cancelBtn && this.addEvent(this.cancelBtn, "click", this.btnClick.bind(this));
        document.body.style.cssText = "overflow: hidden;";
        // 判断是否自动关闭
        this.config.autoClose && setTimeout(this.close, this.config.autoClose);
    };

    THRTipTag.prototype = {
        init : function(){
            let config = this.config,
                tagHtmls = "";
            switch (config.type) {
                case "default": {
                    tagHtmls =
                        "<THR-tiptag>"     +
                        "<tiptag-wrap>"    +
                        "<tiptag-title>"   + config.title   + "</tiptag-title>"   +
                        "<tiptag-content>" + config.message + "</tiptag-content>" +
                        "</tiptag-wrap>"   +
                        "</THR-tiptag>";
                } break;
                case "alert"  : {
                    tagHtmls =
                        "<THR-tiptag>"     +
                        "<tiptag-wrap>"    +
                        "<tiptag-title>"   + config.title   + "</tiptag-title>" +
                        "<tiptag-content>" + config.message + "</tiptag-content>" +
                        "<tiptag-btnbox>"  +
                        "<tiptag-btn id='THR-tiptag-conf-btn'>" + config.confTitle + "</tiptag-btn>" +
                        "</tiptag-btnbox>" +
                        "</tiptag-wrap>"   +
                        "</THR-tiptag>";
                }break;
                case "confirm": {
                    tagHtmls =
                        "<THR-tiptag>"     +
                        "<tiptag-wrap>"    +
                        "<tiptag-title>"   + config.title      + "</tiptag-title>"   +
                        "<tiptag-content>" + config.message    + "</tiptag-content>" +
                        "<tiptag-btnbox>"  +
                        "<tiptag-btn id='THR-tiptag-canc-btn'>" + config.cancelTitle + "</tiptag-btn>" +
                        "<tiptag-btn id='THR-tiptag-conf-btn'>" + config.confTitle   + "</tiptag-btn>" +
                        "</tiptag-btnbox>" +
                        "</tiptag-wrap>"   +
                        "</THR-tiptag>";
                } break;
                case "prompt" : {
                    tagHtmls =
                        "<THR-tiptag>"      +
                        "<tiptag-wrap>"     +
                        "<tiptag-title>"    + config.title     + "</tiptag-title>"   +
                        "<tiptag-content>"  +
                        "<input type='text' id='THR-tiptag-text-ipt' placeholder='" + config.placeholder + "'>" +
                        "</tiptag-content>" +
                        "<tiptag-btnbox>"   +
                        "<tiptag-btn id='THR-tiptag-canc-btn'>" + config.cancelTitle + "</tiptag-btn>"      +
                        "<tiptag-btn id='THR-tiptag-conf-btn'>" + config.confTitle   + "</tiptag-btn>"      +
                        "</tiptag-btnbox>"  +
                        "</tiptag-wrap>"    +
                        "</THR-tiptag>";
                }break;
            }
            document.body.insertAdjacentHTML("beforeEnd", tagHtmls);
            setTimeout(function(){
                document.getElementsByTagName('THR-tiptag')[0].className = 'appear';
            }, 10)
            this.confBtn   = document.getElementById("THR-tiptag-conf-btn");
            this.cancelBtn = document.getElementById("THR-tiptag-canc-btn");
            this.textInput = document.getElementById("THR-tiptag-text-ipt");
            this.mainWrap  = document.getElementsByTagName("tiptag-wrap")[0];
            this.titleWrap = document.getElementsByTagName("tiptag-title")[0];
            this.btnBox    = document.getElementsByTagName("tiptag-btnbox")[0];
        },
        extend : function (oldObj, newObj) {
            for(let key in newObj) {
                oldObj[key] = newObj[key];
            }
            return oldObj;
        },
        addEvent: function(el, type, callBack) {
            if (el.attachEvent) {
                el.attachEvent('on' + type, callBack);
            } else {
                el.addEventListener(type, callBack, false);
            }
        },
        btnClick: function (e) {
            e = e || event;
            let _this   = this,
                _tarId  = e.target.id,
                _config = this.config;
            switch(_tarId) {
                // 点击取消按钮
                case "THR-tiptag-canc-btn":{
                    _config.cancelCallBack && _config.cancelCallBack();
                } break;
                // 点击确认按钮
                case "THR-tiptag-conf-btn": {
                    let text = '';
                    if (_config.type === "prompt"){
                        if (!_this.textInput.value) {
                            _this.textInput.className = 'thr3e-uninput';
                            _this.textInput.onfocus = function(){
                                _this.textInput.classList.remove('thr3e-uninput');
                            };
                            return;
                        }else {
                            text = _this.textInput.value;
                        }
                    } 
                    _config.confCallBack && _config.confCallBack(text);
                }break;
            }
            this.close();
        },
        close: function () {
            let tiptag = document.getElementsByTagName("THR-tiptag")[0];
            tiptag.className = 'close';
            setTimeout(function(){
                document.body.removeChild(tiptag);
                document.body.style.cssText = "overflow: auto;";
            }, 500);
        },
        loadStyle : function(el, obj, type){
            var styleObj = obj ? obj.style[obj.styleFamily] : '';
            if (styleObj){
                switch(type){
                    case "inverse" :{
                        el.style.cssText = 'background:' + styleObj['inverse'] + '; color:' + styleObj['background'];
                    }break;
                    case "wrap" : {
                        el.style.cssText = 'background:' + styleObj['background'] + '; color:' + styleObj['color'];
                    }break;
                    case "border" : {
                        el.style.cssText = 'border-color :' + styleObj['border'];
                    }break;
                }
            }
        }
    };
    window.THRTipTag = THRTipTag;
})(window);