class Banner extends egret.Sprite{
    private stageW: number = 0;
    private stageH: number = 0;
    private banner_name: Array<string>;
    private banner: Array<egret.Bitmap>;
    private circle: Array<egret.Shape>;

    private intervalDuration:number = 1000; // duration between intervals, in milliseconds
    private timeCount: number = 15;
    private intervalID: number;

    private banner_all_name:Array<string> = ["banner_iphoneX_jpg","banner_ofo_jpg","banner_kfc_jpg","banner_pinduoduo_jpg","banner_nike_jpg","banner_starbucks_jpg"];
    private index: number = 0;

    private boxSquenceType: number = 0;   // 表示游戏类型

    public pauseTimeout(): number{
        egret.clearTimeout(this.intervalID);
        return(this.timeCount);
    }

    public constructor(squenceType: number){
        super();
        this.boxSquenceType = squenceType;

        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;

        this.banner_name = this.selectBanner();

        // 得到本局中获得横幅广告的index
        let index = [0,0,0,0,0,0];
        for(let x of this.banner_name){
            index[this.banner_all_name.indexOf(x)] = 1;
        }
        if(SceneMange.gameSceneSetting[this.boxSquenceType].banner){
            // console.log("banner",index);   // 要存储的内容
            SceneMange.uploadMessage[SceneMange.uploadMessage.length-1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].concat(index);
            console.log("push banner 广告出现", index);
        }

        this.banner = [];
        this.circle = [];

        this.createCicle();
        this.createBanner();
        this.createTimer();
    }

    private selectBanner(){
        let select = [];
        let banner = ["banner_iphoneX_jpg","banner_ofo_jpg","banner_kfc_jpg","banner_pinduoduo_jpg","banner_nike_jpg","banner_starbucks_jpg"];
        while(banner.length > 3){
            let rand = Math.floor(Math.random()*banner.length);
            // console.log(banner.splice(rand, 1))
            select =  select.concat(banner.splice(rand, 1));
        }
        return(select);
    }

    private createBanner(){
        var i = 0;
        for(let x of this.banner_name){
            let bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(x);
            bitmap.width = this.stageW;
            bitmap.height = this.stageH / 7;
            bitmap.x = i*this.stageW;
            i++;
            this.banner.push(bitmap);
            this.addChild(bitmap);
        }
        this.circlePoll()
    }
    private createCicle(){
        this.circle = [];
        for(let i=0; i<this.banner.length; i++){
            let shp:egret.Shape = new egret.Shape();
            if(this.index == i){
                shp.graphics.beginFill( 0xDC143C, 1);
            }else{
                shp.graphics.beginFill( 0xDCDCDC, 1);
            }
            shp.graphics.drawCircle( 0, 0, 10 );
            shp.x = this.stageW / 2 + (i-1)*30;
            shp.y = this.stageH / 8 - 30;
            shp.graphics.endFill();
            this.circle.push( shp );
        }
    }

    private createPoll(){
        this.removeChildren();
        for(let x of this.banner){
            x.x = Math.floor(x.x/this.stageW) * this.stageW;
            if(x.x < 0 ){
                x.x = (this.banner.length-1)*this.stageW;
            }
            this.addChild(x);
        }
        // this.addChild(this.banner[this.index]);
        for(let x of this.banner){
            egret.Tween.get(x).to({
                x: x.x - this.stageW,
                y: x.y
            }, 499)
        };
        this.circlePoll();
    }

    private circlePoll(){
        this.createCicle();
        for(let x of this.circle){
            this.addChildAt(x, 20);
        }
        if(this.index < this.banner.length-1 ){
            this.index = this.index + 1;
        }else{
            this.index = 0;
        }
    }

    public createTimer(){
        //创建一个计时器对象
        this.intervalID = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
    }

    private myRepeatingFunction(obj:any): void {
        if(this.timeCount >= 0){
            this.timeCount = this.timeCount - 1 ;
        }else{
            this.timeCount = 15;
            this.createPoll();
        }
        this.intervalID = egret.setTimeout(this.myRepeatingFunction,this,this.intervalDuration);
    }
}