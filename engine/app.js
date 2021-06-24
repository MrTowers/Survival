//document.body.innerHTML = '<progress id="p1" max="1" min="0"></progress>';

const app = {
    fps: 60,
    timescale: 1,
    delta: 0,
    camera: {
        zoom: 16,
        renderDist: 500
    },
    //currentChunk: [0,1],
    objectsSize: 50,
    render: () => {
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight - 4;
        ctx.imageSmoothingEnabled = false;
        let camera = app.camera;
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        for (let r = 0; r < app.map.acctilemap.length; r++) {
            let object = app.map.acctilemap[r];
            if (object.visible && inRange(object.pos.x, player.pos.x - app.camera.renderDist, player.pos.x + app.camera.renderDist) && inRange(object.pos.y, player.pos.y - app.camera.renderDist, player.pos.y + app.camera.renderDist)) {
                //to jest zaznaczanie obiektow pod myszka - do poprawy a aktualnie wylaczone
                /*if (inRange((object.pos.x - (object.sizex * app.objectsSize)) + (canvas.clientWidth / 2) - player.pos.x, controls.mousepos.x - app.objectsSize, controls.mousepos.x + app.objectsSize) && inRange((object.pos.y - (object.sizey * app.objectsSize)) + (canvas.clientHeight / 2) - player.pos.y, controls.mousepos.y - app.objectsSize, controls.mousepos.y + app.objectsSize)) {
                    ctx.drawImage(app.assets.loaded.img[object.textureHover], (object.pos.x - (object.sizex * app.objectsSize)) + (canvas.clientWidth / 2) - player.pos.x, (object.pos.y - (object.sizey * app.objectsSize)) + (canvas.clientHeight / 2) - player.pos.y, app.objectsSize * object.sizex, app.objectsSize * object.sizey);
                }
                else {*/
                object.onrender();
                ctx.drawImage(app.assets.loaded.img[object.texture], (object.pos.x - (object.sizex * app.objectsSize)) + (canvas.clientWidth / 2) - player.pos.x, (object.pos.y - (object.sizey * app.objectsSize)) + (canvas.clientHeight / 2) - player.pos.y, app.objectsSize * object.sizex, app.objectsSize * object.sizey);
                //}
            }
        }
        ctx.drawImage(app.assets.loaded.img[player.texture.head], (canvas.clientWidth / 2) - (app.objectsSize / 2), (canvas.clientHeight / 2) - (app.objectsSize / 2), app.objectsSize, app.objectsSize);
        ctx.drawImage(app.assets.loaded.img[player.texture.body], (canvas.clientWidth / 2) - (app.objectsSize / 2), (canvas.clientHeight / 2) - (app.objectsSize / 2), app.objectsSize, app.objectsSize);
        ctx.fillStyle = `rgba(255, 255, 255, 0.75)`;
        ctx.fillText(`bloków symulowanych: ${app.map.acctilemap.length}`, 50, 50);
        
        fps++;
    },
    physicsrender: () => {
        player.tick();
        app.objectsTick();
        app.render();
        setTimeout(app.physicsrender, 1000 / app.fps);
    },
    objectsTick: () => {
            for (let j = 0; j < app.map.acctilemap.length; j++) {
                let object = app.map.acctilemap[j];
                if (inRange(object.pos.x, player.pos.x - app.physicsRange, player.pos.x + app.physicsRange) && inRange(object.pos.y, player.pos.y - app.physicsRange, player.pos.y + app.physicsRange)) {
                    object.tick();
                }
            }
    },
    physicsRange: 10000,
    init: () => {
        app.assets.load.img();
        resize();
        //app.map.dynamicChunkRefresh();
    },
    assets: {
        toload: {
            img: [
                "test", //0
                "postac/body1", //1
                "trawa", //2
                "drzewo", //3
                "postac/glowa1", //4
                "postac/body1b", //5
                "postac/body1c", //6
                "kamien", //7
                "kamien_h", //8
                "drzewob", //9
            ],
            audio: [

            ]
        },
        load: {
            loadid: 0,
            img: () => {
                let image = new Image();
                image.addEventListener("load", () => {
                    setTimeout(() => {
                        app.assets.load.loadid++;
                        app.assets.loaded.img.push(image);
                        if (app.assets.load.loadid >= app.assets.toload.img.length) {
                            app.assets.load.loadid = 0;
                            app.assets.load.audio();
                        }
                        else {
                            app.assets.load.img();
                            //document.getElementById("p1").value = app.assets.load.loadid / app.assets.toload.img.length;
                        }
                    }, 100);
                });
                image.src = `./img/${app.assets.toload.img[app.assets.load.loadid]}.png`;
            },
            audio: () => {

                app.assets.loadend();
            }
        },
        loaded: {
            img: [],
            audio: []
        },
        loadend: () => {
            console.log("load ended");
            //document.body.innerHTML = '<canvas id="canvas" class="canvas"></canvas>';
            app.map.mapGenerate();
            app.physicsrender();

        },
        img: []
    },
    map: {
        tilemap: [],
        acctilemap: [],
        size: 200,
        generetableObjects: [],
        mapGenerate: () => {
            for (let i = -app.map.size; i < app.map.size; i++) {
                for (let j = -app.map.size; j < app.map.size; j++) {
                    let obj = app.map.programmedObjects(0);
                    obj.pos.x = i * app.objectsSize;
                    obj.pos.y = j * app.objectsSize;
                    app.map.tilemap.push(obj);
                }
            }

            for (let i = -app.map.size; i < app.map.size; i++) {
                for (let j = -app.map.size; j < app.map.size; j++) {
                    if (randomMinMax(0, 100) < 10) {
                        let obj = app.map.programmedObjects(1);
                        obj.pos.x = i * app.objectsSize;
                        obj.pos.y = j * app.objectsSize;
                        app.map.tilemap.push(obj);
                    }
                    else if (randomMinMax(0, 100) < 2) {
                        let obj = app.map.programmedObjects(2);
                        obj.pos.x = i * app.objectsSize;
                        obj.pos.y = j * app.objectsSize;
                        app.map.tilemap.push(obj);
                    }
                }
            }
            app.map.dynamicChunkRefresh();
        },
        //dorobic zeby odpalalo sie za kazdym razem jak sie skonczy - dynamicChunkRefresh
        dynamicChunkRefresh: async () => {
            console.log("starting refreshing");
            for (let i = 0; i < app.map.tilemap.length; i++) {
                for (let j = 0; j < 10000; j++) {
                    let object = app.map.tilemap[(i * 10000) + j];
                    if (object) {
                        if (inRange(object.pos.x, player.pos.x - app.camera.renderDist, player.pos.x + app.camera.renderDist) && inRange(object.pos.y, player.pos.y - app.camera.renderDist, player.pos.y + app.camera.renderDist)) {
                            if (!object.inChunk) {
                                app.map.acctilemap.push(object);
                                object.inChunk = true;
                            }
                        }
                        else if (object.inChunk) {
                            let objInArray = app.map.acctilemap.indexOf(object);
                            app.map.acctilemap.splice(objInArray, 1);
                            object.inChunk = false;
                        }
                    }
                    if ((i*10000) + j == app.map.tilemap.length - 1) {
                        app.map.dynamicChunkRefresh();
                    }
                }
                await wait();
                app.map.acctilemap.sort(sortAlg);
                
            }
        },
        constObjects: [

        ],
        programmedObjects: (id) => {
            if (id == 0) {
                let object = new shObject("testobj");
                object.texture = 2;
                object.textureHover = 2;

                return object;
            }
            if (id == 1) {
                let object = new shObject("tree", 0, 0, 3, 3, 1, 0, 1, true, 3, 1);

                object.animation = new shAnimation("leaves", [3, 9], 0.05);
                object.animation.play();

                object.onrender = () => {
                    object.animation.tick();
                    object.texture = object.animation.texture;
                }

                return object;
            }
            if (id == 2) {
                let object = new shObject("rock", 0, 0, 7, 1, 1, 0, 1, true, 1, 1, 8);
                object.textureHover = 8;

                return object;
            }
        },
        chunks: []
    }
}