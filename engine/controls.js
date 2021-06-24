const controls = {
    w: false,
    a: false,
    s: false,
    d: false,
    mousepos: {
        x: 0,
        y: 0
    },
    init: () => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "w") {
                controls.w = true;
            }

            if (e.key == "a") {
                controls.a = true;
            }

            if (e.key == "s") {
                controls.s = true;
            }

            if (e.key == "d") {
                controls.d = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.key == "w") {
                controls.w = false;
            }

            if (e.key == "a") {
                controls.a = false;
            }

            if (e.key == "s") {
                controls.s = false;
            }

            if (e.key == "d") {
                controls.d = false;
            }
        });

        document.addEventListener("mousemove", (e) => {
            controls.mousepos = { x: e.offsetX, y: e.offsetY };
        });
    }
}