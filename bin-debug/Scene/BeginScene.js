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
var BeginScene = (function (_super) {
    __extends(BeginScene, _super);
    function BeginScene() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.init();
        return _this;
    }
    // 初始化(给开始按钮绑定点击事件)
    BeginScene.prototype.init = function () {
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        this.createButtonImage();
        this.createTitle();
    };
    BeginScene.prototype.createTitle = function () {
        var title = new egret.Bitmap();
        title.texture = RES.getRes("title_png");
        this.addChild(title);
        var image_height = title.height;
        var image_width = title.width;
        title.touchEnabled = true;
        title.width = this.stageW / 2.5;
        title.height = title.width / image_width * image_height;
        title.fillMode = egret.BitmapFillMode.SCALE;
        title.x = this.stageW / 2 - title.width / 2;
        title.y = this.stageH / 3;
    };
    BeginScene.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xD3D3E6);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
        var grade = new egret.TextField();
        grade.text = "10";
        grade.size = 60;
        grade.fontFamily = "num";
        grade.width = 400;
    };
    BeginScene.prototype.createButtonImage = function () {
        if (!this.button) {
            this.button = new egret.Bitmap();
        }
        this.button.texture = RES.getRes("play_png");
        this.addChild(this.button);
        var image_height = this.button.height;
        var image_width = this.button.width;
        this.button.touchEnabled = true;
        this.button.width = this.stageW / 3;
        this.button.height = this.button.width / image_width * image_height;
        this.button.fillMode = egret.BitmapFillMode.SCALE;
        this.button.x = this.stageW / 2 - this.button.width / 2;
        this.button.y = this.stageH / 3 * 2;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    // 移除事件
    BeginScene.prototype.release = function () {
        if (this.button.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.UseLee, this);
        }
    };
    BeginScene.prototype.UseLee = function () {
        console.log("移动触摸事件");
    };
    BeginScene.prototype.tapHandler = function () {
        var startVoice = RES.getRes("start_mp3");
        startVoice.play(0, 1);
        console.log("跳转到gameScene");
        // 切换场景
        SceneMange.getInstance().changeScene('preGameScene');
    };
    return BeginScene;
}(egret.Sprite));
