var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var checkNull = RES.checkNull;
var QuesScreen = (function (_super) {
    __extends(QuesScreen, _super);
    function QuesScreen() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.progress = 0;
        _this.hasChoice1 = false;
        _this.hasChoice2 = false;
        _this.init();
        return _this;
    }
    // 初始化(给开始按钮绑定点击事件)
    QuesScreen.prototype.init = function () {
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        if (!this.questionLayer) {
            this.questionLayer = new egret.Sprite();
        }
        this.addChild(this.questionLayer);
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        this.questionLayer.y = this.stageH / 4;
        if (!this.progre) {
            this.progre = new Progress("");
        }
        this.addChild(this.progre);
        this.progress = 1;
        this.updateQuestion();
        this.createButtonImage();
        // let answer1:Array<string> = ["男", "女"];
        // let question1:string = "您的性别：";
        //
        //
        // // this.createQuestionAndAnswers(question1, answer1, 100);
        //
        // let answer2:Array<string> = ["高中及以下", "本科", "研究生", "博士", "其他"];
        // let question2:string = "您的学业水平：";
        // this.createQuestionAndAnswers(question2, answer2, 500);
        //
        // this.createButtonImage()
    };
    QuesScreen.prototype.layTxBg = function (tx) {
        var shp = new egret.Shape;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(tx.x, tx.y, tx.width, tx.height);
        shp.graphics.endFill();
        this.questionLayer.addChild(shp);
    };
    QuesScreen.prototype.createInputName = function (question) {
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        this.questionLayer.y = this.stageH / 3;
        var ques = new egret.TextField();
        ques.text = question;
        ques.width = this.stageW - 20;
        ques.textColor = 0x000000;
        ques.size = 35;
        ques.bold = true;
        ques.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        ques.y = 0;
        this.questionLayer.addChild(ques);
        var content = new egret.Sprite();
        content.width = 100;
        content.height = this.stageH;
        var _loop_1 = function (i) {
            var ageFile = new egret.TextField();
            // console.log(i.toString())
            ageFile.text = i.toString();
            ageFile.width = content.width;
            ageFile.textColor = 0x000000;
            ageFile.size = 25;
            ageFile.y = (i - 18) * 30;
            ageFile.x = 0;
            ageFile.touchEnabled = true;
            ageFile.textAlign = egret.HorizontalAlign.CENTER;
            var that = this_1;
            ageFile.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (that.hasChoice1) {
                    that.currentView1.textColor = 0x000000;
                }
                that.currentView1 = evt.target;
                that.choice1 = evt.target.text;
                that.hasChoice1 = true;
                that.currentView1.textColor = 0x228B22;
                console.log("选择了答案", that.choice1);
            }, content);
            content.addChild(ageFile);
        };
        var this_1 = this;
        for (var i = 18; i < 70; i++) {
            _loop_1(i);
        }
        // var content:egret.Sprite = this.createGird(50,50,9,9);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(content);
        myscrollView.width = 100;
        myscrollView.height = 300;
        myscrollView.x = this.stageW / 2;
        myscrollView.y = ques.y + myscrollView.height / 2 + 10;
        myscrollView.anchorOffsetX = myscrollView.width / 2;
        myscrollView.anchorOffsetY = myscrollView.height / 2;
        this.addChild(myscrollView);
        var background = new egret.Shape();
        background.graphics.lineStyle(1, 0x1102cc);
        background.graphics.drawRect(0, 0, 100, 300);
        background.graphics.endFill();
        background.x = myscrollView.x;
        background.y = myscrollView.y;
        background.anchorOffsetX = background.width / 2;
        background.anchorOffsetY = background.height / 2;
        this.questionLayer.addChild(background);
        this.questionLayer.addChild(myscrollView);
        this.addChild(this.questionLayer);
    };
    QuesScreen.prototype.createInputAge = function (question) {
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        var ques = new egret.TextField();
        ques.text = question;
        ques.width = this.stageW - 20;
        ques.textColor = 0x000000;
        ques.size = 35;
        ques.bold = true;
        ques.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        ques.y = 0;
        this.questionLayer.addChild(ques);
        var content = new egret.Sprite();
        content.width = 100;
        content.height = this.stageH;
        var _loop_2 = function (i) {
            var ageFile = new egret.TextField();
            console.log(i.toString());
            ageFile.text = i.toString();
            ageFile.width = content.width;
            ageFile.textColor = 0x000000;
            ageFile.size = 25;
            ageFile.y = (i - 18) * 30;
            ageFile.x = 0;
            ageFile.touchEnabled = true;
            ageFile.textAlign = egret.HorizontalAlign.CENTER;
            var that = this_2;
            ageFile.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                that.choice1 = evt.target.text;
                if (that.hasChoice1) {
                    that.currentView1.textColor = 0x000000;
                    SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1][SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].length - 1] = parseInt(that.choice1);
                }
                else {
                    SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].push(parseInt(that.choice1));
                }
                that.currentView1 = evt.target;
                that.hasChoice1 = true;
                that.currentView1.textColor = 0x228B22;
                console.log("选择了答案", that.choice1);
            }, content);
            content.addChild(ageFile);
        };
        var this_2 = this;
        for (var i = 18; i < 70; i++) {
            _loop_2(i);
        }
        // var content:egret.Sprite = this.createGird(50,50,9,9);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(content);
        myscrollView.width = 100;
        myscrollView.height = 300;
        myscrollView.x = this.stageW / 2;
        myscrollView.y = ques.y + myscrollView.height / 2 + 10;
        myscrollView.anchorOffsetX = myscrollView.width / 2;
        myscrollView.anchorOffsetY = myscrollView.height / 2;
        this.addChild(myscrollView);
        var background = new egret.Shape();
        background.graphics.lineStyle(1, 0x1102cc);
        background.graphics.drawRect(0, 0, 100, 300);
        background.graphics.endFill();
        background.x = myscrollView.x;
        background.y = myscrollView.y;
        background.anchorOffsetX = background.width / 2;
        background.anchorOffsetY = background.height / 2;
        this.questionLayer.addChild(background);
        this.questionLayer.addChild(myscrollView);
    };
    //创建格子函数，根据输入的宽和高来创建一个 row * line的格子图。并返回Shape对象。
    QuesScreen.prototype.createGird = function (w, h, row, line) {
        var shape = new egret.Shape();
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < line; j++) {
                if ((j + row * i) % 2 === 0) {
                    shape.graphics.beginFill(0xF9C20B);
                    shape.graphics.drawRect(j * w, i * h, w, h);
                    shape.graphics.endFill();
                }
                else {
                    shape.graphics.beginFill(0x2A9FFF);
                    shape.graphics.drawRect(j * w, i * h, w, h);
                    shape.graphics.endFill();
                }
            }
        }
        return shape;
    };
    QuesScreen.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    QuesScreen.prototype.createQuestionAndAnswers = function (quest, answe) {
        var questionna = new Questionnaire();
        questionna.setQuestionAnswers(quest, answe);
        this.questionLayer.addChild(questionna);
    };
    QuesScreen.prototype.createButtonImage = function () {
        var beginB = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 200;
        var textInButton = new egret.TextField();
        textInButton.text = "已完成，下一题";
        textInButton.width = beginB.width;
        textInButton.x = beginB.x;
        textInButton.size = 25;
        textInButton.y = beginB.y + (beginB.height / 2 - textInButton.height / 2) - 5;
        textInButton.textAlign = egret.HorizontalAlign.CENTER;
        textInButton.textColor = 0x000000;
        this.addChild(beginB);
        this.addChild(textInButton);
        beginB.touchEnabled = true;
        beginB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginButtonTap, this);
    };
    QuesScreen.prototype.beginButtonTap = function () {
        // console.log(this.textInputAge.text)
        // this.progress = this.progress + 1;
        // this.updateQuestion();
        if (SceneMange.couldGoOn) {
            this.progress = this.progress + 1;
            this.updateQuestion();
        }
        else {
            console.log("请做出选择");
            var makechoiceAttention = new egret.TextField();
            makechoiceAttention.textAlign = egret.HorizontalAlign.CENTER;
            makechoiceAttention.text = "请先\"选择答案\"，再点击\"下一步\"";
            makechoiceAttention.textColor = 0xff0000;
            makechoiceAttention.width = this.stageW;
            makechoiceAttention.y = this.stageH - 400;
            this.addChild(makechoiceAttention);
            var that = this;
            egret.Tween.get(makechoiceAttention).to({ alpha: 0.4 }, 3000).call(function () {
                that.removeChild(makechoiceAttention);
            });
        }
    };
    QuesScreen.prototype.updateQuestion = function () {
        this.progre.updatePro("基础问题");
        this.questionLayer.removeChildren();
        switch (this.progress) {
            case 1:
                var answer0 = ["A、每天一个小时以上", "B、每天一个小时以内", "C、每周玩几次", "D、偶尔玩", "E、几乎不玩"];
                var question0 = "1、您玩微信小游戏的时长：";
                this.createQuestionAndAnswers(question0, answer0);
                break;
            case 2:
                this.createInputAge("2、您的年龄:");
                break;
            case 3:
                var answer1 = ["A、男", "B、女"];
                var question1 = "3、您的性别：";
                this.createQuestionAndAnswers(question1, answer1);
                break;
            case 4:
                var answer2 = ["A、博士", "B、研究生", "C、本科", "D、高中及以下", "E、其他"];
                var question2 = "4、您的学业水平：";
                this.createQuestionAndAnswers(question2, answer2);
                break;
            default:
                break;
        }
        if (this.progress == 5) {
            this.removeChildren();
            console.log("结果：", SceneMange.uploadMessage);
            this.createBackGroundImage();
            var value = SceneMange.uploadMessage;
            var sendvalue = "";
            var paraName = ["p1", "p2", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10", "g11", "g12", "q1"];
            var index = 0;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var x = value_1[_i];
                var str = "";
                for (var _a = 0, x_1 = x; _a < x_1.length; _a++) {
                    var y = x_1[_a];
                    str = str + y.toString() + " ";
                }
                if (sendvalue == "") {
                    sendvalue = paraName[index] + "=" + str;
                }
                else {
                    sendvalue = sendvalue + "&" + paraName[index] + "=" + str;
                }
                index = index + 1;
            }
            var sendvalue_json = JSON.stringify(sendvalue);
            // console.log("sendjson", sendvalue_json)
            //
            // var urlloader:egret.URLLoader = new egret.URLLoader();
            // urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            // var urlreq:egret.URLRequest = new egret.URLRequest();
            // urlreq.url = "//icontinua.com/ftf/minigame/sendData";
            // urlreq.method = egret.URLRequestMethod.GET;
            // urlreq.data =sendvalue_json;
            // urlloader.load( urlreq );
            //
            // urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            var request = new egret.HttpRequest();
            request.withCredentials = true;
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("//icontinua.com/ftf/minigame/sendData", egret.HttpMethod.POST);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(sendvalue);
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }
    };
    // private onComplete(event:egret.Event):void
    // {
    //     var loader:egret.URLLoader = <egret.URLLoader> event.target;
    //     var data:egret.URLVariables = loader.data;
    //     console.log( data.toString() );
    // }
    QuesScreen.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        SceneMange.getInstance().changeScene("endScene");
    };
    QuesScreen.prototype.onGetIOError = function (event) {
        console.log(event);
        SceneMange.getInstance().changeScene("endScene");
    };
    QuesScreen.prototype.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        SceneMange.getInstance().changeScene("endScene");
    };
    return QuesScreen;
}(egret.Sprite));
