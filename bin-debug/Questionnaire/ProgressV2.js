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
var ProgressV2 = (function (_super) {
    __extends(ProgressV2, _super);
    function ProgressV2(pro) {
        var _this = _super.call(this) || this;
        _this.QuestionNumber = 4; // 游戏开始前问题数量
        _this.TrainNumber = 4; // 训练游戏的局的数量
        _this.GameNumber = 24; // 正式实验的游戏局数
        _this.radius = 11; // 圆的半径
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.pro = pro;
        _this.createProgress();
        return _this;
    }
    ProgressV2.prototype.updatePro = function (pro) {
        this.pro = pro;
        this.removeChildren();
        this.createProgress();
    };
    ProgressV2.prototype.createProgress = function () {
        var progress = new egret.TextField();
        progress.text = "进度条";
        progress.width = this.stageW;
        progress.textColor = 0x000000;
        progress.size = 20;
        progress.textAlign = egret.HorizontalAlign.CENTER;
        progress.bold = false;
        progress.y = 50;
        this.addChild(progress);
        this.createCircle();
    };
    ProgressV2.prototype.createCircle = function () {
        var y = 100;
        var line = new egret.Shape();
        line.graphics.lineStyle(4, 0xCDC673);
        line.graphics.moveTo(0, y);
        line.graphics.lineTo(this.stageW, y);
        line.graphics.endFill();
        this.addChild(line);
        for (var i = 0; i < 2; i++) {
            var shp = new egret.Shape();
            if (this.pro <= this.QuestionNumber) {
                shp.graphics.lineStyle(4, 0x8B814C);
            }
            else {
                shp.graphics.lineStyle(4, 0xBDB76B);
            }
            shp.graphics.beginFill(0xDCDCDC, 1);
            shp.graphics.drawCircle(0, 0, this.radius);
            shp.graphics.endFill();
            shp.x = 50 + i * 50;
            shp.y = y;
            this.addChild(shp);
        }
        for (var i = 0; i < 2; i++) {
            var shp = new egret.Shape();
            if (this.pro > this.QuestionNumber && this.pro <= this.TrainNumber + this.QuestionNumber) {
                shp.graphics.lineStyle(4, 0x8B814C);
            }
            else {
                shp.graphics.lineStyle(4, 0xBDB76B);
            }
            shp.graphics.beginFill(0xDCDCDC, 1);
            shp.graphics.drawCircle(0, 0, this.radius);
            shp.graphics.endFill();
            shp.x = 200 + i * 50;
            shp.y = y;
            this.addChild(shp);
        }
        for (var i = 0; i < 6; i++) {
            var shp = new egret.Shape();
            if (this.pro > this.TrainNumber + this.QuestionNumber) {
                shp.graphics.lineStyle(4, 0x8B814C);
            }
            else {
                shp.graphics.lineStyle(4, 0xBDB76B);
            }
            shp.graphics.beginFill(0xDCDCDC, 1);
            shp.graphics.drawCircle(0, 0, this.radius);
            shp.graphics.endFill();
            shp.x = 350 + i * 50;
            shp.y = y;
            this.addChild(shp);
        }
        this.createCirecleProgress();
    };
    ProgressV2.prototype.createCirecleProgress = function () {
        var y = 100;
        if (this.pro <= this.QuestionNumber) {
            for (var i = 0; i < this.pro; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0x8B814C);
                shp.graphics.drawArc(50 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
        }
        else if (this.pro > this.QuestionNumber && this.pro <= this.TrainNumber + this.QuestionNumber) {
            for (var i = 0; i < this.QuestionNumber; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0xBDB76B);
                shp.graphics.drawArc(50 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
            for (var i = 0; i < this.pro - this.QuestionNumber; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0x8B814C);
                shp.graphics.drawArc(200 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
        }
        else {
            for (var i = 0; i < this.QuestionNumber; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0xBDB76B);
                shp.graphics.drawArc(50 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
            for (var i = 0; i < this.TrainNumber; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0xBDB76B);
                shp.graphics.drawArc(200 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
            for (var i = 0; i < this.pro - this.QuestionNumber - this.TrainNumber; i++) {
                var shp = new egret.Shape();
                shp.graphics.beginFill(0x8B814C);
                shp.graphics.drawArc(350 + Math.floor(i / 2) * 50, y, this.radius, Math.PI / 2, 3 / 2 * Math.PI, i % 2 == 0 ? false : true);
                shp.graphics.endFill();
                this.addChild(shp);
            }
        }
    };
    return ProgressV2;
}(egret.Sprite));
