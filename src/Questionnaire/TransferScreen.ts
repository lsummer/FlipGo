class TransferScreen extends egret.Sprite{

    private stageH: number;
    private stageW: number;

    private QuestionNumber: number = 4; // 游戏开始前问题数量
    private TrainNumber: number = 4;    // 训练游戏的局的数量
    private GameNumber: number = 24;    // 正式实验的游戏局数

    private intervalDuration:number = 1000; // duration between intervals, in milliseconds
    private timeCount: number = 5;
    private countDownTextField: egret.TextField;
    private intervalID: number;

    private jumpScreen: string;

    private radius: number = 11; // 圆的半径
    public constructor(pro: string, discribe: string, jumpsceen: string) {
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;

        this.jumpScreen = jumpsceen;
        // this.createProgress(pro);
        // var progre: Progress = new Progress(pro);
        // this.addChild(progre);

        this.createMainFrame(discribe);
        this.createTimer();
    }

    private createMainFrame(discribe: string){
        var next: egret.TextField = new egret.TextField();
        next.text = "接下来,您将...";
        next.width = this.stageW;
        next.textColor = 0x000000;
        next.size = 20;
        next.textAlign = egret.HorizontalAlign.CENTER;
        next.bold = false;
        next.y =  this.stageH / 4;

        var instrustion:string = discribe;
        var insru: egret.TextField = new egret.TextField();
        insru.text = instrustion;
        insru.width = this.stageW ;
        insru.textColor = 0x000000;
        insru.size = 30;
        insru.textAlign = egret.HorizontalAlign.CENTER;
        insru.bold = false;
        insru.y = next.y + 60;
        this.addChild(next);
        this.addChild(insru);

        if(discribe == "开始 2 组正式实验"){
            var instrustion:string = "每组 6 局";
            var insru_: egret.TextField = new egret.TextField();
            insru_.text = instrustion;
            insru_.width = this.stageW ;
            insru_.textColor = 0x000000;
            insru_.size = 25;
            insru_.textAlign = egret.HorizontalAlign.CENTER;
            insru_.bold = false;
            insru_.y = insru.y + 60;
            this.addChild(insru_);
        }
    }

    public createTimer(){
        //创建一个计时器对象
        this.SetIntervalExample();

        var countdown: egret.TextField = new egret.TextField();
        countdown.text = "开始倒计时"
        countdown.size = 15;
        countdown.textAlign = egret.HorizontalAlign.CENTER;
        countdown.y = this.stageH/2 - 80;
        countdown.width = this.stageW;
        countdown.textColor = 0x000000;
        this.addChild(countdown);

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 4, 0x8B814C );
        shp.graphics.beginFill( 0xDCDCDC, 1);
        shp.graphics.drawCircle( this.stageW/2, this.stageH/2, 40 );
        shp.graphics.endFill();
        this.addChild( shp );

        if(!this.countDownTextField){
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = this.stageW;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x000000;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 40;
        this.countDownTextField.y = this.stageH/2-20;
        this.addChild(this.countDownTextField);
    }
    public SetIntervalExample() {
        this.intervalID = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
    }

    private myRepeatingFunction(obj:any): void {
        this.timeCount = this.timeCount - 1 ;
        if(this.timeCount >= 0){
            this.countDownTextField.text = this.timeCount.toString();
            this.intervalID = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
        }else{
            egret.clearInterval(this.intervalID);
            console.log("清楚了计时")
            this.removeChildren();
            SceneMange.getInstance().changeScene(this.jumpScreen);
        }
    }
}