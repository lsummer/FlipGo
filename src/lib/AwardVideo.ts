class AwardVideo extends egret.Sprite{
    private stageH: number;
    private stageW: number;

    private advertisement: egret.Bitmap;
    private video: egret.Video;

    private intervalDuration:number = 1000; // duration between intervals, in milliseconds
    private timeCount: number = 15;
    private countDownTextField: egret.TextField;
    private intervalID_pro: number;

    private shutdown_map: egret.Bitmap;
    public constructor(name: string){
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;

        this.createAdvertisement(name);
        this.createTimer();
    }

    public pauser(){
        if(this.video){
            this.video.pause();
            console.log("视频播放暂停")
        }
    }

    public player(){
        if(this.video){
            this.video.play();
        }
    }

    public createAdvertisement(name:string){
        // if(!this.advertisement){
        //     this.advertisement = new egret.Bitmap();
        // }
        // this.advertisement.height = this.stageH;
        // this.advertisement.width = this.stageW;
        // this.advertisement.texture = RES.getRes("aikangti_jpg");

        this.createBackGroundImage();
        this.video = new egret.Video();

        this.video.width = this.stageW;                 //设置视频宽
        this.video.height = this.stageW * 9 / 16;                //设置视频高
        this.video.x = 0;                       //设置视频坐标x
        this.video.y = (this.stageH-this.video.height)/2;                       //设置视频坐标y
        this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        this.video.poster = "resource/assets/loading.jpg"; //设置loding图
        this.video.load("resource/video/"+name);
        this.addChild(this.video);              //将视频添加到舞台
        //监听视频加载完成
        this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        //监听视频加载失败
        this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);

    }
    private createBackGroundImage(){
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x808080, 0.9);
        bg.graphics.drawRect( 0, 0, this.stageW, this.stageH );
        bg.graphics.endFill();
        this.addChild(bg);
    }
    private onLoad(e: egret.Event) {
        this.video.play();
    }
    private onLoadErr(e: egret.Event) {
        console.log("video load error happened");
    }

    public createTimer(){
        //创建一个计时器对象
        this.SetIntervalExample();

        if(!this.countDownTextField){
            this.countDownTextField = new egret.TextField();
        }
        this.countDownTextField.text = this.timeCount.toString();
        this.countDownTextField.width = 130;
        this.countDownTextField.height = 60;
        this.countDownTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.countDownTextField.textColor = 0x00ff00;
        this.countDownTextField.bold = true;
        this.countDownTextField.size = 60;
        this.countDownTextField.y = 30;
        this.countDownTextField.x = 15;
        this.addChild(this.countDownTextField);

    }
    public SetIntervalExample() {
        this.intervalID_pro = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
    }

    private myRepeatingFunction(obj:any): void {
        this.timeCount = this.timeCount - 1 ;
        if(this.timeCount >= 0){
            this.countDownTextField.text = this.timeCount.toString();
            this.intervalID_pro = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
            // console.log("id是"+this.intervalID_pro.toString());
        }else{
            egret.clearTimeout(this.intervalID_pro);
            this.video.pause();
            // this.removeChildren();
            // SceneMange.getInstance().changeScene(this.jumpScreen);
        }
    }

    public pauseTimeout(): number{
        egret.clearTimeout(this.intervalID_pro);
        return(this.timeCount);
    }

    public resertTimeout(){
        this.timeCount = 15;
        this.SetIntervalExample();
    }
}