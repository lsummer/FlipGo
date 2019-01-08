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
var Questionnaire = (function (_super) {
    __extends(Questionnaire, _super);
    function Questionnaire() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.init();
        _this.adverName = ["iphone_x_jpg", "ofo_jpg", "KFC_png", "pinduoduo_jpg", "nike_png", "Starbucks_jpg"];
        return _this;
    }
    Questionnaire.prototype.getChoice = function () {
        if (this.haschoice) {
            return this.choice;
        }
        else {
            return null;
        }
    };
    Questionnaire.prototype.getIfChoice = function () {
        return this.haschoice;
    };
    Questionnaire.prototype.setQuestionAnswers = function (ques, answe, num) {
        if (num === void 0) { num = 10; }
        this.question = ques;
        this.answers = answe;
        this.creatQuestion(num);
    };
    // 初始化(给开始按钮绑定点击事件)
    Questionnaire.prototype.init = function () {
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.haschoice = false;
    };
    Questionnaire.prototype.creatQuestion = function (num) {
        var textview = new egret.TextField();
        textview.text = this.question;
        this.addChild(textview);
        textview.width = this.stageW - 100;
        textview.textColor = 0x000000;
        textview.size = 30;
        textview.bold = true;
        textview.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        textview.y = 0;
        if (num <= 5) {
            var adver = new egret.Bitmap();
            adver.texture = RES.getRes(this.adverName[num]);
            adver.width = 200;
            adver.height = 200;
            adver.x = (this.stageW - adver.width) / 2;
            adver.y = textview.y + textview.height + 20;
            this.addChild(adver);
        }
        var flag = 0;
        for (var _i = 0, _a = this.answers; _i < _a.length; _i++) {
            var ans = _a[_i];
            // var answerLayer: egret.Sprite = new egret.Sprite();
            // answerLayer.width = this.stageW;
            // answerLayer.height = 40;
            // this.addChild(answerLayer);
            var answerView = new egret.TextField();
            answerView.text = ans;
            this.addChild(answerView);
            answerView.width = this.stageW - 220;
            answerView.height = 40;
            answerView.size = 30;
            answerView.x = textview.x + 60;
            answerView.verticalAlign = egret.VerticalAlign.MIDDLE;
            flag++;
            answerView.y = num <= 5 ? adver.y + adver.height - 10 + flag * (answerView.height + 40) : textview.y + textview.height - 10 + flag * (answerView.height + 40);
            answerView.textColor = 0x000000;
            answerView.background = true;
            answerView.backgroundColor = 0xD3D3D3;
            answerView.touchEnabled = true;
            answerView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseAnswer, this);
        }
    };
    Questionnaire.prototype.chooseAnswer = function (evt) {
        this.choice = evt.target.text;
        if (this.haschoice) {
            this.currentView.textColor = 0x000000;
            this.currentView.backgroundColor = 0xD3D3D3;
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1][SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].length - 1] = (this.answers.indexOf(this.choice));
        }
        else {
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].push(this.answers.indexOf(this.choice));
        }
        this.currentView = evt.target;
        this.haschoice = true;
        SceneMange.couldGoOn = true;
        this.currentView.textColor = 0x228B22;
        this.currentView.backgroundColor = 0xBDB76B;
        // console.log("选择了答案", this.answers.indexOf(this.choice))
        console.log("push 选择结果", this.answers.indexOf(this.choice));
    };
    return Questionnaire;
}(egret.Sprite));
