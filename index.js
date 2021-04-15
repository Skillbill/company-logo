const width = 800;
const height = 800;
const color1 = '#003365';
const color2 = '#fb6703';
const canvas = document.getElementsByTagName('canvas')[0];
const paths = [];

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

const path = new paper.Path({
    closed: true,
    fillColor: color1
});

path.add(new paper.Point(22, 30));
path.add(new paper.Point(110, 32));
path.curveTo(new paper.Point(175, 60), new paper.Point(200, 120));
path.add(new paper.Point(200, 280));
path.curveTo(new paper.Point(230, 340), new paper.Point(300, 372));
path.add(new paper.Point(300, 400));
path.add(new paper.Point(195, 400));
path.curveTo(new paper.Point(145, 360), new paper.Point(125, 300));
path.add(new paper.Point(125, 135));
path.curveTo(new paper.Point(115, 115), new paper.Point(90, 105));
path.add(new paper.Point(22, 105));
paths.push(path);

paths.push(piece(path, color2, { tx: width, ty: 0, sx: -1, sy: 1 }));
paths.push(piece(path, color2, { tx: width, ty: height, sx: -1, sy: -1 }));
paths.push(piece(path, color1, { tx: 0, ty: height, sx: 1, sy: -1 }));


const eye = new paper.Path.Circle(new paper.Point(40, 205), 35);
eye.fillColor = color1;
paths.push(eye);
paths.push(piece(eye, color2, { tx: width, ty: 0, sx: -1, sy: 1 }));

const voice = new paper.Path.Circle(new paper.Point(355, 400), 35);
voice.fillColor = color2;
paths.push(voice);
paths.push(piece(voice, color1, { tx: width, ty: 0, sx: -1, sy: 1 }));

document.getElementById("download-to-svg").onclick = () => {
    var fileName = "logo.svg"
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }));
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}