var BlockPool = (function () {
    function BlockPool(squenceType) {
        this.boxPool = [];
        this.boxSourceNames = [];
        this.typeArray = [];
        this.boxSquenceType = 0; // 表示游戏类型--特殊盒子？？？奖励？？
        this.adverBox = ["block5_png", "block6_png", "block7_png", "block8_png", "block9_png", "block10_png"];
        this.boxSquenceType = squenceType;
        this.createBox();
    }
    BlockPool.prototype.updateBoxPool = function (squenceType) {
        this.boxSquenceType = squenceType;
        this.createBox();
    };
    BlockPool.prototype.getSquenceType = function () {
        return this.boxSquenceType;
    };
    BlockPool.prototype.getTypeArray = function () {
        return this.typeArray;
    };
    BlockPool.prototype.isAdvertisement = function (type) {
        if (type <= SceneMange.gameSceneSetting[this.boxSquenceType].judge) {
            return false;
        }
        else {
            return true;
        }
    };
    BlockPool.prototype.getSingleBoxByType = function (type) {
        for (var _i = 0, _a = this.boxPool; _i < _a.length; _i++) {
            var box = _a[_i];
            if (box.type == type) {
                return box;
            }
        }
        return null;
    };
    BlockPool.prototype.selectAdv = function () {
        var select = [];
        var adv = ["block5_png", "block6_png", "block7_png", "block8_png", "block9_png", "block10_png"];
        while (adv.length > 3) {
            var rand = Math.floor(Math.random() * adv.length);
            // console.log(banner.splice(rand, 1))
            select = select.concat(adv.splice(rand, 1));
        }
        return (select);
    };
    BlockPool.prototype.createBox = function () {
        // this.boxSourceNames = ["block1_png", "block2_png", "block3_png", "block4_png", "block5_png", "block6_png","block7_png"];
        if (!SceneMange.gameSceneSetting[this.boxSquenceType].specialBox) {
            this.boxSourceNames = ["block2_png", "block3_png", "block4_png", "block1_png", "block2_png", "block3_png", "block1_png"];
        }
        else {
            this.boxSourceNames = ["block2_png", "block4_png", "block3_png", "block1_png", "block3_png", "block4_png"];
            var sele = this.selectAdv();
            this.boxSourceNames = this.boxSourceNames.concat(sele);
            // 得到本局中获得广告盒子的index
            var index = [0, 0, 0, 0, 0, 0];
            for (var _i = 0, sele_1 = sele; _i < sele_1.length; _i++) {
                var x = sele_1[_i];
                index[this.adverBox.indexOf(x)] = 1;
            }
            SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1] = SceneMange.uploadMessage[SceneMange.uploadMessage.length - 1].concat(index);
            console.log("push block 广告出现", index);
        }
        this.boxPool = [];
        this.typeArray = [];
        var type = 0;
        for (var _a = 0, _b = this.boxSourceNames; _a < _b.length; _a++) {
            var name = _b[_a];
            var img = new egret.Bitmap();
            img.texture = RES.getRes(name);
            img.anchorOffsetX = 222;
            img.anchorOffsetY = 78;
            var block = new Block(type, img);
            this.boxPool.push(block);
            this.typeArray.push(type);
            type++;
        }
    };
    return BlockPool;
}());
