class Progress extends egret.Sprite{

    private stageH: number;
    private stageW: number;

    private QuestionNumber: number = 4; // 游戏开始前问题数量
    private TrainNumber: number = 4;    // 训练游戏的局的数量
    private GameNumber: number = 24;    // 正式实验的游戏局数

    private radius: number = 11; // 圆的半径
    private progreeInstru: string;

    public constructor(pro: string) {
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.progreeInstru = pro;
        this.createProgress();
    }

    public updatePro(pro: string){
        this.progreeInstru = pro;
        this.removeChildren();
        this.createProgress();
    }

    private createProgress() {
        var progress: egret.TextField = new egret.TextField();
        progress.text = "当前进度";
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
        var progress: egret.TextField = new egret.TextField();
        progress.text = this.progreeInstru;
        progress.width = this.stageW;
        progress.textColor = 0x000000;
        progress.size = 25;
        progress.bold = true;
        progress.textAlign = egret.HorizontalAlign.CENTER;
        progress.bold = false;
        progress.y =  90;
        this.addChild(progress);

    }

}