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
var AwardVideo = (function (_super) {
    __extends(AwardVideo, _super);
    function AwardVideo(name) {
        var _this = _super.call(this) || this;
        _this.intervalDuration = 1000; // duration between intervals, in milliseconds
        _this.timeCount = 15;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.createAdvertisement(name);
        _this.createTimer();
        return _this;
    }
    AwardVideo.prototype.pauser = function () {
        if (this.video) {
            this.video.pause();
            console.log("视频播放暂停");
        }
    };
    AwardVideo.prototype.player = function () {
        if (this.video) {
            this.video.play();
        }
    };
    AwardVideo.prototype.createAdvertisement = function (name) {
        // if(!this.advertisement){
        //     this.advertisement = new egret.Bitmap();
        // }
        // this.advertisement.height = this.stageH;
        // this.advertisement.width = this.stageW;
        // this.advertisement.texture = RES.getRes("aikangti_jpg");
        this.createBackGroundImage();
        this.video = new egret.Video();
        this.video.width = this.stageW; //设置视频宽
        this.video.height = this.stageW * 9 / 16; //设置视频高
        this.video.x = 0; //设置视频坐标x
        this.video.y = (this.stageH - this.video.height) / 2; //设置视频坐标y
        this.video.fullscreen = false; //设置是否全屏（暂不支持移动设备）
        this.video.poster = "resource/assets/loading.jpg"; //设置loding图
        this.video.load("resource/video/" + name);
        this.addChild(this.video); //将视频添加到舞台
        //监听视频加载完成
        this.video.once(egret.Event.COMPLETE, this.onLoad, this);
        //监听视频加载失败
        this.video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
    };
    AwardVideo.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x808080, 0.9);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    AwardVideo.prototype.onLoad = function (e) {
        this.video.play();
    };
    AwardVideo.prototype.onLoadErr = function (e) {
        console.log("video load error happened");
    };
    AwardVideo.prototype.createTimer = function () {
        //创建一个计时器对象
        this.SetIntervalExample();
        if (!this.countDownTextField) {
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = 130;
        this.countDownTextField.height = 60;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x00ff00;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 60;
        this.countDownTextField.y = 30;
        this.countDownTextField.x = 15;
        this.addChild(this.countDownTextField);
    };
    AwardVideo.prototype.SetIntervalExample = function () {
        this.intervalID_pro = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    AwardVideo.prototype.myRepeatingFunction = function (obj) {
        this.timeCount = this.timeCount - 1;
        if (this.timeCount >= 0) {
            this.countDownTextField.text = this.timeCount.toString();
            this.intervalID_pro = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
            // console.log("id是"+this.intervalID_pro.toString());
        }
        else {
            egret.clearTimeout(this.intervalID_pro);
            this.video.pause();
            // this.removeChildren();
            // SceneMange.getInstance().changeScene(this.jumpScreen);
        }
    };
    AwardVideo.prototype.pauseTimeout = function () {
        egret.clearTimeout(this.intervalID_pro);
        return (this.timeCount);
    };
    AwardVideo.prototype.resertTimeout = function () {
        this.timeCount = 15;
        this.SetIntervalExample();
    };
    return AwardVideo;
}(egret.Sprite));
