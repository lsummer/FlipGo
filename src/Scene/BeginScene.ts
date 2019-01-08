
class BeginScene extends egret.Sprite {

    private stageW: number = 0;
    private stageH: number = 0;

    private button: egret.Bitmap;

    public constructor() {
        super();
        this.init();
    }


    // 初始化(给开始按钮绑定点击事件)
    private init(){
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        this.createButtonImage();
        this.createTitle();
    }

    private createTitle(){
        var title: egret.Bitmap = new egret.Bitmap();
        title.texture = RES.getRes("title_png");
        this.addChild(title);
        let image_height = title.height;
        let image_width = title.width;
        title.touchEnabled = true;
        title.width = this.stageW / 2.5;
        title.height = title.width / image_width * image_height;
        title.fillMode = egret.BitmapFillMode.SCALE;
        title.x = this.stageW / 2 - title.width / 2 ;
        title.y = this.stageH / 3 ;
    }

    private createBackGroundImage(){
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0xD3D3E6);
        bg.graphics.drawRect( 0, 0, this.stageW, this.stageH );
        bg.graphics.endFill();
        this.addChild(bg);

        var grade: egret.TextField = new egret.TextField();
        grade.text = "10";
        grade.size = 60;
        grade.fontFamily = "num";
        grade.width = 400;
    }

    private createButtonImage(){
        if(!this.button){
           this.button = new egret.Bitmap()
        }
        this.button.texture = RES.getRes("play_png");
        this.addChild(this.button);
        let image_height = this.button.height;
        let image_width = this.button.width;
        this.button.touchEnabled = true;
        this.button.width = this.stageW / 3;
        this.button.height = this.button.width / image_width * image_height;
        this.button.fillMode = egret.BitmapFillMode.SCALE;
        this.button.x = this.stageW / 2 - this.button.width / 2 ;
        this.button.y = this.stageH / 3 * 2;

        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
    }

    // 移除事件
    public release(){
        if(this.button.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
            this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.UseLee,this);
        }
    }

    private UseLee(){
        console.log("移动触摸事件")
    }

    private tapHandler(){
        var startVoice:egret.Sound = RES.getRes("start_mp3");
        startVoice.play(0,1);
        console.log("跳转到gameScene")
        // 切换场景
        SceneMange.getInstance().changeScene('preGameScene');
    }
}