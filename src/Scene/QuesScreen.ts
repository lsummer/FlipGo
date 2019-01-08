import checkNull = RES.checkNull;

class QuesScreen extends egret.Sprite {

    private stageW: number = 0;
    private stageH: number = 0;

    private questionnaire: Array<Questionnaire>;

    private questionLayer: egret.Sprite;
    private textInputName: egret.TextField;
    private textInputAge: egret.TextField;
    private progress: number = 0;
    private progre: Progress;

    private hasChoice1: boolean = false;
    private choice1: string;
    private currentView1: egret.TextField;

    private hasChoice2: boolean = false;
    private choice2: string;
    private currentView2: egret.TextField;


    constructor() {
        super();
        this.init();
    }

    // 初始化(给开始按钮绑定点击事件)
    private init(){
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        if(!this.questionLayer){
            this.questionLayer = new egret.Sprite();
        }
        this.addChild(this.questionLayer);
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        this.questionLayer.y = this.stageH/4;
        if(!this.progre){
            this.progre = new Progress("");
        }

        this.addChild(this.progre);
        this.progress = 1;
        this.updateQuestion();

        this.createButtonImage();
        // let answer1:Array<string> = ["男", "女"];
        // let question1:string = "您的性别：";
        //
        //
        // // this.createQuestionAndAnswers(question1, answer1, 100);
        //
        // let answer2:Array<string> = ["高中及以下", "本科", "研究生", "博士", "其他"];
        // let question2:string = "您的学业水平：";
        // this.createQuestionAndAnswers(question2, answer2, 500);
        //
        // this.createButtonImage()
    }

    private layTxBg(tx:egret.TextField):void {
        var shp:egret.Shape = new egret.Shape;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(tx.x, tx.y, tx.width, tx.height);
        shp.graphics.endFill();
        this.questionLayer.addChild(shp);
    }

