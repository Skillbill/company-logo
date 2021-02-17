const canvas = document.getElementById('myCanvas');

paper.setup(canvas);

const path = new paper.Path({
    strokeColor: 'black',
    closed: true,
    fullySelected: true
});

//path.fillColor = new paper.Color(1, 0, 0);


path.add(new paper.Point(22, 30));
path.add(new paper.Point(130, 32));
path.curveTo(new paper.Point(185, 70), new paper.Point(200, 120));
path.add(new paper.Point(200, 200));




paper.view.draw();