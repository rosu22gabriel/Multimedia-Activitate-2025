// declaration
class Rectangle {
    constructor(height, width) { 
        this.height = height;
        this.width = width;
    }
};

// Expression; the class is anonymous and assigned
// to a variable

const Rectangle = class {
    // there can be only one constructor special method inside the class 
    // a syntax error is shown if the class contains more than one occurence of a constructor method
    // a constructor can use the super keyword to call the constructor of the super class
    constructor(height, width) { 
        this.height = height;
        this.width = width;
    }
}

//Expression; the class has it's own name

const Rectangle = class Rectangle2 {
    constructor(height, width) { 
        this.height = height;
        this.width = width;
    }
}


class ClassWithStaticInitializationBlock {
    static staticProperty1 = "Property1";
    static staticProperty2;

    // Static initialization block
    static {
        this.staticProperty2 = "Property2";
    }
}

console.log(ClassWithStaticInitializationBlock.staticProperty1);
console.log(ClassWithStaticInitializationBlock.staticProperty2);


var y = "Outer y";

class A {
    static field = "Inner Y";
    static { 
        // var y only hoisted inside block
        console.log(y); // undefined <-- not 'Outer y'

        var y = this.field;
    }
}
// var y defined in static block is not hoisted outside the block
console.log(y);
