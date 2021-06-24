const player = {
    hp: 100,
    food: 100,
    water: 100,
    pos: {
        x: 0,
        y: 0
    },
    clothes: {
        head: {
            all: [[4, 4, 4, 4]],
            wear: 0
        },
        body: {
            all: [[1, 5, 1, 6]],
            wear: 0
        }
    },
    texture: {
        head: 4,
        body: 1
    },
    animation: new shAnimation("walking", [1,5,1,6], 0.1),
    walkspeed: 4,
    walking: 0,
    tick: () => {
        if (controls.w) {
            player.pos.y -= player.walkspeed;
        }
        if (controls.a) {
            player.pos.x -= player.walkspeed;
        }
        if (controls.d) {
            player.pos.x += player.walkspeed;
        }
        if (controls.s) {
            player.pos.y += player.walkspeed;
        }
        player.texture.body = player.animation.texture;
        if (controls.w || controls.a || controls.s || controls.d) {
            player.animation.play();
        }
        else {
            player.animation.stop();
            player.animation.reset();
        }
    }
}