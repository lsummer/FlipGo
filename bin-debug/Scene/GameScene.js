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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.sequence_index = 0; // 指针指示序列执行到了哪里
        //----不会变的值------
        // 随机盒子距离跳台的距离
        _this.minDistance = 240;
        _this.maxDistance = 350;
        // tanθ角度值
        _this.tanAngle = 0.556047197640118;
        // 左侧跳跃点
        _this.leftOrigin = { "x": 180, "y": 700 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 505, "y": 700 };
        // ----- 设定值-------
        _this.intervel = 3; // 盒子间隔数
        _this.intervel_back = 1; // 背景间隔数
        // ----程序中会变化，初始化无所谓的值-----
        // 跳跃距离
        _this.jumpDistance = 0;
        _this.shouldaddscore = 1; // 每一广告盒子需要加的分数
        _this.stageW = 0;
        _this.stageH = 0;
        // 判断是否是按下状态
        _this.isReadyJump = false;
        //游戏中参数
        _this.boxTypeArray = [];
        _this.advertisementTypeArray = [];
        _this.usedBoxTypeArray = [];
        _this.inUsedBox = []; // 屏幕上使用中的盒子
        _this.inUsedBoxArray = []; // 屏幕上使用中的盒子type
        // ----程序中会变，初始化需要还原的值------
        // 游戏得分
        _this.score = 0;
        _this.sucess = 0; // 成功计数
        _this.lastsucess = 0; // 用来判断是否背景加广告的上一次成功计数
        // 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
        _this.direction = 1;
        _this.hasBackgroudAdver = false;
        _this.boxSquenceType = 0;
        _this.intervalDuration = 1000; // duration between intervals, in milliseconds
        _this.timeCount = SceneMange.timecount;
        _this.progress = 0; // 进度
        _this.current_block_ads = false;
        // bg的广告形式和选择
        _this.bg_adver_name = ["bg_iphonex_png", "bg_ofo_png", "bg_kfc_png", "bg_pinduoduo_png", "bg_nike_png", "bg_starbucks_png"];
        // popup的广告形式和选择
        _this.pop_adver_name = ["pop_iphoneX_jpg", "pop_ofo_jpg", "pop_kfc_jpg", "pop_pinduoduo_jpg", "pop_nike_jpg", "pop_starbucks_jpg"];
        // video的广告形式和选择
        _this.video_adver_name = ["iphoneX.mp4", "ofo.mp4", "kfc1.mp4", "pinduoduo.mp4", "nike.mp4", "starbucks.mp4"];
        _this.pop_index_track = 0; // 因为bg和pop广告都是一段时间出现一个，要按照顺序出现，所以加一个track
        _this.pushVoice = RES.getRes("scale_intro_mp3");
        _this.pushLoopVoice = RES.getRes("scale_loop_mp3");
        _this.fallVoice = RES.getRes("fall_mp3");
        _this.sucessVoice = RES.getRes("success_mp3");
        _this.sucess2Voice = RES.getRes("combo2_mp3");
        _this.perfectVoice = RES.getRes("perfect_mp3");
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.sequenceList = SequenceRandom.randomSequence(); // 生成本次游戏的游戏类型序列
        console.log("本大局的序列是", _this.sequenceList);
        _this.sequence_index = 0; //[[0,1,2,3,4],[5,6,7,8,9]]
        // 心跳计时器
        egret.Ticker.getInstance().register(function (dt) {
            dt /= 1000;
            if (this.isReadyJump) {
                this.jumpDistance += 300 * dt;
            }
        }, _this);
        // this.init();
        _this.createKaijuShuoMingAddtishi();
        return _this;
    }
    // 初始化(给开始按钮绑定点击事件)
    GameScene.prototype.init = function () {
        SceneMange.uploadMessage.push([]);
        SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].push(this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]);
        console.log("push 游戏类型", this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]);
        if (this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6] == 0) {
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat([0, 0, 0, 0, 0, 0]);
            console.log("push 000000");
        }
        this.boxPool = new BlockPool(this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]); // push到存储
        this.boxSquenceType = this.boxPool.getSquenceType();
        this.selectBgPopAdver(); // 选择背景图片的三种,push到存储
        this.createGameScript();
        this.createBoxArray();
        this.createBackGroundImage();
        this.createPlayer();
        this.createScore();
        SceneMange.couldGoOn = true;
        this.jumpDistance = 0;
        this.addBlock();
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].banner) {
            this.addBanner(); // push到存储
        }
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].award) {
            this.addjili();
        }
        // if(SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index/6)][this.sequence_index%6]].backgroud) {
        //     this.addBackgroundAder();
        // }
    };
    GameScene.prototype.selectBgPopAdver = function () {
        this.bg_select = [];
        this.bg_index = [0, 0, 0, 0, 0, 0];
        var adv = ["bg_iphonex_png", "bg_ofo_png", "bg_kfc_png", "bg_pinduoduo_png", "bg_nike_png", "bg_starbucks_png"];
        ;
        while (adv.length > 3) {
            var rand = Math.floor(Math.random() * adv.length);
            // console.log(banner.splice(rand, 1))
            this.bg_select = this.bg_select.concat(adv.splice(rand, 1));
        }
        for (var _i = 0, _a = this.bg_select; _i < _a.length; _i++) {
            var x = _a[_i];
            this.bg_index[this.bg_adver_name.indexOf(x)] = 1;
        }
        adv = ["pop_iphoneX_jpg", "pop_ofo_jpg", "pop_kfc_jpg", "pop_pinduoduo_jpg", "pop_nike_jpg", "pop_starbucks_jpg"];
        this.pop_select = [];
        this.pop_index = [0, 0, 0, 0, 0, 0];
        while (adv.length > 3) {
            var rand = Math.floor(Math.random() * adv.length);
            // console.log(banner.splice(rand, 1))
            this.pop_select = this.pop_select.concat(adv.splice(rand, 1));
        }
        for (var _b = 0, _c = this.pop_select; _b < _c.length; _b++) {
            var x = _c[_b];
            this.pop_index[this.pop_adver_name.indexOf(x)] = 1;
        }
        adv = ["iphoneX.mp4", "ofo.mp4", "kfc1.mp4", "pinduoduo.mp4", "nike.mp4", "starbucks.mp4"];
        this.video_select = [];
        this.video_index = [0, 0, 0, 0, 0, 0];
        while (adv.length > 3) {
            var rand = Math.floor(Math.random() * adv.length);
            // console.log(banner.splice(rand, 1))
            this.video_select = this.video_select.concat(adv.splice(rand, 1));
        }
        for (var _d = 0, _e = this.video_select; _d < _e.length; _d++) {
            var x = _e[_d];
            this.video_index[this.video_adver_name.indexOf(x)] = 1;
        }
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].backgroud) {
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat(this.bg_index);
            console.log("push bg 广告出现", this.bg_index);
        }
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].popUp) {
            // console.log("pop",this.pop_index);   // 要存储的内容
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat(this.pop_index);
            console.log("push pop 广告出现", this.pop_index);
        }
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].award) {
            // console.log("pop",this.pop_index);   // 要存储的内容
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat(this.video_index);
            console.log("push adver 广告出现", this.video_index);
        }
        this.pop_index_track = 0;
    };
    GameScene.prototype.judgeBackAdver = function () {
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].backgroud) {
            if ((this.sucess - this.lastsucess) == 1 && this.sucess > 0) {
                return true;
            }
        }
        return false;
    };
    GameScene.prototype.selectNextType = function () {
        var tousetype;
        if (SceneMange.gameSceneSetting[this.boxSquenceType].specialBox) {
            if ((this.sucess + 1) % this.intervel == 0) {
                // if(Math.random() > 0.7){   // 放置特殊盒子的规则
                this.shouldaddscore = SceneMange.gameSceneSetting[this.boxSquenceType].rewardFlag ? 3 : 1; // 是否有奖励
                if (this.advertisementTypeArray.length > 0) {
                    tousetype = this.advertisementTypeArray.shift();
                    this.usedBoxTypeArray.push(tousetype);
                }
                else {
                    var flag = [];
                    flag = this.usedBoxTypeArray;
                    this.usedBoxTypeArray = [];
                    for (var _i = 0, flag_1 = flag; _i < flag_1.length; _i++) {
                        var x = flag_1[_i];
                        if (this.boxPool.isAdvertisement(x)) {
                            this.advertisementTypeArray.push(x);
                        }
                        else {
                            this.usedBoxTypeArray.push(x);
                        }
                    }
                    tousetype = this.advertisementTypeArray.shift();
                    this.usedBoxTypeArray.push(tousetype);
                }
            }
            else {
                this.shouldaddscore = 1;
                if (this.boxTypeArray.length > 0) {
                    tousetype = this.boxTypeArray.shift();
                    this.usedBoxTypeArray.push(tousetype);
                }
                else {
                    var flag = [];
                    flag = this.usedBoxTypeArray;
                    this.usedBoxTypeArray = [];
                    for (var _a = 0, flag_2 = flag; _a < flag_2.length; _a++) {
                        var x = flag_2[_a];
                        if (!this.boxPool.isAdvertisement(x)) {
                            this.boxTypeArray.push(x);
                        }
                        else {
                            this.usedBoxTypeArray.push(x);
                        }
                    }
                    tousetype = this.boxTypeArray.shift();
                    this.usedBoxTypeArray.push(tousetype);
                }
            }
        }
        else {
            this.shouldaddscore = 1;
            if (this.boxTypeArray.length > 0) {
                tousetype = this.boxTypeArray.shift();
                this.usedBoxTypeArray.push(tousetype);
            }
            else {
                var flag = [];
                flag = this.usedBoxTypeArray;
                this.usedBoxTypeArray = [];
                for (var _b = 0, flag_3 = flag; _b < flag_3.length; _b++) {
                    var x = flag_3[_b];
                    if (!this.boxPool.isAdvertisement(x)) {
                        this.boxTypeArray.push(x);
                    }
                    else {
                        this.usedBoxTypeArray.push(x);
                    }
                }
                tousetype = this.boxTypeArray.shift();
                this.usedBoxTypeArray.push(tousetype);
            }
        }
        while (this.usedBoxTypeArray.length >= 4) {
            var value = this.usedBoxTypeArray.shift();
            if (this.boxPool.isAdvertisement(value)) {
                this.advertisementTypeArray.push(value);
            }
            else {
                this.boxTypeArray.push(value);
            }
        }
        return tousetype;
    };
    GameScene.prototype.addBackgroundAder = function () {
        this.hasBackgroudAdver = true;
        var groud = new egret.Bitmap();
        groud.texture = RES.getRes(this.bg_select[(this.pop_index_track++) % 3]);
        if (this.direction == 1) {
            groud.rotation = 0;
            groud.x = this.stageW;
            groud.y = this.currentBlock.y - this.currentBlock.height - groud.height * 4;
        }
        else {
            groud.rotation = 60;
            groud.x = 0 - groud.width;
            groud.y = this.currentBlock.y - this.currentBlock.height - groud.height * 4;
        }
        console.log("添加了一个背景广告", groud.x);
        // groud.x = this.currentBlock.x - 20;
        // groud.y =
        groud.scaleX = 2;
        groud.scaleY = 2;
        this.GameSprite.addChild(groud);
        this.backgroundAdver = groud;
    };
    GameScene.prototype.addadsflag = function () {
        if (!this.ads) {
            this.ads = new egret.Bitmap();
            this.ads.texture = RES.getRes("ads_type_png");
            this.ads.scaleX = 0.5;
            this.ads.scaleY = 0.5;
        }
        this.ads.x = this.currentBlock.x - 10;
        this.ads.y = this.currentBlock.y + 50;
        this.GameSprite.addChild(this.ads);
        if (this.GameSprite.getChildIndex(this.ads) < this.GameSprite.getChildIndex(this.currentBlock)) {
            this.GameSprite.swapChildren(this.ads, this.currentBlock);
        }
        this.current_block_ads = true;
    };
    GameScene.prototype.addPopupAdsFlagToBlock = function () {
        // 首先判断是否需要加block ads
        if (SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]].popUp) {
            if (this.timeCount <= 80 && this.pop_index_track <= 0) {
                this.addadsflag();
                this.pop_index_track++;
                console.log("创建---1");
            }
            else if (this.timeCount <= 45 && this.pop_index_track <= 1) {
                this.addadsflag();
                this.pop_index_track++;
                console.log("创建---2");
            }
            else if (this.timeCount <= 20 && this.pop_index_track <= 2) {
                this.addadsflag();
                this.pop_index_track++;
                console.log("创建---3");
            }
        }
    };
    GameScene.prototype.addBlock = function () {
        var _this = this;
        var toUseType = this.selectNextType();
        var blockNode = this.boxPool.getSingleBoxByType(toUseType).image;
        // 设置位置
        var distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
        if (this.direction > 0) {
            blockNode.x = this.currentBlock.x + distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        else {
            blockNode.x = this.currentBlock.x - distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        if (this.GameSprite.getChildIndex(blockNode) < 0) {
            this.inUsedBox.push(blockNode);
            this.inUsedBoxArray.push(toUseType);
            this.GameSprite.addChild(blockNode);
            this.oldBlock = this.currentBlock;
            this.currentBlock = blockNode;
            this.addPopupAdsFlagToBlock();
        }
        else {
            this.GameSprite.addChild(blockNode);
            this.inUsedBox.push(blockNode);
            console.log("走到这？？？？？");
            this.inUsedBoxArray.push(toUseType);
            egret.Tween.get(blockNode).to({
                x: blockNode.x,
                y: blockNode.y,
            }, 500).call(function () {
                _this.oldBlock = _this.currentBlock;
                _this.currentBlock = blockNode;
                _this.addPopupAdsFlagToBlock();
            });
        }
        // 在这里添加背景图案
        if (this.judgeBackAdver()) {
            this.addBackgroundAder();
        }
        if (this.GameSprite.getChildIndex(blockNode) > this.GameSprite.getChildIndex(this.player)) {
            this.GameSprite.swapChildren(blockNode, this.player);
        }
    };
    GameScene.prototype.createGameScript = function () {
        if (!this.GameSprite) {
            this.GameSprite = new egret.Sprite();
            this.GameSprite.width = this.stageW;
            this.GameSprite.height = this.stageH;
        }
        this.GameSprite.removeChildren();
        this.addChild(this.GameSprite);
        this.GameSprite.touchEnabled = true;
        if (!this.GameSprite.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this.GameSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKeyDown, this);
        }
        if (!this.GameSprite.hasEventListener(egret.TouchEvent.TOUCH_END)) {
            this.GameSprite.addEventListener(egret.TouchEvent.TOUCH_END, this.onKeyUp, this);
        }
    };
    // 按下的事件逻辑
    GameScene.prototype.onKeyDown = function () {
        console.log("按下", this.GameSprite.touchEnabled, this.jumpDistance);
        this.jumpDistance = 0;
        if (!this.circle) {
            this.circle = new egret.Shape();
        }
        this.circle.graphics.beginFill(0xffffff, 0.5);
        this.circle.graphics.drawCircle(0, 0, 10);
        this.circle.graphics.endFill();
        this.circle.x = this.currentBlock.x;
        this.circle.y = this.currentBlock.y;
        this.GameSprite.addChild(this.circle);
        // 播放按下的音频
        if (this.pushSoundChannel) {
            this.pushSoundChannel.stop();
            this.pushSoundChannel = null;
        }
        this.pushSoundChannel = this.pushVoice.play(0, 1);
        this.pushSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        // 变形
        egret.Tween.get(this.player).to({
            scaleY: 0.5,
            scaleX: 1.5
        }, 3000);
        this.isReadyJump = true;
    };
    GameScene.prototype.onSoundComplete = function () {
        this.pushSoundChannel = this.pushLoopVoice.play(0, -1);
        if (this.pushSoundChannel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            this.pushSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, function () {
                console.log("去掉listener");
            }, this);
        }
    };
    // 放开
    GameScene.prototype.onKeyUp = function () {
        var _this = this;
        this.pushSoundChannel.stop();
        console.log("跳跃距离：", this.jumpDistance);
        if (this.GameSprite.getChildIndex(this.circle) >= 0) {
            this.GameSprite.removeChild(this.circle);
        }
        // 判断是否是在按下状态
        if (!this.isReadyJump) {
            return;
        }
        // 声明落点坐标
        if (!this.targetPos) {
            this.targetPos = new egret.Point();
        }
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.GameSprite.touchEnabled = false;
        // 停止播放按压音频,并且播放弹跳音频
        // this.pushSoundChannel.stop()
        // this.jumpVoice.play(0, 1);
        // 清楚所有动画
        egret.Tween.removeTweens(this.player);
        // egret.Tween.removeAllTweens();
        // 结束跳跃状态
        this.isReadyJump = false;
        // 落点坐标
        this.targetPos.x = this.player.x + this.jumpDistance * this.direction;
        // 根据落点重新计算斜率,确保小人往目标中心跳跃
        this.targetPos.y = this.player.y + this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x) * this.direction;
        // 执行跳跃动画
        egret.Tween.get(this).to({ factor: 1 }, 400, egret.Ease.sineIn).call(function () {
            _this.player.scaleY = 1;
            _this.player.scaleX = 1;
            _this.jumpDistance = 0;
            _this.player.rotation = 0;
            // 判断跳跃是否成功
            _this.judgeResult();
        });
    };
    Object.defineProperty(GameScene.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            var iDirection = this.direction > 0 ? 1 : -1;
            var x = this.jumpDistance * this.direction;
            var y = this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x) * this.direction;
            this.player.rotation = Math.sin(Math.PI / 2 * value) * 360 * iDirection;
            this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * ((this.player.x * 3 / 4 + this.targetPos.x / 4)) + value * value * this.targetPos.x;
            this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 2 * this.player.height) + value * value * this.targetPos.y;
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype.createAddScoreMoment = function (score, left, right) {
        var _this = this;
        if (!this.scoreAdd) {
            this.scoreAdd = new egret.TextField();
        }
        this.scoreAdd.text = score;
        this.scoreAdd.size = 30;
        this.scoreAdd.fontFamily = "SimHei";
        this.scoreAdd.width = 100;
        this.scoreAdd.x = this.player.x - this.player.width / 2;
        this.scoreAdd.textColor = 0x000000;
        this.scoreAdd.bold = true;
        this.scoreAdd.alpha = 1;
        this.scoreAdd.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreAdd.y = this.player.y - this.player.height / 2;
        this.GameSprite.addChild(this.scoreAdd);
        var x = this.player.x - this.player.width / 2 - 20;
        var y = this.player.y - this.player.height / 2;
        egret.Tween.get(this.scoreAdd).to({ x: x - left, y: y - this.player.height + 40 - right, alpha: 0.2 }, 1000, egret.Ease.sineIn).call(function () {
            if (_this.GameSprite.getChildIndex(_this.scoreAdd)) {
                _this.GameSprite.removeChild(_this.scoreAdd);
            }
        });
    };
    GameScene.prototype.createReduceScoreMoment = function (score) {
        var _this = this;
        if (!this.scoreAdd) {
            this.scoreAdd = new egret.TextField();
        }
        this.scoreAdd.text = score;
        this.scoreAdd.size = 30;
        this.scoreAdd.fontFamily = "SimHei";
        this.scoreAdd.width = 100;
        this.scoreAdd.x = this.player.x - this.player.width / 2;
        this.scoreAdd.textColor = 0xB22222;
        this.scoreAdd.bold = true;
        this.scoreAdd.alpha = 1;
        this.scoreAdd.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreAdd.y = this.player.y - this.player.height / 2;
        this.GameSprite.addChild(this.scoreAdd);
        var x = this.player.x - this.player.width / 2 - 20;
        var y = this.player.y - this.player.height / 2;
        egret.Tween.get(this.scoreAdd).to({ y: y - this.player.height + 40, alpha: 0.2 }, 1000, egret.Ease.sineIn).call(function () {
            if (_this.GameSprite.getChildIndex(_this.scoreAdd)) {
                _this.GameSprite.removeChild(_this.scoreAdd);
            }
        });
    };
    GameScene.prototype.judgeResult = function () {
        var _this = this;
        // 根据this.jumpDistance来判断跳跃是否成功
        var judgement = this.FallorSuccess();
        if (judgement == 1) {
            // 更新积分
            if (this.shouldaddscore == 1) {
                this.sucessVoice.play(0, 1);
            }
            else {
                this.sucess2Voice.play(0, 1);
            }
            this.score = this.score + this.shouldaddscore;
            this.sucess++;
            this.scoreScene.text = this.score.toString();
            // 随机下一个方块出现的位置
            // this.direction = Math.random() > 0.5 ? 1 : -1;
            console.log(this.sucess, this.lastsucess);
            if (this.hasBackgroudAdver) {
                if ((this.sucess - this.lastsucess) == 1) {
                    this.direction = Math.random() > 0.5 ? 1 : -1;
                }
                else {
                    console.log("不换方向");
                }
            }
            else {
                this.direction = Math.random() > 0.5 ? 1 : -1;
            }
            // 当前方块要移动到相应跳跃点的距离
            var blockX, blockY;
            blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
            blockY = this.direction > 0 ? this.leftOrigin.y : this.rightOrigin.y;
            // 小人要移动到的点.
            var playerX, PlayerY;
            playerX = this.player.x - (this.currentBlock.x - blockX);
            PlayerY = this.player.y - (this.currentBlock.y - blockY);
            if (this.GameSprite.getChildIndex(this.ads) >= 0) {
                this.GameSprite.removeChild(this.ads);
            }
            // 更新页面
            this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
            this.createAddScoreMoment("+" + this.shouldaddscore.toString(), (this.currentBlock.x - blockX), (this.currentBlock.y - blockY));
            // 更新小人的位置
            egret.Tween.get(this.player).to({
                x: playerX,
                y: PlayerY
            }, 1000, egret.Ease.sineIn).call(function () {
                // 开始创建下一个方块
                // 让屏幕重新可点;
                if (_this.awardAdver_sprit && _this.getChildIndex(_this.awardAdver_sprit) >= 0) {
                }
                else {
                    _this.GameSprite.touchEnabled = true;
                }
                _this.addPopUp();
                _this.addBlock();
            });
        }
        else if (judgement == 2) {
            //
            this.sucessVoice.play(0, 1);
            if (this.awardAdver_sprit && this.getChildIndex(this.awardAdver_sprit) >= 0) {
            }
            else {
                this.GameSprite.touchEnabled = true;
            }
            // this.addPopUp();
        }
        else {
            this.fallVoice.play(0, 1);
            console.log("play fall in 579");
            if (this.player.y < this.currentBlock.y) {
                this.GameSprite.swapChildren(this.player, this.currentBlock);
            }
            var y = this.player.y + 50;
            var x = this.player.x;
            egret.Tween.get(this.player).to({
                x: x,
                y: y
            }, 200);
            this.createReduceScoreMoment("-3");
            this.score = this.score - 3;
            this.scoreScene.text = this.score.toString();
            egret.Tween.get(this.player).to({}, 500).to({
                scaleY: 0.9,
                scaleX: 1.1
            }, 500).call(function () {
                // 执行跳跃动画
                _this.targetPos.x = _this.currentBlock.x;
                _this.targetPos.y = _this.currentBlock.y;
                egret.Tween.get(_this).to({ factor: 1 }, 500, egret.Ease.sineIn).call(function () {
                    _this.player.scaleY = 1;
                    _this.player.scaleX = 1;
                    _this.jumpDistance = 0;
                    _this.player.rotation = 0;
                    _this.sucess++;
                    if (_this.GameSprite.getChildIndex(_this.player) < _this.GameSprite.getChildIndex(_this.currentBlock)) {
                        _this.GameSprite.swapChildren(_this.player, _this.currentBlock);
                    }
                    _this.sucessVoice.play(0, 1);
                    // 随机下一个方块出现的位置
                    // this.direction = Math.random() > 0.5 ? 1 : -1;
                    if (_this.hasBackgroudAdver) {
                        if ((_this.sucess - _this.lastsucess) == 1) {
                            _this.direction = Math.random() > 0.5 ? 1 : -1;
                        }
                        else {
                            console.log("不换方向");
                        }
                    }
                    else {
                        _this.direction = Math.random() > 0.5 ? 1 : -1;
                    }
                    // 当前方块要移动到相应跳跃点的距离
                    var blockX, blockY;
                    blockX = _this.direction > 0 ? _this.leftOrigin.x : _this.rightOrigin.x;
                    blockY = _this.direction > 0 ? _this.leftOrigin.y : _this.rightOrigin.y;
                    // 小人要移动到的点.
                    var playerX, PlayerY;
                    playerX = _this.player.x - (_this.currentBlock.x - blockX);
                    PlayerY = _this.player.y - (_this.currentBlock.y - blockY);
                    if (_this.GameSprite.getChildIndex(_this.ads) >= 0) {
                        _this.GameSprite.removeChild(_this.ads);
                    }
                    // 更新页面
                    _this.update(_this.currentBlock.x - blockX, _this.currentBlock.y - blockY);
                    // 更新小人的位置
                    egret.Tween.get(_this.player).to({
                        x: playerX,
                        y: PlayerY
                    }, 1000, egret.Ease.sineIn).call(function () {
                        // 开始创建下一个方块
                        // 让屏幕重新可点;
                        if (_this.awardAdver_sprit && _this.getChildIndex(_this.awardAdver_sprit) >= 0) {
                        }
                        else {
                            _this.GameSprite.touchEnabled = true;
                        }
                        _this.addPopUp();
                        _this.addBlock();
                    });
                });
            });
            // show dead flag and time reduces
            // let deadFlag:egret.TextField = new egret.TextField();
            // deadFlag.width = this.stageW;
            // deadFlag.textAlign = egret.HorizontalAlign.CENTER;
            // deadFlag.height = 50;
            // deadFlag.y = this.timeDownLayer.y + this.timeDownLayer.height + 20;
            // deadFlag.size = 30;
            // deadFlag.textFlow = <Array<egret.ITextElement>>[
            //     {text: "跌落!", style: {"textColor": 0xB22222}}
            //     , {text: "  剩余时间 -5", style: {"textColor": 0x000000}}
            // ];
            // deadFlag.alpha = 0;
            // this.GameSprite.addChild(deadFlag);
            // egret.Tween.get(deadFlag).to({
            //     alpha: 1
            // }, 800).to({
            //     alpha: 0
            // }, 1200).call(()=>{
            //         this.GameSprite.removeChild(deadFlag);
            //         // this.timeCount = this.timeCount - 5 > 0 ? this.timeCount - 5 : 0;
            //
            //         egret.Tween.get(this.player).to({
            //             scaleY: 0.8,
            //             scaleX: 1.2
            //         }, 300).call(()=>{
            //             // 执行跳跃动画
            //             this.targetPos.x = this.currentBlock.x;
            //             this.targetPos.y = this.currentBlock.y;
            //             egret.Tween.get(this).to({ factor: 1 }, 400, egret.Ease.sineIn).call(() => {
            //                 this.player.scaleY = 1;
            //                 this.player.scaleX = 1;
            //                 this.jumpDistance = 0;
            //                 this.player.rotation = 0;
            //             });
            //         })
            //     }
            // )
            // 复活操作
            console.log("我要复活");
        }
    };
    // 判断添加popup的函数
    GameScene.prototype.addPopUp = function () {
        // if(SceneMange.gameSceneSetting[this.sequenceList[Math.floor(this.sequence_index/5)][this.sequence_index%5]].popUp){
        //     if(this.timeCount <= 70 && this.timeCount > 45 && this.pop_index_track == 0){
        //         this.addPopUpAdvertisement();
        //     }else if(this.timeCount <= 45 && this.timeCount > 20 && this.pop_index_track == 1){
        //         this.addPopUpAdvertisement();
        //     }else if(this.timeCount <= 20 && this.pop_index_track == 2) {
        //         this.addPopUpAdvertisement();
        //     }
        // }
        if (this.current_block_ads) {
            this.addPopUpAdvertisement();
            this.current_block_ads = false;
        }
    };
    GameScene.prototype.createEndScript = function () {
        if (!this.EndSprite) {
            this.EndSprite = new egret.Sprite();
            this.EndSprite.width = this.stageW;
            this.EndSprite.height = this.stageH;
        }
        if (this.getChildIndex(this.EndSprite) < 0) {
            this.addChild(this.EndSprite);
        }
        this.EndSprite.removeChildren();
        this.createEndSceneBackGroundImage();
        this.createEndSceneScore();
        // this.createQuestionaire();
        // this.createEndSceneButtonImage();
        // 如何修改---------------------------------------------
        // 修改前
        // if(this.sequence_index % 5 == 0){
        //     this.createNextButtonImage();
        // }else{
        //     this.createEndSceneButtonImage();
        // }
        // 修改后
        this.createNextButtonImage();
    };
    GameScene.prototype.FallorSuccess = function () {
        if (this.IfinSqure(this.currentBlock)) {
            return 1;
        }
        else {
            if (this.IfinSqure(this.oldBlock)) {
                return 2;
            }
            return 0;
        }
    };
    GameScene.prototype.IfinSqure = function (block) {
        var sizeX = 140 * 2;
        var sizeY = 140 * 1.1;
        var k = sizeY / sizeX;
        // 菱形外的点(this.player.x, this.player.y)
        // 菱形中心坐标(this.currentBlock.x, this.currentBlock.y)
        var x2 = this.player.x - block.x;
        var y2 = this.player.y - block.y;
        if (y2 - k * x2 > -1 * sizeY / 2 && y2 - k * x2 < sizeY / 2 && y2 + k * x2 > -1 * sizeY / 2 && y2 + k * x2 < sizeY / 2) {
            return true;
        }
        else {
            return false;
        }
    };
    GameScene.prototype.update = function (x, y) {
        // egret.Tween.removeTweens();
        var _this = this;
        var cache1 = [];
        var cache2 = [];
        for (var i = 0; i <= this.inUsedBox.length - 1; i++) {
            var blockNode = this.inUsedBox[i];
            if (blockNode.x + (blockNode.width - 222) < 0 || blockNode.x - 222 > this.stageW || blockNode.y - 78 > this.stageH) {
                // 方块超出屏幕,从显示列表中移除
                if (this.GameSprite.getChildIndex(blockNode) >= 0) {
                    this.GameSprite.removeChild(blockNode);
                }
            }
            else {
                cache2.push(blockNode);
                cache1.push(this.inUsedBoxArray[i]);
                // 没有超出屏幕的话,则移动
                egret.Tween.get(blockNode).to({
                    x: blockNode.x - x,
                    y: blockNode.y - y
                }, 1000, egret.Ease.sineIn);
            }
        }
        if (this.backgroundAdver) {
            var that = this;
            egret.Tween.get(this.backgroundAdver).to({
                x: this.backgroundAdver.x - x,
                y: this.backgroundAdver.y - y
            }, 1000, egret.Ease.sineIn).call(function () {
                if (_this.GameSprite.getChildIndex(_this.backgroundAdver) >= 0) {
                    if (_this.backgroundAdver.x + _this.backgroundAdver.width < 0 || _this.backgroundAdver.x > _this.stageW || _this.backgroundAdver.y > _this.stageH) {
                        _this.GameSprite.removeChild(_this.backgroundAdver);
                        _this.lastsucess = _this.sucess;
                        _this.hasBackgroudAdver = false;
                        console.log("删掉了gamescprite");
                        // this.direction = Math.random() > 0.5 ? 1 : -1;
                        // this.addBackgroundAder();
                    }
                }
            });
            // console.log("xxx:", this.backgroundAdver.x, "x:", x)
        }
        this.inUsedBox = cache2;
        this.inUsedBoxArray = cache1;
    };
    GameScene.prototype.createBoxArray = function () {
        this.boxTypeArray = [];
        this.advertisementTypeArray = [];
        var array = this.boxPool.getTypeArray();
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var x = array_1[_i];
            if (this.boxPool.isAdvertisement(x)) {
                this.advertisementTypeArray.push(x);
            }
            else {
                this.boxTypeArray.push(x);
            }
        }
        this.usedBoxTypeArray = [];
        this.inUsedBox = [];
        this.inUsedBoxArray = [];
    };
    GameScene.prototype.createPlayer = function () {
        var img = new egret.Bitmap();
        img.texture = RES.getRes("block1_png");
        this.GameSprite.addChild(img);
        this.inUsedBox.push(img);
        img.anchorOffsetX = 222;
        img.anchorOffsetY = 78;
        img.x = 20 + img.width / 2;
        img.y = this.stageH * 3 / 5;
        this.leftOrigin.y = img.y;
        this.rightOrigin.y = img.y;
        if (!this.player) {
            this.player = new egret.Bitmap();
        }
        this.GameSprite.addChild(this.player);
        this.player.texture = RES.getRes("piece_png");
        this.player.anchorOffsetY = this.player.height - 20;
        this.player.anchorOffsetX = this.player.width / 2;
        this.player.scaleX = 1;
        this.player.scaleY = 1;
        this.player.x = img.x;
        this.player.y = img.y;
        this.player.rotation = 0;
        egret.Tween.removeTweens(this.player);
        this.currentBlock = img;
        this.oldBlock = img;
    };
    GameScene.prototype.createBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xD3D3E6);
        bg.graphics.drawRect(0, 0, this.GameSprite.width, this.GameSprite.height);
        bg.graphics.endFill();
        this.GameSprite.addChild(bg);
    };
    GameScene.prototype.reSet = function () {
        // 重新开始一局
        console.log("切换场景，再来一遍");
        var startVoice = RES.getRes("start_mp3");
        startVoice.play(0, 1);
        if (this.backgroundAdver) {
            if (this.GameSprite.getChildIndex(this.backgroundAdver) >= 0) {
                if (this.backgroundAdver.x + this.backgroundAdver.width < 0 || this.backgroundAdver.x > this.stageW || this.backgroundAdver.y > this.stageH) {
                    this.GameSprite.removeChild(this.backgroundAdver);
                }
            }
        }
        this.removeChildren();
        // var sendvalue = "userId=12&gameId=2&choice=我不喜欢+1";
        //
        // let sendvalue_json = JSON.stringify(sendvalue);
        // // console.log("sendjson", sendvalue_json)
        // //
        // // var urlloader:egret.URLLoader = new egret.URLLoader();
        // // urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // // var urlreq:egret.URLRequest = new egret.URLRequest();
        // // urlreq.url = "//icontinua.com/ftf/minigame/sendData";
        // // urlreq.method = egret.URLRequestMethod.GET;
        // // urlreq.data =sendvalue_json;
        // // urlloader.load( urlreq );
        // //
        // // urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        //
        // var request = new egret.HttpRequest();
        // request.withCredentials = true;
        // request.responseType = egret.HttpResponseType.TEXT;
        // request.open("//icontinua.com/ftf/minigame/sendData",egret.HttpMethod.POST);
        // request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        // request.send(sendvalue);
        // request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
        this.score = 0;
        this.sucess = 0;
        this.lastsucess = 0;
        this.direction = 1;
        this.hasBackgroudAdver = false;
        this.jumpDistance = 0;
        this.init();
        // SceneMange.getInstance().changeScene('endScene');
    };
    GameScene.prototype.createScore = function () {
        if (!this.scoreScene) {
            this.scoreScene = new egret.TextField();
        }
        this.scoreScene.text = this.score.toString();
        this.scoreScene.size = 60;
        this.scoreScene.textColor = 0x000000;
        this.scoreScene.fontFamily = "num";
        this.scoreScene.width = 400;
        this.scoreScene.x = 50;
        this.scoreScene.y = 40;
        this.GameSprite.addChild(this.scoreScene);
        if (!this.timeDownLayer && this.GameSprite.getChildIndex(this.timeDownLayer) >= 0) {
            this.GameSprite.removeChild(this.timeDownLayer);
        }
        this.timeDownLayer = new TimeDown(this.timeCount);
        this.GameSprite.addChild(this.timeDownLayer);
        this.SetIntervalExample();
    };
    GameScene.prototype.Scores = function (desc, score, loca) {
        var label = new egret.TextField();
        label.fontFamily = "微软雅黑";
        label.width = 400;
        label.x = this.stageW / 2 - label.width / 2;
        label.y = 50 + loca * this.stageH / 5;
        label.textColor = 0;
        label.size = 20;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.textFlow = [
            { text: "=  ", style: { "textColor": 0xC0C0C0, "size": 20 } },
            { text: desc, style: { "fontFamily": "微软雅黑", "textColor": 0xFFFFFF } },
            { text: "  =", style: { "textColor": 0xC0C0C0 } }
        ];
        this.EndSprite.addChild(label);
        var grade = new egret.TextField();
        grade.text = score.toString();
        grade.size = 100;
        grade.fontFamily = "num";
        grade.width = 400;
        grade.x = this.stageW / 2 - grade.width / 2;
        grade.y = label.y + label.height + 30;
        grade.textAlign = egret.HorizontalAlign.CENTER;
        this.EndSprite.addChild(grade);
    };
    // 结束画面
    GameScene.prototype.createEndSceneScore = function () {
        // egret.registerFontMapping("font1", "fonts/font1.ttf");
        if (this.banusAdver) {
            this.banusAdver.pauseTimeout();
        }
        SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].push(this.score);
        this.Scores("本次得分", this.score, 0);
        var maxScore = 0;
        var sum = 0;
        for (var i = 2; i < SceneMange.uploadMessage.length; i++) {
            var xlist = SceneMange.uploadMessage[i];
            maxScore = maxScore > xlist[xlist.length - 1] ? maxScore : xlist[xlist.length - 1];
            sum = sum + xlist[xlist.length - 1];
        }
        this.Scores("目前最高得分", maxScore, 1);
        this.Scores("目前总得分", sum, 2);
        // var label: egret.TextField = new egret.TextField();
        // label.fontFamily = "微软雅黑";
        // label.width = 400;
        // label.x = this.stageW / 2 - label.width / 2;
        // label.y = 50;
        // label.textColor = 0;
        // label.size = 20;
        // label.textAlign = egret.HorizontalAlign.CENTER;
        // label.textFlow = <Array<egret.ITextElement>>[
        //     {text: "=  ", style: {"textColor": 0xC0C0C0, "size": 20}}
        //     , {text: "本次得分", style: {"fontFamily": "微软雅黑", "textColor": 0xFFFFFF}}
        //     , {text: "  =", style: {"textColor": 0xC0C0C0}}
        // ];
        // this.EndSprite.addChild(label);
        //
        // var grade: egret.TextField = new egret.TextField();
        // grade.text = this.score.toString();
        // grade.size = 100;
        // grade.fontFamily = "num";
        // grade.width = 400;
        // grade.x = this.stageW / 2 - grade.width / 2;
        // grade.y = label.y + label.height + 30;
        // grade.textAlign = egret.HorizontalAlign.CENTER;
        // this.EndSprite.addChild(grade);
        this.sequence_index = this.sequence_index + 1;
    };
    GameScene.prototype.createEndSceneBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x808080, 0.8);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.EndSprite.addChild(bg);
    };
    GameScene.prototype.createNextButtonImage = function () {
        var beginB = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 120;
        var textInButton = new egret.TextField();
        textInButton.text = "下一步";
        textInButton.width = beginB.width;
        textInButton.x = beginB.x;
        textInButton.size = 25;
        textInButton.y = beginB.y + (beginB.height / 2 - textInButton.height / 2) - 5;
        textInButton.textAlign = egret.HorizontalAlign.CENTER;
        textInButton.textColor = 0x000000;
        this.addChild(beginB);
        this.addChild(textInButton);
        beginB.touchEnabled = true;
        beginB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.transfer, this);
    };
    GameScene.prototype.createEndSceneButtonImage = function () {
        if (!this.replay) {
            this.replay = new egret.Bitmap();
        }
        this.replay.texture = RES.getRes("replay_png");
        if (this.EndSprite.getChildIndex(this.replay) < 0) {
            this.EndSprite.addChild(this.replay);
        }
        var image_height = this.replay.height;
        var image_width = this.replay.width;
        this.replay.touchEnabled = true;
        this.replay.width = this.stageW / 3;
        this.replay.height = this.replay.width / image_width * image_height;
        this.replay.fillMode = egret.BitmapFillMode.SCALE;
        this.replay.x = this.stageW / 2 - this.replay.width / 2;
        this.replay.y = this.stageH / 3 * 2;
        if (!this.replay.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reSet, this);
        }
    };
    GameScene.prototype.transfer = function () {
        this.removeChildren();
        this.createQuesBackGroundImage();
        if (!this.questionLayer) {
            this.questionLayer = new egret.Sprite();
        }
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        this.questionLayer.y = this.stageH / 3;
        if (!this.progre) {
            this.progre = new Progress("");
        }
        this.addChild(this.progre);
        this.progress = 1;
        this.progre.updatePro("正式实验 第 " + Math.floor(this.sequence_index / 6 + 1).toString() + " 组 第" + Math.floor(this.sequence_index % 6).toString() + " 局");
        this.updateQuestion();
        this.createButtonImage();
    };
    GameScene.prototype.createQuesBackGroundImage = function () {
        var bg = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    GameScene.prototype.updateQuestion = function () {
        this.questionLayer.removeChildren();
        switch (this.progress) {
            case 1:
                // let answer0:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question0:string = "1、\"苹果iphone\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("1、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                this.addChild(this.questionLayer);
                break;
            case 2:
                // let answer00:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question00:string = "2、\"小黄车ofo\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("2、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                break;
            case 3:
                // let answer1:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question1:string = "3、\"肯德基KFC\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("3、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                break;
            case 4:
                // let answer2:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question2:string = "4、\"拼多多\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("4、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                break;
            case 5:
                // let answer25:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question25:string = "5、\"耐克Nike\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("5、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                break;
            case 6:
                // let answer26:Array<string> = ["A、否", "B、是", "C、不知道"];
                // let question26:string = "6、\"星巴克Starbucks\"的广告是否在本局游戏中出现：";
                this.createQuestionAndAnswers("6、" + SceneMange.questionList["question"][this.progress - 1], SceneMange.questionList["answer"], SceneMange.questionList["num"][this.progress - 1]);
                break;
            // case 7:
            //     let answer27:Array<string> = ["A、否", "B、是", "C、不知道"];
            //     let question27:string = "7、本局中的广告是否有加分：";
            //     this.createQuestionAndAnswers(question27, answer27);
            //     break;
            // case 8:
            //     let answer28:Array<string> = ["A、1分-难以忍受", "B、2分-不喜欢", "C、3分-能接受", "D、4分-喜欢", "E、5分-很喜欢"];
            //     let question28:string = "8、您是否喜欢该广告提供的加分：";
            //     this.createQuestionAndAnswers(question28, answer28);
            //     break;
            case 7:
                var answer29 = ["A、1分-不干扰", "B、2分-稍微干扰", "C、3分-有些干扰", "D、4分-干扰", "E、5分-非常干扰"];
                var question29 = "7、这种广告形式是否干扰到您的游戏操作：";
                this.createQuestionAndAnswers(question29, answer29);
                break;
            case 8:
                var answer20 = ["A、1分-非常不愿意", "B、2分-不愿意", "C、3分-没有倾向", "D、4分-愿意", "E、5分-非常愿意"];
                var question20 = "8、您是否愿意继续玩有这种广告形式的该游戏：";
                this.createQuestionAndAnswers(question20, answer20);
                break;
            default:
                this.progress = 0;
                console.log("结果：", SceneMange.uploadMessage);
                this.questionLayer.removeChildren();
                if (this.sequence_index % 6 == 0) {
                    // 增加休息两分钟中的提示
                    this.createKaijuShuoMingAddtishi();
                }
                else {
                    this.createKaijuShuoMing();
                }
                break;
        }
    };
    GameScene.prototype.createQuestionAndAnswers = function (quest, answe, num) {
        if (num === void 0) { num = 10; }
        var questionna = new Questionnaire();
        questionna.setQuestionAnswers(quest, answe, num);
        this.questionLayer.y = this.stageH / 5;
        this.questionLayer.addChild(questionna);
        SceneMange.couldGoOn = questionna.getIfChoice();
    };
    GameScene.prototype.createKaijuShuoMingAddtishi = function () {
        if (this.sequence_index > 11) {
            console.log("正式实验游戏结束");
            this.removeChildren();
            this.createQuesBackGroundImage();
            SceneMange.uploadMessage.push([]);
            var progere = new TransferScreen("第 3/3 部分 - 基础问题", "回答一些 基本问题", "quesScreen");
            this.addChild(progere);
        }
        else {
            this.removeChildren();
            this.createQuesBackGroundImage();
            if (!this.questionLayer) {
                this.questionLayer = new egret.Sprite();
            }
            this.questionLayer.width = this.stageW;
            this.questionLayer.x = 0;
            this.questionLayer.y = this.stageH / 3;
            var tshi = new egret.TextField();
            tshi.text = "请休息两分钟, 再继续哟！";
            tshi.width = this.stageW;
            tshi.textColor = 0xff0000;
            tshi.size = 35;
            tshi.textAlign = egret.HorizontalAlign.CENTER;
            tshi.bold = true;
            tshi.y = 0;
            var next = new egret.TextField();
            next.text = "接下来,您将...";
            next.width = this.stageW;
            next.textColor = 0x000000;
            next.size = 20;
            next.textAlign = egret.HorizontalAlign.CENTER;
            next.bold = false;
            next.y = tshi.y + 80;
            var instrustion = "开始第 " + (Math.floor(this.sequence_index / 6) + 1).toString() + " 组 第 " + (this.sequence_index % 6 + 1).toString() + " 局游戏";
            var insru = new egret.TextField();
            insru.text = instrustion;
            insru.width = this.stageW;
            insru.textColor = 0x000000;
            insru.size = 30;
            insru.textAlign = egret.HorizontalAlign.CENTER;
            insru.bold = false;
            insru.y = next.y + 60;
            this.questionLayer.addChild(next);
            this.questionLayer.addChild(insru);
            this.questionLayer.addChild(tshi);
            this.addChild(this.questionLayer);
            var button = new egret.Bitmap();
            button.texture = RES.getRes("play_png");
            this.addChild(button);
            SceneMange.shufferQuestion(); //调换问题顺序
            var image_height = button.height;
            var image_width = button.width;
            button.touchEnabled = true;
            button.width = this.stageW / 3;
            button.height = button.width / image_width * image_height;
            button.fillMode = egret.BitmapFillMode.SCALE;
            button.x = this.stageW / 2 - button.width / 2;
            button.y = this.stageH / 3 * 2;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reSet, this);
        }
    };
    GameScene.prototype.createKaijuShuoMing = function () {
        if (this.sequence_index > 11) {
            console.log("正式实验游戏结束");
            this.removeChildren();
            this.createQuesBackGroundImage();
            SceneMange.uploadMessage.push([]);
            var progere = new TransferScreen("基础问题", "回答一些 基本问题", "quesScreen");
            this.addChild(progere);
        }
        else {
            this.removeChildren();
            this.createQuesBackGroundImage();
            if (!this.questionLayer) {
                this.questionLayer = new egret.Sprite();
            }
            this.questionLayer.width = this.stageW;
            this.questionLayer.x = 0;
            this.questionLayer.y = this.stageH / 3;
            var next = new egret.TextField();
            next.text = "接下来,您将...";
            next.width = this.stageW;
            next.textColor = 0x000000;
            next.size = 20;
            next.textAlign = egret.HorizontalAlign.CENTER;
            next.bold = false;
            next.y = 0;
            var instrustion = "开始第 " + (Math.floor(this.sequence_index / 6) + 1).toString() + "/2 组" + (this.sequence_index % 6 + 1).toString() + "/6 局游戏";
            var insru = new egret.TextField();
            insru.text = instrustion;
            insru.width = this.stageW;
            insru.textColor = 0x000000;
            insru.size = 30;
            insru.textAlign = egret.HorizontalAlign.CENTER;
            insru.bold = false;
            insru.y = next.y + 60;
            this.questionLayer.addChild(next);
            this.questionLayer.addChild(insru);
            this.addChild(this.questionLayer);
            var button = new egret.Bitmap();
            button.texture = RES.getRes("play_png");
            this.addChild(button);
            SceneMange.shufferQuestion(); //调换问题顺序
            var image_height = button.height;
            var image_width = button.width;
            button.touchEnabled = true;
            button.width = this.stageW / 3;
            button.height = button.width / image_width * image_height;
            button.fillMode = egret.BitmapFillMode.SCALE;
            button.x = this.stageW / 2 - button.width / 2;
            button.y = this.stageH / 3 * 2;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reSet, this);
        }
    };
    GameScene.prototype.createButtonImage = function () {
        var beginB = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 120;
        var textInButton = new egret.TextField();
        textInButton.text = "下一步";
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
    GameScene.prototype.beginButtonTap = function () {
        // console.log(this.textInputAge.text)
        if (SceneMange.couldGoOn) {
            // if(this.progress == 7 && SceneMange.uploadMessage[SceneMange.uploadMessage.length-1][SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].length-1] == 0){
            //     this.progress = this.progress + 2;
            //     SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].push(-1);
            // }else {
            //     this.progress = this.progress + 1;
            // }
            this.progress = this.progress + 1;
            this.updateQuestion();
        }
        else {
            console.log("请做出选择");
            var makechoiceAttention = new egret.TextField();
            makechoiceAttention.textAlign = egret.HorizontalAlign.CENTER;
            makechoiceAttention.text = "请先\"选择答案\"，再点击\"下一步\"";
            makechoiceAttention.textColor = 0xff0000;
            makechoiceAttention.width = this.stageW;
            makechoiceAttention.y = this.stageH - 400;
            this.addChild(makechoiceAttention);
            var that = this;
            egret.Tween.get(makechoiceAttention).to({ alpha: 0.4 }, 3000).call(function () {
                that.removeChild(makechoiceAttention);
            });
        }
    };
    GameScene.prototype.addBanner = function () {
        // if(!this.banusAdver){
        this.banusAdver = new Banner(this.sequenceList[Math.floor(this.sequence_index / 6)][this.sequence_index % 6]);
        // }
        this.banusAdver.width = this.stageW;
        this.banusAdver.height = this.stageH / 7;
        this.banusAdver.x = 0;
        this.banusAdver.y = this.stageH - this.banusAdver.height;
        if (this.getChildIndex(this.banusAdver) >= 0) {
        }
        else {
            this.addChild(this.banusAdver);
        }
        if (this.getChildIndex(this.GameSprite) >= 0) {
            if (this.getChildIndex(this.GameSprite) > this.getChildIndex(this.banusAdver)) {
                this.swapChildren(this.GameSprite, this.banusAdver);
            }
        }
    };
    // 添加pop-up广告
    GameScene.prototype.addPopUpAdvertisement = function () {
        this.touchUnable();
        console.log("添加pop, GameSprit的点击", this.GameSprite.touchEnabled);
        this.popup_sprit = new Popup(this.pop_select[(this.pop_index_track - 1) % 3]);
        this.addChild(this.popup_sprit);
        this.createShutDown(this.shutdown_pop);
        egret.clearTimeout(this.intervalID);
        console.log("添加pop, GameSprit的点击", this.GameSprite.touchEnabled);
    };
    GameScene.prototype.addjili = function () {
        if (!this.awardAdver) {
            this.awardAdver = new egret.Bitmap();
        }
        this.awardAdver.texture = RES.getRes("jili_png");
        // this.awardAdver.height = this.stageH / 10;
        // this.awardAdver.width = this.stageW;
        this.awardAdver.scaleX = 0.7;
        this.awardAdver.scaleY = 0.7;
        this.awardAdver.x = this.stageW - this.awardAdver.width / 2 - 60;
        this.awardAdver.y = 40;
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xFF4500, 1);
        circle.graphics.drawCircle(0, 0, 25);
        circle.graphics.endFill();
        circle.x = this.awardAdver.x + this.awardAdver.width / 2 + 35;
        circle.y = this.awardAdver.y - 7;
        if (!this.awardLeftCount) {
            this.awardLeftCount = new egret.TextField();
        }
        this.awardLeftCount.text = (3 - this.pop_index_track).toString();
        this.awardLeftCount.textColor = 0x000000;
        this.awardLeftCount.size = 30;
        this.awardLeftCount.bold = true;
        this.awardLeftCount.x = circle.x - 10;
        this.awardLeftCount.y = circle.y - 10;
        if (this.getChildIndex(this.awardAdver) > 0) {
        }
        else {
            this.addChild(this.awardAdver);
            this.addChild(circle);
            this.addChild(this.awardLeftCount);
        }
        this.setChildIndex(this.awardAdver, 20);
        this.setChildIndex(circle, 21);
        this.setChildIndex(this.awardLeftCount, 22);
        this.awardAdver.touchEnabled = true;
        this.awardAdver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapjili, this);
    };
    GameScene.prototype.tapjili = function () {
        if (this.pop_index_track >= 3) {
            this.awardAdver.touchEnabled = false;
        }
        else {
            this.touchUnable();
            egret.clearTimeout(this.intervalID);
            this.awardAdver_sprit = new AwardVideo(this.video_select[(this.pop_index_track++) % 3]);
            this.awardLeftCount.text = (3 - this.pop_index_track).toString();
            this.addChild(this.awardAdver_sprit);
            this.createShutDown(this.shutdown);
        }
    };
    GameScene.prototype.createShutDown = function (func) {
        this.shutdown_map = new egret.Bitmap();
        this.shutdown_map.texture = RES.getRes("shutdown_png");
        this.shutdown_map.width = 100;
        this.shutdown_map.height = 100;
        this.shutdown_map.x = this.stageW - this.shutdown_map.width - 20;
        this.shutdown_map.y = 20;
        this.addChild(this.shutdown_map);
        this.shutdown_map.touchEnabled = true;
        this.shutdown_map.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    GameScene.prototype.shutdown_pop = function () {
        if (this.getChildIndex(this.popup_sprit) >= 0) {
            this.removeChild(this.popup_sprit);
            this.removeChild(this.shutdown_map);
        }
        this.SetIntervalExample();
        this.touchEnable();
        this.createAdd10TweenAndAudio(5);
    };
    GameScene.prototype.shutdown = function () {
        if (this.awardAdver_sprit.pauseTimeout() > 0) {
            //create choose pannel。
            this.awardAdver_sprit.pauser();
            this.createChoosePannel();
        }
        else {
            if (this.getChildIndex(this.awardAdver_sprit) >= 0) {
                this.removeChild(this.awardAdver_sprit);
                this.removeChild(this.shutdown_map);
            }
            this.SetIntervalExample();
            this.touchEnable();
            // create +10 的动作和音效
            this.createAdd10TweenAndAudio(10);
        }
    };
    GameScene.prototype.createAdd10TweenAndAudio = function (scoreAdd) {
        var fire = new egret.Bitmap();
        fire.texture = RES.getRes("fire_png");
        var width = fire.width;
        var height = fire.height;
        fire.width = this.GameSprite.width * 2 / 3;
        fire.height = height * fire.width / width;
        fire.x = this.stageW / 2;
        fire.y = this.timeDownLayer.y + 200;
        fire.anchorOffsetX = fire.width / 2;
        fire.anchorOffsetY = fire.height / 2;
        fire.scaleX = 0.3;
        fire.scaleY = 0.3;
        this.GameSprite.addChild(fire);
        var add10 = new egret.TextField();
        add10.text = "+ " + scoreAdd.toString();
        add10.textColor = 0xff0000;
        add10.size = 40;
        add10.bold = true;
        add10.width = this.stageW;
        add10.textAlign = egret.HorizontalAlign.CENTER;
        add10.y = fire.y - add10.height / 2;
        this.GameSprite.addChild(add10);
        this.perfectVoice.play(0, 1);
        var that = this;
        egret.Tween.get(fire).to({ scaleX: 1.3, scaleY: 1.3 }, 500).call(function () {
            that.GameSprite.removeChild(fire);
            egret.Tween.get(add10).to({ alpha: 0.2 }, 500).call(function () {
                that.GameSprite.removeChild(add10);
                that.score = that.score + scoreAdd;
                that.scoreScene.text = that.score.toString();
            });
        });
    };
    // 观看激励性视频广告时，如果时间未到，选择关闭，此时创建的关闭提醒窗口
    GameScene.prototype.createChoosePannel = function () {
        var _this = this;
        if (!this.shutdown_choose) {
            this.shutdown_choose = new egret.Sprite();
        }
        this.shutdown_choose.removeChildren();
        this.shutdown_choose.width = this.stageW / 2;
        this.shutdown_choose.height = this.stageH / 6;
        this.shutdown_choose.x = (this.stageW - this.shutdown_choose.width) / 2;
        this.shutdown_choose.y = this.stageH * 2 / 5;
        if (this.getChildIndex(this.shutdown_choose) >= 0) { }
        else {
            this.addChild(this.shutdown_choose);
        }
        var background = new egret.Shape();
        background.graphics.clear();
        background.graphics.beginFill(0x000000, 1);
        background.graphics.drawRect(0, 0, this.shutdown_choose.width, this.shutdown_choose.height);
        background.graphics.endFill();
        this.shutdown_choose.addChild(background);
        var textPanel = new egret.TextField();
        textPanel.text = "尚未观看完毕，取消无法获得奖励";
        textPanel.textColor = 0xff0000;
        textPanel.size = 20;
        textPanel.width = this.shutdown_choose.width;
        textPanel.height = this.shutdown_choose.height / 2;
        textPanel.textAlign = egret.HorizontalAlign.CENTER;
        textPanel.y = this.shutdown_choose.height / 4 - 15;
        this.shutdown_choose.addChild(textPanel);
        var line1 = new egret.Shape();
        line1.graphics.lineStyle(1, 0xffffff);
        line1.graphics.moveTo(0, this.shutdown_choose.height / 2);
        line1.graphics.lineTo(textPanel.width, this.shutdown_choose.height / 2);
        this.shutdown_choose.addChild(line1);
        var button_cancel = new egret.TextField();
        button_cancel.text = "取消观看";
        button_cancel.textColor = 0xA9A9A9;
        button_cancel.size = 30;
        button_cancel.width = this.shutdown_choose.width / 2;
        button_cancel.height = this.shutdown_choose.height / 2;
        button_cancel.textAlign = egret.HorizontalAlign.CENTER;
        button_cancel.y = this.shutdown_choose.height / 2 + 30;
        button_cancel.x = 0;
        this.shutdown_choose.addChild(button_cancel);
        var line2 = new egret.Shape();
        line2.graphics.lineStyle(1, 0xffffff);
        line2.graphics.moveTo(textPanel.width / 2, this.shutdown_choose.height / 2);
        line2.graphics.lineTo(textPanel.width / 2, this.shutdown_choose.height);
        this.shutdown_choose.addChild(line2);
        var button_continue = new egret.TextField();
        button_continue.text = "继续观看";
        button_continue.textColor = 0x00FF00;
        button_continue.size = 30;
        button_continue.width = this.shutdown_choose.width / 2;
        button_continue.height = this.shutdown_choose.height / 2;
        button_continue.textAlign = egret.HorizontalAlign.CENTER;
        button_continue.y = this.shutdown_choose.height / 2 + 30;
        button_continue.x = this.shutdown_choose.width / 2;
        this.shutdown_choose.addChild(button_continue);
        var that = this;
        button_cancel.touchEnabled = true;
        button_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            that.removeChild(_this.shutdown_choose);
            if (that.getChildIndex(_this.awardAdver_sprit) >= 0) {
                that.removeChild(_this.awardAdver_sprit);
                that.removeChild(_this.shutdown_map);
            }
            that.SetIntervalExample();
            _this.touchEnable();
        }, this);
        button_continue.touchEnabled = true;
        button_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            that.removeChild(_this.shutdown_choose);
            that.awardAdver_sprit.SetIntervalExample();
            that.awardAdver_sprit.player();
        }, this);
    };
    GameScene.prototype.SetIntervalExample = function () {
        this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
    };
    GameScene.prototype.myRepeatingFunction = function (obj) {
        this.timeCount = this.timeCount - 1;
        if (this.timeCount >= 0) {
            this.intervalID = egret.setTimeout(this.myRepeatingFunction, this, this.intervalDuration);
            this.timeDownLayer.updateTimeCount(this.timeCount);
        }
        else {
            egret.Tween.removeAllTweens();
            if (this.pushSoundChannel) {
                this.pushSoundChannel.stop();
                this.pushSoundChannel = null;
            }
            // 时间到
            this.timeCount = SceneMange.timecount;
            this.fallVoice.play(0, 1);
            console.log("playfall in 1567");
            this.GameSprite.removeChild(this.scoreScene);
            this.createEndScript();
            this.GameSprite.touchEnabled = false;
        }
    };
    GameScene.prototype.touchUnable = function () {
        if (this.GameSprite) {
            console.log("touchunable");
            this.GameSprite.touchEnabled = false;
        }
        if (this.awardAdver) {
            this.awardAdver.touchEnabled = false;
        }
    };
    GameScene.prototype.touchEnable = function () {
        if (this.GameSprite) {
            this.GameSprite.touchEnabled = true;
        }
        if (this.awardAdver) {
            this.awardAdver.touchEnabled = true;
        }
    };
    return GameScene;
}(egret.Sprite));
