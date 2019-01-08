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
var TransferScreen = (function (_super) {
    __extends(TransferScreen, _super);
    function TransferScreen(pro, discribe, jumpsceen) {
        var _this = _super.call(this) || this;
        _this.QuestionNumber = 4; // 游戏开始前问题数量
        _this.TrainNumber = 4; // 训练游戏的局的数量
        _this.GameNumber = 24; // 正式实验的游戏局数
        _this.intervalDuration = 1000; // duration between intervals, in milliseconds
        _this.timeCount = 5;
        _this.radius = 11; // 圆的半径
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.jumpScreen = jumpsceen;
        // this.createProgress(pro);
        // var progre: Progress = new Progress(pro);
        // this.addChild(progre);
        _this.createMainFrame(discribe);
        _this.createTimer();
        return _this;
    }
    TransferScreen.prototype.createMainFrame = function (discribe) {
        var next = new egret.TextField();
        next.text = "接下来,您将...";
        next.width = this.stageW;
        next.textColor = 0x000000;
        next.size = 20;
        next.textAlign = egret.HorizontalAlign.CENTER;
        next.bold = false;
        next.y = this.stageH / 4;
        var instrustion = discribe;
        var insru = new egret.TextField();
        insru.text = instrustion;
        insru.width = this.stageW;
        insru.textColor = 0x000000;
        insru.size = 30;
        insru.textAlign = egret.HorizontalAlign.CENTER;
        insru.bold = false;
        insru.y = next.y + 60;
        this.addChild(next);
        this.addChild(insru);
        if (discribe == "开始 2 组正式实验") {
            var instrustion = "每组 6 局";
            var insru_ = new egret.TextField();
            insru_.text = instrustion;
            insru_.width = this.stageW;
            insru_.textColor = 0x000000;
            insru_.size = 25;
            insru_.textAlign = egret.HorizontalAlign.CENTER;
            insru_.bold = false;
            insru_.y = insru.y + 60;
            this.addChild(insru_);
        }
    };
    TransferScreen.prototype.createTimer = function () {
        //创建一个计时器对象
        this.SetIntervalExample();
        var countdown = new egret.TextField();
        countdown.text = "开始倒计时";
        countdown.size = 15;
        countdown.textAlign = egret.HorizontalAlign.CENTER;
        countdown.y = this.stageH / 2 - 80;
        countdown.width = this.stageW;
        countdown.textColor = 0x000000;
        this.addChild(countdown);
        var shp = new egret.Shape();
        shp.graphics.lineStyle(4, 0x8B814C);
        shp.graphics.beginFill(0xDCDCDC, 1);
        shp.graphics.drawCircle(this.stageW / 2, this.stageH / 2, 40);
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
        this.countDownTextField.y = this.stageH / 2 - 20;
        this.addChild(this.countDownTextField);
    };
    TransferScreen.prototype.SetIntervalExample = function () {
        this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    TransferScreen.prototype.myRepeatingFunction = function (obj) {
        this.timeCount = this.timeCount - 1;
        if (this.timeCount >= 0) {
            this.countDownTextField.text = this.timeCount.toString();
            this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
        }
        else {
            egret.clearInterval(this.intervalID);
            console.log("清楚了计时");
            this.removeChildren();
            SceneMange.getInstance().changeScene(this.jumpScreen);
        }
    };
    return TransferScreen;
}(egret.Sprite));
