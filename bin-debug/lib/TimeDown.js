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
var TimeDown = (function (_super) {
    __extends(TimeDown, _super);
    function TimeDown(countnumber) {
        var _this = _super.call(this) || this;
        _this.timeCount = 120;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.timeCount = countnumber;
        _this.createTimer();
        return _this;
    }
    TimeDown.prototype.createTimer = function () {
        //创建一个计时器对象
        // this.SetIntervalExample();
        var countdown = new egret.TextField();
        countdown.text = "剩余时间";
        countdown.size = 17;
        countdown.textAlign = egret.HorizontalAlign.CENTER;
        countdown.y = 10;
        countdown.width = this.stageW;
        countdown.textColor = 0x000000;
        this.addChild(countdown);
        var shp = new egret.Shape();
        shp.graphics.lineStyle(4, 0x2E8B57);
        shp.graphics.beginFill(0xDCDCDC, 1);
        shp.graphics.drawCircle(0, 0, 30);
        shp.graphics.endFill();
        shp.x = this.stageW / 2;
        shp.y = countdown.y + 60;
        this.addChild(shp);
        if (!this.countDownTextField) {
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = this.stageW;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x000000;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 30;
        this.countDownTextField.y = shp.y - 15;
        this.addChild(this.countDownTextField);
        // this.SetIntervalExample();
    };
    TimeDown.prototype.updateTimeCount = function (timecount) {
        this.timeCount = timecount;
        this.countDownTextField.text = this.timeCount.toString();
    };
    return TimeDown;
}(egret.Sprite));
