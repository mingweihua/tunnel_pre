class Model_operation {
    static separation(group, h) {
        //controls.maxPolarAngle = Math.PI;
        for (var i = 1; i <= 9; i++) {
            if (group.getObjectByName(i) != undefined) {
                tween = new TWEEN.Tween(group.getObjectByName(i).position)
                    .to({y: (9-i) * h}, 100)
                    .onUpdate(function () {
                        //console.log(this.y);
                    });
            }
            tween.start();
        }

        if (group.getObjectByName('line1') != undefined) {
            tween = new TWEEN.Tween(group.getObjectByName('line1').position)
                .to({y: (9-5) * h}, 100)
                .onUpdate(function () {
                    //console.log(this.y);
                });
        }
        tween.start();
        if (group.getObjectByName('line2') != undefined) {
            tween = new TWEEN.Tween(group.getObjectByName('line2').position)
                .to({y: (9-5) * h}, 100)
                .onUpdate(function () {
                    //console.log(this.y);
                });
        }
        tween.start();
    }

    static separation_reset(group){
        geoSeparation_h = 0;
        this.separation(group,0);
    }

    static showSingleGeo(group,name,isShow){
        group.getObjectByName(name).visible = isShow;
    }
}