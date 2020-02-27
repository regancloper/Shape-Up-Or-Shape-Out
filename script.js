// sets constant for how big the box containing the shapes will be
const BOX_SIDE = 600;

// defines Shape class and its helper methods
class Shape {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.div = $(`<div style="left: ${getRandomValue(width)}px; top: ${getRandomValue(height)}px"></div>`);
        $('.shape-box').append(this.div);
        this.addClickListeners(); 
    }
    get name() {
        return this.constructor.name;
    }
    addClickListeners() {
        this.div.click(() => describe(this));
        this.div.dblclick(() => {
            this.div.remove();
            $('.input-group > input').val('');
        });
    }
}

// defines Circle class and methods
class Circle extends Shape {
    constructor(radius) {
        super(2 * radius, 2 * radius);
        this.div.addClass("circle");
        this.div.css({"height": this.height + "px", "width": this.width +"px"});
    }
    get area() {
        let radius = this.width / 2;
        return Math.PI * radius * radius;
    }
    get perimeter() {
        let radius = this.width / 2;
        return 2 * Math.PI * radius;
    }
    get radius() { return this.width / 2 };
}

// defines Rectangle class and methods
class Rectangle extends Shape {
    constructor(height, width) {
        super(height, width);
        this.div.addClass("rectangle");
        this.div.css({"height": this.height + "px", "width": this.width +"px"});
    }
    get area() {
        return this.height * this.width;
    }
    get perimeter() {
        return this.height * 2 + this.width * 2;
    }
    get radius() { return "N/A" };
}

// defines Square class
class Square extends Rectangle {
    constructor(sideLength) {
        super(sideLength, sideLength);
        this.div.removeClass("rectangle");
        this.div.addClass("square");
    }
}

// defines Triangle class
class Triangle extends Shape {
    constructor(height) {
        super(height, height);
        this.div.addClass("triangle");
        this.div.css({"border-bottom-width": this.width + "px", "border-right-width": this.height + "px"});
    }
    get area() {
        return 0.5 * this.height * this.height;
    }
    get perimeter() {
        return 2 * (this.height + Math.sqrt(2)) * this.height;
    }
    get radius() { return "N/A" };
}

// adds a circle to the shape-box when user clicks "Add Circle" button
$('#circle-btn').click(() => {
    let radius = $('#circle-input').val();
    new Circle(radius);
    $('#circle-input').val('');
});

// adds a square to the shape-box when user clicks "Add Square" button
$('#square-btn').click(() => {
    let side = $('#square-input').val();
    new Square(side);
    $('#square-input').val('');
});

// adds a rectangle to the shape-box when user clicks "Add Rectangle" button
$('#rect-btn').click(() => {
    let height = $('#rect-height-input').val();
    let width = $('#rect-width-input').val();
    new Rectangle(height, width);
    $('#rect-height-input').val('');
    $('#rect-width-input').val('');
});

// adds a triangle to the shape-box when user clicks "Add Triangle" button
$('#triangle-btn').click(() => {
    let height = $('#triangle-input').val();
    new Triangle(height);
    $('#triangle-input').val('');
});

// returns random value of x and y coordinates that will fit into the shape-box
function getRandomValue(side) {
    return Math.floor(Math.random() * (BOX_SIDE - side) + 1);
}

// displays all of the clicked shape's details in the side panel
function describe(obj) {
    $('#shape-calc').val(obj.name);
    $('#area-calc').val(obj.area);
    $('#perimeter-calc').val(obj.perimeter);
    $('#radius-calc').val(obj.radius);
    if (obj.name === "Circle") {
        $('#height-calc').val("N/A");
        $('#width-calc').val("N/A");
    } else {
        $('#height-calc').val(obj.height);
        $('#width-calc').val(obj.width);
    }
}
