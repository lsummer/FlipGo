class TimeDown extends egret.Sprite{

    private stageH: number;
    private stageW: number;

    private timeCount: number = 120;
    private countDownTextField: egret.TextField;


    public constructor(countnumber: number){
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.timeCount = countnumber;
        this.createTimer();
    }

    public createTimer(){
        //创建一个计时器对象
        // this.SetIntervalExample();

        var countdown: egret.TextField = new egret.TextField();
        countdown.text = "剩余时间"
        countdown.size = 17;
        countdown.textAlign = egret.HorizontalAlign.CENTER;
        countdown.y = 10;
        countdown.width = this.stageW;
        countdown.textColor = 0x000000;
        this.addChild(countdown);

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 4, 0x2E8B57 );
        shp.graphics.beginFill( 0xDCDCDC, 1);
        shp.graphics.drawCircle( 0, 0, 30 );
        shp.graphics.endFill();
        shp.x = this.stageW / 2 ;
        shp.y = countdown.y + 60;
        this.addChild( shp );

        if(!this.countDownTextField){
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = this.stageW;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x000000;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 30;
        this.countDownTextField.y = shp.y - 15;
        this.addChild(this.countDownTextField);

        // this.SetIntervalExample();
    }

    public updateTimeCount(timecount: number){
        this.timeCount = timecount;
        this.countDownTextField.text = this.timeCount.toString();
    }
}