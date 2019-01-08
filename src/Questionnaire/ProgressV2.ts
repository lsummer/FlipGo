class ProgressV2 extends egret.Sprite{

    private stageH: number;
    private stageW: number;

    private QuestionNumber: number = 4; // 游戏开始前问题数量
    private TrainNumber: number = 4;    // 训练游戏的局的数量
    private GameNumber: number = 24;    // 正式实验的游戏局数

    private radius: number = 11; // 圆的半径
    private pro: number;

    public constructor(pro: number) {
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.pro = pro;
        this.createProgress();
    }

    public updatePro(pro: number){
        this.pro = pro;
        this.removeChildren();
        this.createProgress();
    }

    private createProgress() {
        var progress: egret.TextField = new egret.TextField();
        progress.text = "进度条";
        progress.width = this.stageW;
        progress.textColor = 0x000000;
        progress.size = 20;
        progress.textAlign = egret.HorizontalAlign.CENTER;
        progress.bold = false;
        progress.y =  50;
        this.addChild(progress);

        this.createCircle();
    }

    private createCircle() {
        let y = 100;
        var line: egret.Shape = new egret.Shape();
        line.graphics.lineStyle(4, 0xCDC673);
        line.graphics.moveTo(0, y);
        line.graphics.lineTo(this.stageW, y);
        line.graphics.endFill();
        this.addChild(line);

        for(let i=0; i<2; i++){
            var shp:egret.Shape = new egret.Shape();
            if(this.pro <= this.QuestionNumber ){
                shp.graphics.lineStyle( 4, 0x8B814C );
            }
            else{
                shp.graphics.lineStyle( 4, 0xBDB76B );
            }
            shp.graphics.beginFill( 0xDCDCDC, 1);
            shp.graphics.drawCircle( 0, 0, this.radius );
            shp.graphics.endFill();
            shp.x = 50 + i * 50;
            shp.y = y;
            this.addChild( shp );
        }

        for(let i=0; i<2; i++){
            var shp:egret.Shape = new egret.Shape();
            if(this.pro > this.QuestionNumber && this.pro <= this.TrainNumber + this.QuestionNumber){
                shp.graphics.lineStyle( 4, 0x8B814C );
            }else{
                shp.graphics.lineStyle( 4, 0xBDB76B );
            }
            shp.graphics.beginFill( 0xDCDCDC, 1);
            shp.graphics.drawCircle( 0, 0, this.radius );
            shp.graphics.endFill();
            shp.x = 200 + i * 50;
            shp.y = y;
            this.addChild( shp );
        }

        for(let i=0; i<6; i++){
            var shp:egret.Shape = new egret.Shape();
            if(this.pro > this.TrainNumber + this.QuestionNumber){
                shp.graphics.lineStyle( 4, 0x8B814C );
            }else{
                shp.graphics.lineStyle( 4, 0xBDB76B );
            }
            shp.graphics.beginFill( 0xDCDCDC, 1);
            shp.graphics.drawCircle( 0, 0, this.radius );
            shp.graphics.endFill();
            shp.x = 350 + i * 50;
            shp.y = y;
            this.addChild( shp );
        }

        this.createCirecleProgress();
    }

    private createCirecleProgress(){
        let y = 100;
        if(this.pro <= this.QuestionNumber ){
            for(let i=0; i<this.pro; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x8B814C );
                shp.graphics.drawArc(50 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }
        } else if(this.pro > this.QuestionNumber && this.pro <= this.TrainNumber + this.QuestionNumber){
            for(let i=0; i<this.QuestionNumber; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0xBDB76B );
                shp.graphics.drawArc(50 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }
            for(let i=0; i< this.pro-this.QuestionNumber; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x8B814C );
                shp.graphics.drawArc(200 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }

        } else{
            for(let i=0; i<this.QuestionNumber; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0xBDB76B );
                shp.graphics.drawArc(50 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }
            for(let i=0; i< this.TrainNumber; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0xBDB76B );
                shp.graphics.drawArc(200 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }
            for(let i=0; i<this.pro-this.QuestionNumber-this.TrainNumber; i++){
                var shp:egret.Shape = new egret.Shape();
                shp.graphics.beginFill( 0x8B814C );
                shp.graphics.drawArc(350 + Math.floor(i/2)*50, y, this.radius,Math.PI/2, 3/2 * Math.PI,i%2==0?false:true);
                shp.graphics.endFill();
                this.addChild( shp );
            }
        }
    }
}