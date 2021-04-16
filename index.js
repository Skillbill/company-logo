const width = 800;
const height = 800;
const color1 = '#003365';
const color2 = '#fb6703';
const canvas = document.getElementById("canvas");

paper.setup(canvas);

const piece = (path, fillColor, rototranslation) => {
    const matrix = new paper.Matrix();
    matrix.translate(rototranslation.tx, rototranslation.ty);
    matrix.scale(rototranslation.sx, rototranslation.sy);
    const newPath = path.clone();
    newPath.fillColor = fillColor;
    newPath.transform(matrix);
    return newPath;
}

let path;
let eye;
let voice;
let playVsPause = false;
let playInterval;
let animationIndex = 0;
let steps = [];

steps.push(() => {
    path = new paper.Path({
        closed: true,
        fullySelected: true
    });
    path.add(new paper.Point(22, 30));
});
steps.push(() => path.add(new paper.Point(110, 32)));
steps.push(() => path.curveTo(new paper.Point(175, 60), new paper.Point(200, 120)));
steps.push(() => path.add(new paper.Point(200, 280)));
steps.push(() => path.curveTo(new paper.Point(230, 340), new paper.Point(300, 372)));
steps.push(() => path.add(new paper.Point(300, 400)));
steps.push(() => path.add(new paper.Point(195, 400)));
steps.push(() => path.curveTo(new paper.Point(145, 360), new paper.Point(125, 300)));
steps.push(() => path.add(new paper.Point(125, 135)));
steps.push(() => path.curveTo(new paper.Point(115, 115), new paper.Point(90, 105)));
steps.push(() => path.add(new paper.Point(22, 105)));
steps.push(() => path.fillColor = color1);
steps.push(() => path.setFullySelected(false));
steps.push(() => piece(path, color2, { tx: width, ty: 0, sx: -1, sy: 1 }));
steps.push(() => piece(path, color2, { tx: width, ty: height, sx: -1, sy: -1 }));
steps.push(() => piece(path, color1, { tx: 0, ty: height, sx: 1, sy: -1 }));
steps.push(() => {
    eye = new paper.Path.Circle(new paper.Point(40, 205), 35);
    eye.fillColor = color1;
});
steps.push(() => piece(eye, color2, { tx: width, ty: 0, sx: -1, sy: 1 }));
steps.push(() => {
    voice = new paper.Path.Circle(new paper.Point(355, 400), 35);
    voice.fillColor = color2;
});
steps.push(() => piece(voice, color1, { tx: width, ty: 0, sx: -1, sy: 1 }));

const playPause = () => {
    playVsPause = !playVsPause;
    if (playVsPause) {
        console.log("play")
        playInterval = setInterval(() => {
            next();
        }, 100)
    } else {
        console.log("pause")
        clearInterval(playInterval);
    }
}

const prev = () => {
    if (animationIndex > 1) {
        animationIndex--;
    } else {
        animationIndex = steps.length;
    }
    paper.project.clear();
    for (let i = 0; i < animationIndex; i++) {
        steps[i]();
    }
}

const next = () => {
    console.log(animationIndex);
    if (animationIndex < steps.length) {
        steps[animationIndex]();
        animationIndex++;
    } else {
        paper.project.clear();
        animationIndex = 1;
        for (let i = 0; i < animationIndex; i++) {
            steps[i]();
        }
    }
}

document.getElementById("button-prev").onclick = prev;

document.getElementById("button-play-pause").onclick = playPause;

document.getElementById("button-next").onclick = next;

playPause();