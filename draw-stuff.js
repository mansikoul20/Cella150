// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.

let ruleset = [1, 0, 0, 1, 0, 1, 1, 0];
let stateArray = [];

function draw_rect(ctx, stroke, fill) {
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    //ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

// =====================================================  draw_grid ====
function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
    rctx.save();
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for (var ix = 0; ix < width; ix += rminor) {
        rctx.beginPath();
        rctx.moveTo(ix, 0);
        rctx.lineTo(ix, height);
        rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (ix % rmajor == 0) { rctx.fillText(ix, ix, 10); }
    }
    for (var iy = 0; iy < height; iy += rminor) {
        rctx.beginPath();
        rctx.moveTo(0, iy);
        rctx.lineTo(width, iy);
        rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (iy % rmajor == 0) { rctx.fillText(iy, 0, iy + 10); }
    }
    rctx.restore();
}

function initializeStateArray() {
    for (i = 0; i < 40; i++) {
        stateArray[i] = new Array(40);
    }

    for (i = 0; i < 40; i++) {
        for (j = 0; j < 40; j++) {
            stateArray[i][j] = 0;
        }
    }
}

function changeStateArray(context, i, j) {
    stateArray[i][j] = 1;
    console.log(i + " " + j)
    context.fillStyle = 'black';
    setTimeout(() => {
        context.fillRect(10 * j, 10 * i, 10, 10)
    }, 1000)
}

function nextGeneration() {
    for (i = 1; i < 40; i++) {
        generate(i);
    }
    console.log(stateArray);
}

function generate(i) {
    for (j = 0; j < 40; j++) {
        let a = 0, b = 0, c = 0;
        if (j == 0) {
            b = stateArray[i - 1][j];
            c = stateArray[i - 1][j + 1];
        } else if (j == 39) {
            a = stateArray[i - 1][j - 1];
            b = stateArray[i - 1][j];
        } else {
            a = stateArray[i - 1][j - 1];
            b = stateArray[i - 1][j];
            c = stateArray[i - 1][j + 1];
        }

        if (checkRules(a, b, c) == 1) {
            context.fillRect(10 * j, 10 * i, 10, 10);
            stateArray[i][j] = 1;
        }
    }
}

function checkRules(a, b, c) {
    if (a == 0 && b == 1 && c == 0) {
        return 1;
    }
    if (a == 1 && b == 1 && c == 1) {
        return 1;

    }
    if (a == 1 && b == 0 && c == 0) {
        return 1;

    };
    if (a == 0 && b == 0 && c == 1) {
        return 1;
    };
    return 0;
}


