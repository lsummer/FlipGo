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
var PlayMethod = (function (_super) {
    __extends(PlayMethod, _super);
    function PlayMethod() {
        var _this = _super.call(this) || this;
        _this.intervalDuration = 1000; // duration between intervals, in milliseconds
        _this.timeCount = 5;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.createBackGroundImage();
        _this.createWelcome();
        _this.createTimer();
        return _this;
    }
    PlayMethod.prototype.createWelcome = function () {
        var textF = new egret.TextField();
        textF.text = "玩法说明";
        textF.width = this.stageW - 20;
        textF.textColor = 0x000000;
        textF.bold = true;
        textF.x = 10;
        textF.size = 40;
        textF.textAlign = egret.HorizontalAlign.CENTER;
        textF.y = 40;
        var textLittle = new egret.TextField();
        textLittle.text = "感谢参与IGA实验,请阅读下面玩法小 tip";
        textLittle.width = this.stageW - 20;
        textLittle.textColor = 0x000000;
        textLittle.size = 20;
        textLittle.bold = false;
        textLittle.x = 10;
        textLittle.textAlign = egret.HorizontalAlign.CENTER;
        textLittle.y = textF.y + 60;
        var tip = new egret.TextField();
        tip.text = "tip";
        tip.textColor = 0x8B814C;
        tip.width = this.stageW / 2;
        tip.size = 30;
        tip.x = this.stageW / 2;
        tip.bold = false;
        tip.y = textLittle.y + 100;
        tip.textAlign = egret.HorizontalAlign.LEFT;
        var shp = new egret.Shape();
        shp.graphics.lineStyle(4, 0x8B814C);
        shp.graphics.beginFill(0x7FFF00, 1);
        shp.graphics.drawCircle(this.stageW / 2 - 15, tip.y + tip.height / 2, 11);
        shp.graphics.endFill();
        this.addChild(shp);
        var show1 = new egret.TextField();
        show1.text = "1、完整游戏中，每局游戏时长90秒；\n";
        show1.width = this.stageW;
        show1.textColor = 0x000000;
        show1.size = 20;
        show1.bold = false;
        show1.x = this.stageW / 10;
        show1.y = tip.y + 60;
        var show15 = new egret.TextField();
        show15.text = "2、游戏中跌落，会从得分中扣除3分，游戏会继续；\n";
        show15.width = this.stageW;
        show15.textColor = 0x000000;
        show15.size = 20;
        show15.bold = false;
        show15.x = this.stageW / 10;
        show15.y = show1.y + 60;
        var show2 = new egret.TextField();
        show2.text = "3、您要在有限的时长内争取每局夺得40分；\n";
        show2.width = this.stageW;
        show2.textColor = 0x000000;
        show2.size = 20;
        show2.bold = false;
        show2.x = this.stageW / 10;
        show2.y = show15.y + 60;
        // var show3: egret.TextField = new egret.TextField();
        // show3.text = "4、游戏中出现的广告因素可能会为您的成绩进行加分；\n";
        // show3.width = this.stageW ;
        // show3.textColor = 0x000000;
        // show3.size = 20;
        // show3.bold = false;
        // show3.x = this.stageW / 10;
        // show3.y = show2.y + 60;
        //
        // var show4: egret.TextField = new egret.TextField();
        // show4.text = "5、祝您在有限的时长内正确获得最高分哟。\n";
        // show4.width = this.stageW;
        // show4.textColor = 0x000000;
        // show4.size = 20;
        // show4.bold = false;
        // show4.x = this.stageW / 10;
        // show4.y = show3.y + 60;
        this.addChild(textF);
        this.addChild(textLittle);
        this.addChild(tip);
        this.addChild(shp);
        this.addChild(show1);
        this.addChild(show15);
        this.addChild(show2);
        // this.addChild(show3);
        // this.addChild(show4);
    };
    PlayMethod.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC); //0xE6E6FA
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    PlayMethod.prototype.beginButton = function () {
        var beginB = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 100;
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
    PlayMethod.prototype.createTimer = function () {
        //创建一个计时器对象
        this.SetIntervalExample();
        var countdown = new egret.TextField();
        countdown.text = "先要认真阅读呀";
        countdown.size = 15;
        countdown.textAlign = egret.HorizontalAlign.CENTER;
        countdown.y = this.stageH / 2 + 40;
        countdown.width = this.stageW;
        countdown.textColor = 0x000000;
        this.addChild(countdown);
        var shp = new egret.Shape();
        shp.graphics.lineStyle(4, 0x8B814C);
        shp.graphics.beginFill(0xDCDCDC, 1);
        shp.graphics.drawCircle(this.stageW / 2, this.stageH / 2 + 100 + countdown.height, 40);
        shp.graphics.endFill();
        this.addChild(shp);
        if (!this.countDownTextField) {
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = this.stageW;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x000000;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 40;
        this.countDownTextField.y = this.stageH / 2 + 80 + countdown.height;
        this.addChild(this.countDownTextField);
    };
    PlayMethod.prototype.SetIntervalExample = function () {
        this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    PlayMethod.prototype.myRepeatingFunction = function (obj) {
        this.timeCount = this.timeCount - 1;
        if (this.timeCount >= 0) {
            this.countDownTextField.text = this.timeCount.toString();
            this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
        }
        else {
            egret.clearInterval(this.intervalID);
            console.log("清楚了计时");
        }
    };
    PlayMethod.prototype.beginButtonTap = function (evt) {
        console.log("开始5s倒计时");
        this.removeChildren();
        this.createTimeScreen();
    };
    PlayMethod.prototype.createTimeScreen = function () {
        this.createBackGroundImage();
        var progere = new TransferScreen("第 1/3 部分 - 预实验", "开始 2 局预实验", "beginScene");
        this.addChild(progere);
    };
    return PlayMethod;
}(egret.Sprite));
