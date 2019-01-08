class Popup extends egret.Sprite{

    private stageH: number;
    private stageW: number;

    private advertisement: egret.Bitmap;

    public constructor(pop_name){
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.createBackGroundImage();
        this.createAdvertisement(pop_name);
    }

    public createAdvertisement(pop_name: string){
        if(!this.advertisement){
            this.advertisement = new egret.Bitmap();
        }
        this.advertisement.texture = RES.getRes(pop_name);
        let scaleX = this.stageW / this.advertisement.width;
        this.advertisement.width = this.stageW;
        this.advertisement.height = scaleX * this.advertisement.height;
        this.advertisement.y = this.stageH/2 - this.advertisement.height/2;
        this.addChild(this.advertisement);
    }

    private createBackGroundImage(){
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.clear();
        bg.graphics.beginFill(0x808080, 0.6);
        bg.graphics.drawRect( 0, 0, this.stageW, this.stageH );
        bg.graphics.endFill();
        this.addChild(bg);
    }

}