    private createInputName(question: string){
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;
        this.questionLayer.y = this.stageH/3;

        let ques: egret.TextField = new egret.TextField();
        ques.text = question;
        ques.width = this.stageW - 20;
        ques.textColor = 0x000000;
        ques.size = 35;
        ques.bold = true;
        ques.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        ques.y = 0;
        this.questionLayer.addChild(ques);

        var content: egret.Sprite = new egret.Sprite();
        content.width = 100;
        content.height = this.stageH;

        for(let i=18; i< 70; i++){
            let ageFile:egret.TextField = new egret.TextField();
            // console.log(i.toString())
            ageFile.text = i.toString()
            ageFile.width = content.width;
            ageFile.textColor = 0x000000;
            ageFile.size = 25;
            ageFile.y = (i-18) * 30;
            ageFile.x = 0;
            ageFile.touchEnabled = true;
            ageFile.textAlign = egret.HorizontalAlign.CENTER;
            let that = this;
            ageFile.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt:egret.TouchEvent) {
                if(that.hasChoice1){
                    that.currentView1.textColor = 0x000000;
                }
                that.currentView1 = evt.target;
                that.choice1 = evt.target.text;
                that.hasChoice1 = true;
                that.currentView1.textColor = 0x228B22;
                console.log("选择了答案", that.choice1)
            }, content);
            content.addChild(ageFile);
        }
        // var content:egret.Sprite = this.createGird(50,50,9,9);

        var myscrollView:egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(content);
        myscrollView.width = 100;
        myscrollView.height = 300;
        myscrollView.x = this.stageW / 2;
        myscrollView.y = ques.y + myscrollView.height/2+10;
        myscrollView.anchorOffsetX = myscrollView.width / 2;
        myscrollView.anchorOffsetY = myscrollView.height / 2;
        this.addChild(myscrollView);

        var background:egret.Shape = new egret.Shape();
        background.graphics.lineStyle(1,0x1102cc)
        background.graphics.drawRect(0,0,100,300);
        background.graphics.endFill();
        background.x = myscrollView.x;
        background.y = myscrollView.y;
        background.anchorOffsetX = background.width / 2;
        background.anchorOffsetY = background.height / 2;
        this.questionLayer.addChild(background);

        this.questionLayer.addChild(myscrollView);

        this.addChild(this.questionLayer);
    }

    private createInputAge(question: string){
        this.questionLayer.width = this.stageW;
        this.questionLayer.x = 0;

        let ques: egret.TextField = new egret.TextField();
        ques.text = question;
        ques.width = this.stageW - 20;
        ques.textColor = 0x000000;
        ques.size = 35;
        ques.bold = true;
        ques.x = 50;
        // ques.textAlign = egret.HorizontalAlign.CENTER;
        ques.y = 0;
        this.questionLayer.addChild(ques);

        var content: egret.Sprite = new egret.Sprite();
        content.width = 100;
        content.height = this.stageH;

        for(let i=18; i< 70; i++){
            let ageFile:egret.TextField = new egret.TextField();
            console.log(i.toString())
            ageFile.text = i.toString()
            ageFile.width = content.width;
            ageFile.textColor = 0x000000;
            ageFile.size = 25;
            ageFile.y = (i-18) * 30;
            ageFile.x = 0;
            ageFile.touchEnabled = true;
            ageFile.textAlign = egret.HorizontalAlign.CENTER;
            let that = this;
            ageFile.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt:egret.TouchEvent) {
                that.choice1 = evt.target.text;
                if(that.hasChoice1){
                    that.currentView1.textColor = 0x000000;
                    SceneMange.uploadMessage[SceneMange.uploadMessage.length-1][SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].length-1] = parseInt(that.choice1);
                }
                else{
                    SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].push(parseInt(that.choice1));
                }

                that.currentView1 = evt.target;

                that.hasChoice1 = true;
                that.currentView1.textColor = 0x228B22;
                console.log("选择了答案", that.choice1)
            }, content);
            content.addChild(ageFile);
        }
        // var content:egret.Sprite = this.createGird(50,50,9,9);

        var myscrollView:egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(content);
        myscrollView.width = 100;
        myscrollView.height = 300;
        myscrollView.x = this.stageW / 2;
        myscrollView.y = ques.y + myscrollView.height/2+10;
        myscrollView.anchorOffsetX = myscrollView.width / 2;
        myscrollView.anchorOffsetY = myscrollView.height / 2;
        this.addChild(myscrollView);

        var background:egret.Shape = new egret.Shape();
        background.graphics.lineStyle(1,0x1102cc)
        background.graphics.drawRect(0,0,100,300);
        background.graphics.endFill();
        background.x = myscrollView.x;
        background.y = myscrollView.y;
        background.anchorOffsetX = background.width / 2;
        background.anchorOffsetY = background.height / 2;
        this.questionLayer.addChild(background);

        this.questionLayer.addChild(myscrollView);


    }

    //创建格子函数，根据输入的宽和高来创建一个 row * line的格子图。并返回Shape对象。
    private createGird(w:number,h:number,row:number,line:number):egret.Shape {

        var shape:egret.Shape = new egret.Shape();
        for(var i = 0;i < row;i++ ) {
            for(var j = 0; j < line;j++) {
                if ((j + row * i) % 2 === 0) {
                    shape.graphics.beginFill(0xF9C20B);
                    shape.graphics.drawRect(j * w, i * h, w, h);
                    shape.graphics.endFill();
                }
                else {
                    shape.graphics.beginFill(0x2A9FFF);
                    shape.graphics.drawRect(j * w, i * h, w, h);
                    shape.graphics.endFill();
                }
            }
        }
        return shape;
    }

    private createBackGroundImage(){
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC);
        bg.graphics.drawRect( 0, 0, this.stageW, this.stageH );
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private createQuestionAndAnswers(quest: string, answe: Array<string>){
        let questionna: Questionnaire = new Questionnaire();
        questionna.setQuestionAnswers(quest, answe);
        this.questionLayer.addChild(questionna);
    }

    private createButtonImage(){
            var beginB: egret.Bitmap = new egret.Bitmap();
            beginB.texture = RES.getRes("button_png");
            beginB.width = beginB.width / 2;
            beginB.height = beginB.height / 2;
            beginB.x = this.stageW / 2 - beginB.width / 2;
            beginB.y = this.stageH - beginB.height - 200;

            var textInButton: egret.TextField = new  egret.TextField();
            textInButton.text = "已完成，下一题"
            textInButton.width = beginB.width;
            textInButton.x = beginB.x;
            textInButton.size = 25;
            textInButton.y = beginB.y + (beginB.height/2 - textInButton.height/2)-5 ;
            textInButton.textAlign = egret.HorizontalAlign.CENTER;
            textInButton.textColor = 0x000000;

            this.addChild(beginB);
            this.addChild(textInButton);

            beginB.touchEnabled = true;
            beginB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginButtonTap, this);
    }

    private beginButtonTap(){
        // console.log(this.textInputAge.text)
        // this.progress = this.progress + 1;
        // this.updateQuestion();

        if(SceneMange.couldGoOn){
            this.progress = this.progress + 1;
            this.updateQuestion();
        }else{
            console.log("请做出选择");
            var makechoiceAttention: egret.TextField = new egret.TextField();
            makechoiceAttention.textAlign = egret.HorizontalAlign.CENTER;
            makechoiceAttention.text = "请先\"选择答案\"，再点击\"下一步\"";
            makechoiceAttention.textColor = 0xff0000;
            makechoiceAttention.width = this.stageW;
            makechoiceAttention.y = this.stageH - 400;

            this.addChild(makechoiceAttention);
            var that = this;
            egret.Tween.get(makechoiceAttention).to({alpha: 0.4}, 3000).call(
                ()=>{
                    that.removeChild(makechoiceAttention);
                }
            )
        }

    }

    private updateQuestion(){
        this.progre.updatePro("基础问题");
        this.questionLayer.removeChildren();
        switch (this.progress){
            case 1:
                let answer0:Array<string> = ["A、每天一个小时以上", "B、每天一个小时以内", "C、每周玩几次", "D、偶尔玩", "E、几乎不玩"];
                let question0:string = "1、您玩微信小游戏的时长：";
                this.createQuestionAndAnswers(question0, answer0);
                break;
            case 2:
                this.createInputAge("2、您的年龄:");
                break;
            case 3:
                let answer1:Array<string> = ["A、男", "B、女"];
                let question1:string = "3、您的性别：";
                this.createQuestionAndAnswers(question1, answer1);
                break;
            case 4:
                let answer2:Array<string> = ["A、博士", "B、研究生", "C、本科", "D、高中及以下", "E、其他"];
                let question2:string = "4、您的学业水平：";
                this.createQuestionAndAnswers(question2, answer2);
                break;
            default:
                break;
        }
        if(this.progress == 5){
            this.removeChildren();
            console.log("结果：", SceneMange.uploadMessage)
            this.createBackGroundImage();
            var value = SceneMange.uploadMessage;
            var sendvalue = "";
            var paraName = ["p1", "p2", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10","g11","g12","q1"]
            var index = 0;
            for(let x of value){
                var str = "";
                for(let y of x){
                    str = str + y.toString() + " ";
                }
                if(sendvalue == ""){
                    sendvalue = paraName[index]+"="+str;
                }else{
                    sendvalue = sendvalue + "&"+paraName[index]+"="+str;
                }
                index = index + 1;
            }

            let sendvalue_json = JSON.stringify(sendvalue);
            // console.log("sendjson", sendvalue_json)
            //
            // var urlloader:egret.URLLoader = new egret.URLLoader();
            // urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            // var urlreq:egret.URLRequest = new egret.URLRequest();
            // urlreq.url = "//icontinua.com/ftf/minigame/sendData";
            // urlreq.method = egret.URLRequestMethod.GET;
            // urlreq.data =sendvalue_json;
            // urlloader.load( urlreq );
            //
            // urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);

            var request = new egret.HttpRequest();
            request.withCredentials = true;
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("//icontinua.com/ftf/minigame/sendData",egret.HttpMethod.POST);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(sendvalue);
            request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);


        }
    }

    // private onComplete(event:egret.Event):void
    // {
    //     var loader:egret.URLLoader = <egret.URLLoader> event.target;
    //     var data:egret.URLVariables = loader.data;
    //     console.log( data.toString() );
    // }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        SceneMange.getInstance().changeScene("endScene");
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log(event);
        SceneMange.getInstance().changeScene("endScene");
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        SceneMange.getInstance().changeScene("endScene");
    }

}