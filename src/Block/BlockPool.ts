class BlockPool{
    private boxPool: Array<Block> = [];
    private boxSourceNames: Array<string> = [];
    private typeArray: Array<number> = [];

    private boxSquenceType: number = 0;   // 表示游戏类型--特殊盒子？？？奖励？？

    private adverBox: Array<string> = ["block5_png",  "block6_png", "block7_png", "block8_png", "block9_png",  "block10_png"];

    public constructor(squenceType: number){
        this.boxSquenceType = squenceType;
        this.createBox();
    }

    public updateBoxPool(squenceType: number){
        this.boxSquenceType = squenceType;
        this.createBox();
    }

    public getSquenceType():number{
        return this.boxSquenceType;
    }

    public getTypeArray(): Array<number>{
        return this.typeArray;
    }

    public isAdvertisement(type: number): boolean{
        if(type <= SceneMange.gameSceneSetting[this.boxSquenceType].judge){   //在这里设置是不是广告
            return false;
        } else{
            return true;
        }
    }

    public getSingleBoxByType(type: number): Block {
        for(var box of this.boxPool){
            if(box.type == type){
                return box;
            }
        }
        return null;
    }

    private selectAdv(){
        let select = [];
        let adv = ["block5_png",  "block6_png", "block7_png", "block8_png", "block9_png",  "block10_png"];
        while(adv.length > 3){
            let rand = Math.floor(Math.random()*adv.length);
            // console.log(banner.splice(rand, 1))
            select =  select.concat(adv.splice(rand, 1));
        }
        return(select);
    }

    private createBox() {
         // this.boxSourceNames = ["block1_png", "block2_png", "block3_png", "block4_png", "block5_png", "block6_png","block7_png"];
        if(!SceneMange.gameSceneSetting[this.boxSquenceType].specialBox){
            this.boxSourceNames = ["block2_png", "block3_png", "block4_png", "block1_png", "block2_png", "block3_png", "block1_png"];
        }else{
            this.boxSourceNames = ["block2_png", "block4_png", "block3_png", "block1_png", "block3_png", "block4_png"];
            var sele = this.selectAdv();
            this.boxSourceNames = this.boxSourceNames.concat(sele);

            // 得到本局中获得广告盒子的index
            let index = [0,0,0,0,0,0];
            for(let x of sele){
                index[this.adverBox.indexOf(x)] = 1;
            }

            SceneMange.uploadMessage[SceneMange.uploadMessage.length-1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length-1].concat(index);
            console.log("push block 广告出现", index);
        }

        this.boxPool = [];
        this.typeArray = [];
        var type: number = 0;

        for(var name of this.boxSourceNames){
            var img: egret.Bitmap = new egret.Bitmap();
            img.texture = RES.getRes(name);
            img.anchorOffsetX = 222;
            img.anchorOffsetY = 78;
            var block = new Block(type, img);
            this.boxPool.push(block);
            this.typeArray.push(type);
            type ++;
        }
    }

}