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
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(pop_name) {
        var _this = _super.call(this) || this;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.createBackGroundImage();
        _this.createAdvertisement(pop_name);
        return _this;
    }
    Popup.prototype.createAdvertisement = function (pop_name) {
        if (!this.advertisement) {
            this.advertisement = new egret.Bitmap();
        }
        this.advertisement.texture = RES.getRes(pop_name);
        var scaleX = this.stageW / this.advertisement.width;
        this.advertisement.width = this.stageW;
        this.advertisement.height = scaleX * this.advertisement.height;
        this.advertisement.y = this.stageH / 2 - this.advertisement.height / 2;
        this.addChild(this.advertisement);
    };
    Popup.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x808080, 0.6);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    return Popup;
}(egret.Sprite));
