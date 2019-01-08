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
var SceneMange = (function (_super) {
    __extends(SceneMange, _super);
    // },{                                // 无奖励，特殊盒子（无广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block2_png",  "block3_png", "block4_png", "block2_png", "block5_png",  "block4_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: false    // 是否有奖励
    // },{                                // 有奖励，特殊盒子（无广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block2_png",  "block3_png", "block4_png", "block2_png", "block5_png",  "block4_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: true    // 是否有奖励
    // },{                                // 无奖励，特殊盒子（广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block5_png",  "block6_png", "block7_png", "block5_png", "block7_png",  "block6_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: false    // 是否有奖励
    // },{                                // 有奖励，特殊盒子（广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block5_png",  "block6_png", "block7_png", "block5_png", "block7_png",  "block6_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: true    // 是否有奖励
    // },{                                // 无奖励，特殊盒子（广告+非广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block2_png",  "block6_png", "block3_png", "block5_png", "block4_png",  "block7_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: false    // 是否有奖励
    // },{                                // 有奖励，特殊盒子（广告+非广告）
    //     boxSourceNames: ["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block2_png",  "block6_png", "block3_png", "block5_png", "block4_png",  "block7_png"],
    //     judge: 5,  // <= judge的位置是非特殊盒子
    //     specialBox: true,   // 是否有特殊盒子
    //     rewardFlag: true    // 是否有奖励
    // }];
    // public sequenceList: Array<Array<number>>;
    function SceneMange() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneMange.shufferQuestion = function () {
        for (var j_ = this.questionList['question'].length - 1; j_ >= 0; j_--) {
            var j = Math.floor(Math.random() * (j_));
            var ith_array_first = this.questionList['question'][j_];
            var ith_array_second = this.questionList['question'][j];
            var num_first = this.questionList["num"][j_];
            var num_second = this.questionList["num"][j];
            if (Math.random() >= 0.5) {
                this.questionList['question'][j] = ith_array_first;
                this.questionList['question'][j_] = ith_array_second;
                this.questionList["num"][j] = num_first;
                this.questionList["num"][j_] = num_second;
            }
        }
    };
    SceneMange.prototype.init = function () {
        // this.sequenceList = SequenceRandom.randomSequence();
        // console.log(this.sequenceList);
        // 实例化两个场景
        this.beginScene = new BeginScene();
        this.preGameScene = new PreGameScene();
        this.gameScene = new GameScene();
        this.endScene = new EndScene();
        this.quesScreen = new QuesScreen();
        this.welcomeScreen = new WelcomeScreen();
        // 默认添加开始场景
        this.addChild(this.welcomeScreen);
        // this.beginSound = RES.getRes("icon_mp3");
        // this.beginSoundChannel = this.beginSound.play(0, 1);
    };
    // 实例化单例获取方法
    SceneMange.getInstance = function () {
        if (!SceneMange.instance) {
            SceneMange.instance = new SceneMange();
        }
        return SceneMange.instance;
    };
    // 切换场景
    SceneMange.prototype.changeScene = function (type) {
        // 释放资源
        // 移除所有显示列表中的对象
        this.removeChildren();
        // 添加下一个场景
        this.addChild(this[type]);
    };
    SceneMange.uploadMessage = [];
    SceneMange.timecount = 90;
    SceneMange.questionList = {
        answer: ["A、否", "B、是", "C、不知道"],
        question: ["\"苹果iphone\"的广告是否在本局游戏中出现：",
            "\"小黄车ofo\"的广告是否在本局游戏中出现：",
            "\"肯德基KFC\"的广告是否在本局游戏中出现：",
            "\"拼多多\"的广告是否在本局游戏中出现：",
            "\"耐克Nike\"的广告是否在本局游戏中出现：",
            "\"星巴克Starbucks\"的广告是否在本局游戏中出现："],
        num: [0, 1, 2, 3, 4, 5]
    };
    SceneMange.gameSceneSetting = [{
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,
            specialBox: false,
            rewardFlag: false,
            banner: false,
            award: false,
            backgroud: false,
            popUp: false,
        }, {
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,
            specialBox: false,
            rewardFlag: false,
            banner: true,
            award: false,
            backgroud: false,
            popUp: false,
        },
        {
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,
            specialBox: false,
            rewardFlag: false,
            banner: false,
            award: true,
            backgroud: false,
            popUp: false,
        },
        {
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,
            specialBox: false,
            rewardFlag: false,
            banner: false,
            award: false,
            backgroud: true,
            popUp: false,
        },
        {
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,
            specialBox: false,
            rewardFlag: false,
            banner: false,
            award: false,
            backgroud: false,
            popUp: true,
        },
        {
            // boxSourceNames: true,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block5_png",  "block6_png", "block7_png", "block8_png", "block9_png",  "block10_png"],
            judge: 5,
            specialBox: true,
            rewardFlag: true,
            banner: false,
            award: false,
            backgroud: false,
            popUp: false,
        },
    ];
    return SceneMange;
}(egret.Sprite));
