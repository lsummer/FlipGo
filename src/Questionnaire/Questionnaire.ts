class Questionnaire extends egret.Sprite {

    private stageW: number = 0;
    private stageH: number = 0;

    private question: string;
    private answers: Array<string>;

    private choice: string;
    private haschoice: boolean;

    private currentView: egret.TextField;


    private adverName: Array<string>;
    constructor() {
        super();
        this.init();
        this.adverName = ["iphone_x_jpg","ofo_jpg","KFC_png","pinduoduo_jpg","nike_png","Starbucks_jpg"];
    }

    public getChoice():string{
        if(this.haschoice){
            return this.choice;
        }else{
            return null;
        }
    }

    public getIfChoice(): boolean{
        return this.haschoice;
    }

    public setQuestionAnswers(ques: string, answe: Array<string>, num: number=10){
        this.question = ques;
        this.answers = answe;
        this.creatQuestion(num);
    }

    // 初始化(给开始按钮绑定点击事件)
    private init(){
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.haschoice = false;
    }

    private creatQuestion(num: number){
        var textview:egret.TextField = new egret.TextField();
        textview.text = this.question;
        this.addChild(textview);

        textview.width = this.stageW - 100;
        textview.textColor = 0x000000;
        textview.size = 30;
        textview.bold = true;
        textview.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        textview.y = 0;

        if(num<=5){
            var adver:egret.Bitmap = new egret.Bitmap();
            adver.texture = RES.getRes(this.adverName[num]);
            adver.width = 200;
            adver.height = 200;
            adver.x = (this.stageW - adver.width)/2;
            adver.y = textview.y + textview.height + 20;
            this.addChild(adver);
        }

        let flag = 0;
        for(let ans of this.answers){
            // var answerLayer: egret.Sprite = new egret.Sprite();
            // answerLayer.width = this.stageW;
            // answerLayer.height = 40;
            // this.addChild(answerLayer);


            var answerView:egret.TextField = new egret.TextField();
            answerView.text = ans;
            this.addChild(answerView);

            answerView.width = this.stageW - 220;
            answerView.height = 40;
            answerView.size = 30;
            answerView.x = textview.x+60;
            answerView.verticalAlign = egret.VerticalAlign.MIDDLE;
            flag ++;
            answerView.y = num<=5?adver.y + adver.height - 10 + flag*(answerView.height+40):textview.y + textview.height - 10 + flag*(answerView.height+40);

            answerView.textColor = 0x000000;
            answerView.background = true;
            answerView.backgroundColor = 0xD3D3D3;
            answerView.touchEnabled = true;
            answerView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseAnswer, this);
        }
    }

    private chooseAnswer(evt:egret.TouchEvent){
        this.choice = evt.target.text;

        if(this.haschoice){
            this.currentView.textColor = 0x000000;
            this.currentView.backgroundColor = 0xD3D3D3;
            SceneMange.uploadMessage[SceneMange.uploadMessage.length-1][SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].length-1] = (this.answers.indexOf(this.choice));
        }
        else{
            SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].push(this.answers.indexOf(this.choice));
        }
        this.currentView = evt.target;

        this.haschoice = true;

        SceneMange.couldGoOn = true;

        this.currentView.textColor = 0x228B22;
        this.currentView.backgroundColor = 0xBDB76B;
        // console.log("选择了答案", this.answers.indexOf(this.choice))

        console.log("push 选择结果", this.answers.indexOf(this.choice));
    }
}