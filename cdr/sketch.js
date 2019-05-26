var ball, cat, dog, owl;
var random_number;
var test_btn, train_btn, clear_btn;
var cat_value = [],
    dog_value = [],
    owl_value = [],
    ball_value = [];

const image_length = 784;

var data = [];

function get_image_data(src, val) {
    var o = src.get();
    o.resize(28, 28);

    o.loadPixels();

    for (let i = 0; i < image_length; i++) {
        let index = o.pixels[i * 4];
        val[i] = ceil((255 - index) / 255.0);
    }

    return val;
}

function preload() {
    ball = loadImage('./images/ball.jpg');
    cat = loadImage('./images/cat.jpg');
    dog = loadImage('./images/dog.jpg');
    owl = loadImage('./images/owl.jpg');
}

var training_model;

function setup() {
    createCanvas(400, 400);
    background(255);
    strokeWeight(10);
    stroke(0);

    //the name of train button
    train_btn = select("#btnn");
    clear_btn = select("#clr");
    test_btn = select("#tst");

    training_model = select('#tra');

    get_image_data(cat, cat_value);
    get_image_data(dog, dog_value);
}

var net = new brain.NeuralNetwork();
var trainingData = [];

function draw() {

    clear_btn.mousePressed(() => {
        background(255);
    });

    train_btn.mousePressed(() => {
        var d = [];
        var img = get();

        img.resize(28, 28);

        img.loadPixels();

        for (let i = 0; i < image_length; i++) {
            let index = img.pixels[i * 4];
            d[i] = ceil((255 - index) / 255.0);
        }

        var value = select('#field').elt.value;

        trainingData.push({
            input: d,
            output: {}
        });

        // set the value of output
        trainingData[trainingData.length - 1].output[value] = 1;

    });

    test_btn.mousePressed(() => {
        //net.train(trainingData);

        var img = get();

        img.resize(28, 28);

        img.loadPixels();

        for (let i = 0; i < image_length; i++) {
            let index = img.pixels[i * 4];
            data[i] = ceil((255 - index) / 255.0);
        }

        const r = brain.likely(data, net);

        console.log(r);
    });

    training_model.mousePressed(() => {
        net.train(trainingData);
    });
}

function touchMoved() {
    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
}