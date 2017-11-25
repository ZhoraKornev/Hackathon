window.onload = function(){
    var gridWidth = 10;
    var gridHeight = 10;
    var grid = [];
    var table = document.getElementById("main_table");
    var i = gridWidth;
    var n = 1;

    for (var y = 0; y < gridHeight; y++) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        grid.push([]);
        td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = i;
        td.id = "line_right";
        for (var x = 0; x < gridWidth; x++) {
            if (y == gridHeight-1){
                td = document.createElement('td');
                td.id = "line_top";
                tr.appendChild(td);
                td.innerHTML = n;
                n++;
            } else {
                td = document.createElement('td');
                tr.appendChild(td);
                span = document.createElement('span');
                span.innerHTML = "&#9679";
                td.appendChild(span);
                rect = span.getBoundingClientRect();
                span.id = rect.x + " " + rect.y;
                grid[y].push(0);
            }
        }
        i--;
    }

}

var previousLocation = [{}]
var LocationOfTochka =  {}




function DrawLine(){

var x = document.getElementById("x").value
var y = document.getElementById("y").value

LocationOfTochka = ({"x":x, "y":y})
console.log(LocationOfTochka)


var kuda_x = document.getElementById("kuda_x").value
var kuda_y = document.getElementById("kuda_y").value



var c=document.getElementById("internalcanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
var secondtolastitem =  ([previousLocation.length-2])
//console.log(previousLocation[secondtolastitem])
if (LocationOfTochka == null){console.log("One Item in Array")}

  else {
  //  console.log(previousLocation[secondtolastitem].x)
  //ctx.moveTo(previousLocation[secondtolastitem].x,previousLocation[secondtolastitem].y);
  ctx.moveTo(LocationOfTochka.x,LocationOfTochka.y)
  ctx.lineTo(kuda_x,kuda_y);
  ctx.stroke();
  }
};



var PenLocation = {"x":0, "y":0};

function SetPen(){



  var x = document.getElementById("x").value
  var y = document.getElementById("y").value

if(x && y){
  PenLocation = ({"x":x, "y":y})
  }
}


function PickupPen(){
PenLocation = ({"x":null, "y":null})

}


function moveToVector(){




}
