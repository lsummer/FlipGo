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
var Progress = (function (_super) {
    __extends(Progress, _super);
    function Progress(pro) {
        var _this = _super.call(this) || this;
        _this.QuestionNumber = 4; // 游戏开始前问题数量
        _this.TrainNumber = 4; // 训练游戏的局的数量
        _this.GameNumber = 24; // 正式实验的游戏局数
        _this.radius = 11; // 圆的半径
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.progreeInstru = pro;
        _this.createProgress();
        return _this;
    }
    Progress.prototype.updatePro = function (pro) {
        this.progreeInstru = pro;
        this.removeChildren();
        this.createProgress();
    };
    Progress.prototype.createProgress = function () {
        var progress = new egret.TextField();
        progress.text = "当前进度";
        progress.width = this.stageW;
        progress.textColor = 0x000000;
        progress.size = 20;
        progress.textAlign = egret.HorizontalAlign.CENTER;
        progress.bold = false;
        progress.y = 50;
        this.addChild(progress);
        this.createCircle();
    };
    Progress.prototype.createCircle = function () {
        var progress = new egret.TextField();
        progress.text = this.progreeInstru;
        progress.width = this.stageW;
        progress.textColor = 0x000000;
        progress.size = 25;
        progress.bold = true;
        progress.textAlign = egret.HorizontalAlign.CENTER;
        progress.bold = false;
        progress.y = 90;
        this.addChild(progress);
    };
    return Progress;
}(egret.Sprite));
