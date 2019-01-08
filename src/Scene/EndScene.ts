class EndScene extends egret.Sprite {

    private stageW: number;
    private stageH: number;

    public constructor(){
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        this.createWelcome();
        // this.beginButton();
    }

    private createWelcome(){
        var textF: egret.TextField = new egret.TextField();
        textF.text = "致谢";
        textF.width = this.stageW - 20;
        textF.textColor = 0x000000;
        textF.bold = true;
        textF.x = 10;
        textF.size = 40;
        textF.textAlign = egret.HorizontalAlign.CENTER;
        textF.y = 40;

        var textLittle: egret.TextField = new egret.TextField();
        textLittle.text = "感谢您参与IGA实验";
        textLittle.width = this.stageW - 20;
        textLittle.textColor = 0x000000;
        textLittle.size = 20;
        textLittle.bold = false;
        textLittle.x = 10;
        textLittle.textAlign = egret.HorizontalAlign.CENTER;
        textLittle.y = textF.y + 60;

        var show1: egret.TextField = new egret.TextField();
        show1.text = "请您接受实验人员的采访";
        show1.width = this.stageW ;
        show1.textColor = 0x000000;
        show1.size = 40;
        show1.bold = true;
        show1.textAlign = egret.HorizontalAlign.CENTER;
        show1.x = 0;
        show1.y = this.stageH / 2.5;


        this.addChild(textF);
        this.addChild(textLittle);
        this.addChild(show1);


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
        var progere: TransferScreen = new TransferScreen("预实验", "开始 2 组预实验", "beginScene");
        this.addChild(progere);
    }
}