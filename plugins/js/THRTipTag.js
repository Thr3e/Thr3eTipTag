(function(window){
    var THRTipTag = function(options){
        // 定义属性
        this.confBtn   = null;
        this.cancelBtn = null;
        this.textInput = null;
        this.mainWrap  = null;

        //设置默认样式
        this.config = {
            "type": "default",
            "message": "",
            "autoClose": 0,
            "placeholder": "请输入...",
            "cancelTitle": "取消",
            "confTitle": "确定",
            "cancelCallBack": "",
            "confCallBack": "",
            "imageURL" : "",
            "imageType" : "warning",
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
            var _this    = this,
                config   = this.config,
                tagHtmls = "",
                curPath  = (this.getPath(this.getEl)).slice(0,-15);
            if (!config.imageURL || curPath) {
                config.imageURL = curPath + "imgs/" + config.imageType + ".svg";
            }
            tagHtmls = this.getHtml(config);
            document.body.insertAdjacentHTML("beforeEnd", tagHtmls);
            setTimeout(function(){
                (_this.getEl('tiptag-wrap')).className = 'appear';
                if (!config.message) 
                    (_this.getEl("tiptag-content")).style.display = "none";
                _this.getEl("tiptag-img").style.cssText = "background-image : url(" + config.imageURL + ")";
            }, 10)
            this.confBtn   = this.getEl("#THR-tiptag-conf-btn");
            this.cancelBtn = this.getEl("#THR-tiptag-canc-btn");
            this.textInput = this.getEl("#THR-tiptag-text-ipt");
            this.mainWrap  = this.getEl("tiptag-wrap");
        },
        extend : function (oldObj, newObj) {
            for(var key in newObj) {
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
            var _this   = this,
                _tarId  = e.target.id,
                _config = _this.config;
            switch(_tarId) {
                // 点击取消按钮
                case "THR-tiptag-canc-btn":{
                    _config.cancelCallBack && _config.cancelCallBack();
                } break;
                // 点击确认按钮
                case "THR-tiptag-conf-btn": {
                    var text = '';
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
            _this.close();
        },
        close: function () {
            var tiptag  = document.getElementsByTagName("THR-tiptag")[0],
                tipWrap = document.getElementsByTagName("tiptag-wrap")[0];
            tipWrap.className = 'close';
            tiptag.style.cssText = "background : transparent";
            setTimeout(function(){
                document.body.removeChild(tiptag);
                document.body.style.cssText = "overflow: auto;";
            }, 200);
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
        },
        getPath : function(callBack){
            var oScript = callBack('script', true);
            for (var idx = 0 , len = oScript.length; idx < len; idx++) {
                if (oScript[idx].src.match("THRTiptag.js")) {
                    return oScript[idx].src;
                }
            }
        },
        getHtml : function(config){
            var htmlStr = "";
            htmlStr +=  "<THR-tiptag><tiptag-wrap>" + "<tiptag-img></tiptag-img>"+
                        "<tiptag-content>" + config.message + "</tiptag-content>";
            switch (config.type) {
                case "prompt" : htmlStr += "<tiptag-ipt><input type='text' id='THR-tiptag-text-ipt' placeholder='" + config.placeholder + "'></tiptag-ipt>" ;
                case "confirm" : htmlStr += 
                "<tiptag-btnbox>"  +
                "<tiptag-btn id='THR-tiptag-canc-btn'>" + config.cancelTitle + "</tiptag-btn>" ;
                case "alert" : {
                    if (config.type === "alert")
                        htmlStr += "<tiptag-btnbox>";
                    htmlStr += "<tiptag-btn id='THR-tiptag-conf-btn'>" + config.confTitle + "</tiptag-btn>" + "</tiptag-btnbox>";
                }
            };
            htmlStr += "</tiptag-wrap></THR-tiptag>";

            return htmlStr;
        },
        getEl : function(sel, isAll) {
            if (isAll) return document.querySelectorAll(sel);
            else return document.querySelector(sel);
        }
    };
    window.THRTipTag = THRTipTag;
})(window);