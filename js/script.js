var commands = [{}];
window.onload = function () {

    var gridWidth = 10;
    var gridHeight = 10;
    var grid = [];
    var table = document.getElementById("main_table");
    var i = gridWidth - 2;
    var n = -1;


    for (var y = 0; y < gridHeight; y++) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        grid.push([]);
        td = document.createElement('td');
        tr.appendChild(td);
        if (i != -1) {
            td.innerHTML = i;
        }

        td.id = "line_right";
        for (var x = 0; x < gridWidth; x++) {
            td = document.createElement('td');
            tr.appendChild(td);
            if (y == gridHeight - 1) {
                td.id = "line_top";
                td.innerHTML = n + 1;
                n++;
            } else {
                span = document.createElement('span');
                span.innerHTML = "&#9679;";
                td.appendChild(span);
                rect = span.getBoundingClientRect();

                var body = document.body;
                var docElem = document.documentElement;
                var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
                var clientTop = docElem.clientTop || body.clientTop || 0;
                var clientLeft = docElem.clientLeft || body.clientLeft || 0;


                c_y = rect.top + scrollTop - clientTop - span.offsetWidth / 2;
                c_x = rect.left + scrollLeft - clientLeft - span.offsetWidth / 2;

                span.id = c_x + " " + c_y;

                span.className = "tr_" + i + "_" + x;
                grid[y].push(0);
            }
        }
        i--;
    }
    set_aim(0, 0);

    document.getElementById("move").onclick = function (e) {
        document.getElementById("alert").style.display = "block";
    }


    document.getElementById("ok").onclick = function (e) {
        MovePen();
    }

    // document.getElementById("alert").onclick = function (e) {
    //
    //     if ( document.getElementById("x_input").value != "") {
    //         document.getElementById("y_input").style.display = "none";
    //         document.getElementById("alert").style.display = "none";
    //     } else alert("Enter nickname!!!");
    // };
}

//var previousLocation = [{}]
//var LocationOfTochka =  {}


var PenRaised = 0;

function raisePen(event) {
    PenRaised = 1;
    console.log("pen raised")
    console.log(PenRaised)
    var theDiv = document.getElementById("task");
    theDiv.innerHTML += "<h5>Raise Pen</h5><br/>";
}

function raisePen() {
    PenRaised = 1;
    console.log("pen raised")
    console.log(PenRaised)

}

function set_aim(x, y) {

    var td_aim = document.getElementsByClassName("tr_" + x + "_" + y + "")[0];
    var coords = document.getElementsByClassName("tr_" + x + "_" + y + "")[0].getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;


    document.getElementById("aim").style.top = coords.top + scrollTop - clientTop - td_aim.offsetWidth / 2 + "px";
    document.getElementById("aim").style.left = coords.left + scrollLeft - clientLeft - td_aim.offsetWidth / 2 + "px";
}

function set_line() {

}

function MovePen() {

    var x = document.getElementById("x_input").value;
    var y = document.getElementById("y_input").value;
    commands.push({"x":x, "y":y});
    for (z=0; z< commands.length; z++){
        console.log(commands[z]);
    }
    if (!x || !y) {

    } else {
        document.getElementById("alert").style.display = "none";
        if (PenRaised) {
            console.log("PenRaised");
            var theDiv = document.getElementById("task");
            var convertitemtiString = "<h5>Move Pen " + "tr_" + x + "_" + y + "</h5><br/>";
            theDiv.innerHTML += convertitemtiString;

        } else {
            console.log("Pen is set and you should draw");

            var theDiv = document.getElementById("task");
            var convertitemtiString = "<p>СМЕСТИТСЯ В ТОЧКУ (<span> " + x + ", " + y + ")</span></p><br/>";
            theDiv.innerHTML += convertitemtiString;
            console.log(commands.length);
            if (commands.length > 2) {

                var x_f_1 = "tr_" + commands[commands.length-2].x + "_" + commands[commands.length-2].y;
                console.log("x_f: " + x_f_1);
                var x_f_h_1 = document.getElementsByClassName(x_f_1)[0].id.split(' ');
                console.log("x_f_h: " + x_f_1);
                PenLocation.x = x_f_h_1[0];
                PenLocation.y = x_f_h_1[1];
                console.log("x: " + PenLocation.x);
                console.log("y: " + PenLocation.y);

                //Drawing should take place here!
                var c = document.getElementById("internalcanvas");

                var ctx = c.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(PenLocation.x, PenLocation.y);
                var x_f = "tr_" + commands[commands.length-1].x + "_" + commands[commands.length-1].y;
                var x_f_h = document.getElementsByClassName(x_f)[0].id.split(' ');
                console.log("x_1: " + x_f_h[0]);
                console.log("x_2: " + x_f_h[1]);
                ctx.lineTo( x_f_h[0], x_f_h[1]);
                ctx.stroke();
            }


        }
    }

}

/////////
var PenLocation = {"x": 0, "y": 0};


function SetPenDown() {
    var x = document.getElementById("x").value
    var y = document.getElementById("y").value

    if (x && y) {
        PenLocation = ({
            "x": x
            , "y": y
        })
        console.log(PenLocation)
        PenRaised = 0;
        var theDiv = document.getElementById("task")
        var convertitemtiString = "<h5>Set Pen " + "tr_" + x + "_" + y + "</h5><br/>";
        theDiv.innerHTML += convertitemtiString;
    }
    else {

        alert("Please set Y and X")
        /*console.log(PenLocation)
        PenRaised = 0;
        var theDiv = document.getElementById("task");
        var convertitemtiString = "<h5>Set Pen " +"tr_"+x+"_"+y+ "</h5><br/>";
        theDiv.innerHTML += convertitemtiString;*/
    }
}


function DrawLine() {
    var x = document.getElementById("x").value
    var y = document.getElementById("y").value

    LocationOfTochka = ({"x": x, "y": y})
    console.log(LocationOfTochka)

    var kuda_x = document.getElementById("kuda_x").value
    var kuda_y = document.getElementById("kuda_y").value

    var c = document.getElementById("internalcanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    var secondtolastitem = ([previousLocation.length - 2])
//console.log(previousLocation[secondtolastitem])

    if (PenRaised)
//TODO Addogic to check if numbers are in input
        ctx.moveTo(LocationOfTochka.x, LocationOfTochka.y)
    ctx.lineTo(kuda_x, kuda_y);
    ctx.stroke();

};
var PenRaised = 0;

function raisePen(event) {
    PenRaised = 1;
    console.log("pen raised")
    console.log(PenRaised)
    var theDiv = document.getElementById("task");
    theDiv.innerHTML += "<h5>Raise Pen</h5><br/>";

}
