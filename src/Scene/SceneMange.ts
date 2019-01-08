class SceneMange extends egret.Sprite {
    // 场景控制器的单例
    private static instance: SceneMange;

    public static couldGoOn: boolean;

    public static uploadMessage: Array<Array<any>> = [];

    public static timecount: number = 90;

    public static questionList:object = {
        answer: ["A、否", "B、是", "C、不知道"],
        question: ["\"苹果iphone\"的广告是否在本局游戏中出现：",
            "\"小黄车ofo\"的广告是否在本局游戏中出现：",
            "\"肯德基KFC\"的广告是否在本局游戏中出现：",
            "\"拼多多\"的广告是否在本局游戏中出现：",
            "\"耐克Nike\"的广告是否在本局游戏中出现：",
            "\"星巴克Starbucks\"的广告是否在本局游戏中出现："],
        num: [0,1,2,3,4,5]
    };

    public static shufferQuestion(){
        for(let j_=this.questionList['question'].length-1; j_>=0; j_--){
            let j = Math.floor(Math.random() * (j_));
            let ith_array_first = this.questionList['question'][j_];
            let ith_array_second = this.questionList['question'][j];

            let num_first = this.questionList["num"][j_];
            let num_second = this.questionList["num"][j];

            if(Math.random()>=0.5) {
                this.questionList['question'][j] = ith_array_first;
                this.questionList['question'][j_] = ith_array_second;

                this.questionList["num"][j] = num_first;
                this.questionList["num"][j_] = num_second;
            }
        }
    }
    // 开始场景
    private beginScene: BeginScene;
    // 预实验场景
    private preGameScene: PreGameScene;
    // 游戏场景
    private gameScene: GameScene;
    // 结束场景
    private endScene: EndScene;

    private quesScreen: QuesScreen;

    private welcomeScreen: WelcomeScreen;

    public static gameSceneSetting = [{ // 最朴素的游戏类型，啥都没有
        // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
        judge: 6,  // <= judge的位置是非特殊盒子
        specialBox: false,   // 是否盒子上有广告   1

        rewardFlag: false,    // 是否有奖励,

        banner: false,       // 是否有横幅广告     2
        award: false,        // 是否有激励        3
        backgroud: false,    // 是否背景上有广告   4
        popUp: false,    // 是否有弹出式广告   5
    },{ // 有横幅广告-1
        // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
        judge: 6,  // <= judge的位置是非特殊盒子
        specialBox: false,   // 是否盒子上有广告   1

        rewardFlag: false,    // 是否有奖励,

        banner: true,       // 是否有横幅广告     2
        award: false,        // 是否有激励        3
        backgroud: false,    // 是否背景上有广告   4
        popUp: false,    // 是否有弹出式广告   5
    },
        { // 有激励广告-2
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,  // <= judge的位置是非特殊盒子
            specialBox: false,   // 是否盒子上有广告   1

            rewardFlag: false,    // 是否有奖励,

            banner: false,       // 是否有横幅广告     2
            award: true,        // 是否有激励        3
            backgroud: false,    // 是否背景上有广告   4
            popUp: false,    // 是否有弹出式广告   5
        },
        { // 有背景广告-3
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,  // <= judge的位置是非特殊盒子
            specialBox: false,   // 是否盒子上有广告   1

            rewardFlag: false,    // 是否有奖励,

            banner: false,       // 是否有横幅广告     2
            award: false,        // 是否有激励        3
            backgroud: true,    // 是否背景上有广告   4
            popUp: false,    // 是否有弹出式广告   5
        },
        { // 弹出式广告-4
            // boxSourceNames: false,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png"],
            judge: 6,  // <= judge的位置是非特殊盒子
            specialBox: false,   // 是否盒子上有广告   1

            rewardFlag: false,    // 是否有奖励,

            banner: false,       // 是否有横幅广告     2
            award: false,        // 是否有激励        3
            backgroud: false,    // 是否背景上有广告   4
            popUp: true,    // 是否有弹出式广告   5
        },
        { // 盒子上有广告-5
            // boxSourceNames: true,//["block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block1_png", "block5_png",  "block6_png", "block7_png", "block8_png", "block9_png",  "block10_png"],
            judge: 5,  // <= judge的位置是非特殊盒子
            specialBox: true,   // 是否盒子上有广告   1

            rewardFlag: true,    // 是否有奖励,

            banner: false,       // 是否有横幅广告     2
            award: false,        // 是否有激励        3
            backgroud: false,    // 是否背景上有广告   4
            popUp: false,    // 是否有弹出式广告   5
        },
    ]
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
    public constructor() {
        super();
        this.init();
    }
    private init(){
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
    }

    // 实例化单例获取方法
    public static getInstance(): SceneMange{
        if(!SceneMange.instance){
            SceneMange.instance = new SceneMange();
        }
        return SceneMange.instance;
    }

    // 切换场景
    public changeScene(type){
        // 释放资源

        // 移除所有显示列表中的对象
        this.removeChildren();
        // 添加下一个场景
        this.addChild(this[type]);
    }
}