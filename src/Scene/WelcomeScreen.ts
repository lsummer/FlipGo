class WelcomeScreen extends egret.Sprite {

    private stageW: number;
    private stageH: number;


    public constructor(){
        super();
        console.log("执行")
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        this.createWelcome();
        this.beginButton();
    }

    private createWelcome(){
        var textF: egret.TextField = new egret.TextField();
        textF.text = "Welcome";
        textF.width = this.stageW - 20;
        textF.textColor = 0x000000;
        textF.bold = true;
        textF.x = 10;
        textF.size = 40;
        textF.textAlign = egret.HorizontalAlign.CENTER;
        textF.y = 40;

        var textLittle: egret.TextField = new egret.TextField();
        textLittle.text = "感谢参与IGA实验,请认真阅读下面的 tip";
        textLittle.width = this.stageW - 20;
        textLittle.textColor = 0x000000;
        textLittle.size = 20;
        textLittle.bold = false;
        textLittle.x = 10;
        textLittle.textAlign = egret.HorizontalAlign.CENTER;
        textLittle.y = textF.y + 60;

        var tip:egret.TextField = new egret.TextField();
        tip.text = "tip";
        tip.textColor = 0x8B814C;
        tip.width = this.stageW /2;
        tip.size = 30;
        tip.x = this.stageW /2;
        tip.bold = false;
        tip.y = textLittle.y + this.stageH/7;
        tip.textAlign = egret.HorizontalAlign.LEFT;

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 4, 0x8B814C );
        shp.graphics.beginFill( 0x7FFF00, 1);
        shp.graphics.drawCircle( this.stageW / 2 - 15, tip.y + tip.height/2, 11 );
        shp.graphics.endFill();

        this.addChild( shp );

        var show1: egret.TextField = new egret.TextField();
        show1.text = "1、请您关闭手机，保持实验过程的专注；\n";
        show1.width = this.stageW ;
        show1.textColor = 0x000000;
        show1.size = 20;
        show1.bold = false;
        show1.x = this.stageW / 10;
        show1.y = tip.y + 60;

        var show155: egret.TextField = new egret.TextField();
        show155.text = "2、刚开始，您会进行30s玩法体验；\n";
        show155.width = this.stageW ;
        show155.textColor = 0x000000;
        show155.size = 20;
        show155.bold = false;
        show155.x = this.stageW / 10;
        show155.y = show1.y + 60;

        var show15: egret.TextField = new egret.TextField();
        show15.text = "3、整个实验过程大概耗时30-40分钟。\n";
        show15.width = this.stageW ;
        show15.textColor = 0x000000;
        show15.size = 20;
        show15.bold = false;
        show15.x = this.stageW / 10;
        show15.y = show155.y + 60;

        // var show15: egret.TextField = new egret.TextField();
        // show15.text = "3、实验第1部分，您将先进行 1 局预实验，以熟悉实验流程；\n";
        // show15.width = this.stageW ;
        // show15.textColor = 0x000000;
        // show15.size = 20;
        // show15.bold = false;
        // show15.x = this.stageW / 10;
        // show15.y = show155.y + 60;
        //
        // var show2: egret.TextField = new egret.TextField();
        // show2.text = "4、实验第2部分，您将进行 2 组（6局/组-90秒/局）正式实验；\n";
        // show2.width = this.stageW ;
        // show2.textColor = 0x000000;
        // show2.size = 20;
        // show2.bold = false;
        // show2.x = this.stageW / 10;
        // show2.y = show15.y + 60;
        //
        // var show3: egret.TextField = new egret.TextField();
        // show3.text = "5、实验第3部分，您需要回答一些基础问题；\n";
        // show3.width = this.stageW ;
        // show3.textColor = 0x000000;
        // show3.size = 20;
        // show3.bold = false;
        // show3.x = this.stageW / 10;
        // show3.y = show2.y + 60;
        //
        // var show4: egret.TextField = new egret.TextField();
        // show4.text = "6、最后，您需要回答实验人员的几个问题。\n";
        // show4.width = this.stageW;
        // show4.textColor = 0x000000;
        // show4.size = 20;
        // show4.bold = false;
        // show4.x = this.stageW / 10;
        // show4.y = show3.y + 60;
        //
        // var show5: egret.TextField = new egret.TextField();
        // show5.text = "7、整个实验过程大概耗时30-40分钟。\n";
        // show5.width = this.stageW;
        // show5.textColor = 0x000000;
        // show5.size = 20;
        // show5.bold = false;
        // show5.x = this.stageW / 10;
        // show5.y = show4.y + 60;

        this.addChild(textF);
        this.addChild(textLittle);
        this.addChild(tip);
        this.addChild(shp);
        this.addChild(show1);
        this.addChild(show155);
        this.addChild(show15);
        // this.addChild(show2);
        // this.addChild(show3);
        // this.addChild(show4);
        // this.addChild(show5);
    }

    private createBackGroundImage(){
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xDCDCDC); //0xE6E6FA
        bg.graphics.drawRect( 0, 0, this.stageW, this.stageH );
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private beginButton(){
        var beginB: egret.Bitmap = new egret.Bitmap();
        beginB.texture = RES.getRes("button_png");
        beginB.width = beginB.width / 2;
        beginB.height = beginB.height / 2;
        beginB.x = this.stageW / 2 - beginB.width / 2;
        beginB.y = this.stageH - beginB.height - 200;

        var textInButton: egret.TextField = new  egret.TextField();
        textInButton.text = "我已阅读，开始"
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


    private beginButtonTap(evt:egret.Event){
        console.log("开始5s倒计时");
        this.removeChildren();
        this.createTimeScreen();
    }

    private createTimeScreen(){
        this.createBackGroundImage();
        var progere: TransferScreen = new TransferScreen("第 1/3 部分 - 预实验", "试玩 30 秒", "preGameScene");
        this.addChild(progere);
    }

}