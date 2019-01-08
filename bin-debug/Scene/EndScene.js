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
var EndScene = (function (_super) {
    __extends(EndScene, _super);
    function EndScene() {
        var _this = _super.call(this) || this;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.createBackGroundImage();
        _this.createWelcome();
        return _this;
        // this.beginButton();
    }
    EndScene.prototype.createWelcome = function () {
        var textF = new egret.TextField();
        textF.text = "致谢";
        textF.width = this.stageW - 20;
        textF.textColor = 0x000000;
        textF.bold = true;
        textF.x = 10;
        textF.size = 40;
        textF.textAlign = egret.HorizontalAlign.CENTER;
        textF.y = 40;
        var textLittle = new egret.TextField();
        textLittle.text = "感谢您参与IGA实验";
        textLittle.width = this.stageW - 20;
        textLittle.textColor = 0x000000;
        textLittle.size = 20;
        textLittle.bold = false;
        textLittle.x = 10;
        textLittle.textAlign = egret.HorizontalAlign.CENTER;
        textLittle.y = textF.y + 60;
        var show1 = new egret.TextField();
        show1.text = "请您接受实验人员的采访";
        show1.width = this.stageW;
        show1.textColor = 0x000000;
        show1.size = 40;
        show1.bold = true;
        show1.textAlign = egret.HorizontalAlign.CENTER;
        show1.x = 0;
        show1.y = this.stageH / 2.5;
        this.addChild(textF);
        this.addChild(textLittle);
        this.addChild(show1);
    };
    EndScene.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC); //0xE6E6FA
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    EndScene.prototype.beginButton = function () {
        var beginB = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 200;
        var textInButton = new egret.TextField();
        textInButton.text = "我已阅读，开始";
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
    EndScene.prototype.beginButtonTap = function (evt) {
        console.log("开始5s倒计时");
        this.removeChildren();
        this.createTimeScreen();
    };
    EndScene.prototype.createTimeScreen = function () {
        this.createBackGroundImage();
        var progere = new TransferScreen("预实验", "开始 2 组预实验", "beginScene");
        this.addChild(progere);
    };
    return EndScene;
}(egret.Sprite));
