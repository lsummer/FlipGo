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
var Banner = (function (_super) {
    __extends(Banner, _super);
    function Banner(squenceType) {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.intervalDuration = 1000; // duration between intervals, in milliseconds
        _this.timeCount = 15;
        _this.banner_all_name = ["banner_iphoneX_jpg", "banner_ofo_jpg", "banner_kfc_jpg", "banner_pinduoduo_jpg", "banner_nike_jpg", "banner_starbucks_jpg"];
        _this.index = 0;
        _this.boxSquenceType = 0; // 表示游戏类型
        _this.boxSquenceType = squenceType;
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.banner_name = _this.selectBanner();
        // 得到本局中获得横幅广告的index
        var index = [0, 0, 0, 0, 0, 0];
        for (var _i = 0, _a = _this.banner_name; _i < _a.length; _i++) {
            var x = _a[_i];
            index[_this.banner_all_name.indexOf(x)] = 1;
        }
        if (SceneMange.gameSceneSetting[_this.boxSquenceType].banner) {
            // console.log("banner",index);   // 要存储的内容
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat(index);
            console.log("push banner 广告出现", index);
        }
        _this.banner = [];
        _this.circle = [];
        _this.createCicle();
        _this.createBanner();
        _this.createTimer();
        return _this;
    }
    Banner.prototype.pauseTimeout = function () {
        egret.clearTimeout(this.intervalID);
        return (this.timeCount);
    };
    Banner.prototype.selectBanner = function () {
        var select = [];
        var banner = ["banner_iphoneX_jpg", "banner_ofo_jpg", "banner_kfc_jpg", "banner_pinduoduo_jpg", "banner_nike_jpg", "banner_starbucks_jpg"];
        while (banner.length > 3) {
            var rand = Math.floor(Math.random() * banner.length);
            // console.log(banner.splice(rand, 1))
            select = select.concat(banner.splice(rand, 1));
        }
        return (select);
    };
    Banner.prototype.createBanner = function () {
        var i = 0;
        for (var _i = 0, _a = this.banner_name; _i < _a.length; _i++) {
            var x = _a[_i];
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(x);
            bitmap.width = this.stageW;
            bitmap.height = this.stageH / 7;
            bitmap.x = i * this.stageW;
            i++;
            this.banner.push(bitmap);
            this.addChild(bitmap);
        }
        this.circlePoll();
    };
    Banner.prototype.createCicle = function () {
        this.circle = [];
        for (var i = 0; i < this.banner.length; i++) {
            var shp = new egret.Shape();
            if (this.index == i) {
                shp.graphics.beginFill(0xDC143C, 1);
            }
            else {
                shp.graphics.beginFill(0xDCDCDC, 1);
            }
            shp.graphics.drawCircle(0, 0, 10);
            shp.x = this.stageW / 2 + (i - 1) * 30;
            shp.y = this.stageH / 8 - 30;
            shp.graphics.endFill();
            this.circle.push(shp);
        }
    };
    Banner.prototype.createPoll = function () {
        this.removeChildren();
        for (var _i = 0, _a = this.banner; _i < _a.length; _i++) {
            var x = _a[_i];
            x.x = Math.floor(x.x / this.stageW) * this.stageW;
            if (x.x < 0) {
                x.x = (this.banner.length - 1) * this.stageW;
            }
            this.addChild(x);
        }
        // this.addChild(this.banner[this.index]);
        for (var _b = 0, _c = this.banner; _b < _c.length; _b++) {
            var x = _c[_b];
            egret.Tween.get(x).to({
                x: x.x - this.stageW,
                y: x.y
            }, 499);
        }
        ;
        this.circlePoll();
    };
    Banner.prototype.circlePoll = function () {
        this.createCicle();
        for (var _i = 0, _a = this.circle; _i < _a.length; _i++) {
            var x = _a[_i];
            this.addChildAt(x, 20);
        }
        if (this.index < this.banner.length - 1) {
            this.index = this.index + 1;
        }
        else {
            this.index = 0;
        }
    };
    Banner.prototype.createTimer = function () {
        //创建一个计时器对象
        this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    Banner.prototype.myRepeatingFunction = function (obj) {
        if (this.timeCount >= 0) {
            this.timeCount = this.timeCount - 1;
        }
        else {
            this.timeCount = 15;
            this.createPoll();
        }
        this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    return Banner;
}(egret.Sprite));
