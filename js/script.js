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
                span.innerHTML = ".";
                td.appendChild(span);
                rect = span.getBoundingClientRect();
                span.id = rect.x + " " + rect.y;
                grid[y].push(0);
            }
        }
        i--;
    }

  /*  document.getElementById("main_table").onclick = function(event) {
        var x = event.clientX;
        var y = event.clientY;
        var coords = "X coords: " + x + ", Y coords: " + y;
        document.getElementById("demo").innerHTML = coords;
    }*/
}

var previousLocation = [{}]
var LocationOfTochka =  {}


function DrawLine(event){
  var x = event.clientX;
  var y = event.clientY;
//  console.log(event);
  previousLocation.push({"x":x ,"y":y})



  LocationOfTochka = ({"x":x, "y":y})
  console.log(LocationOfTochka.x)


var c=document.getElementById("internalcanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
var secondtolastitem =  ([previousLocation.length-2])
//console.log(previousLocation[secondtolastitem])
if (secondtolastitem == null){console.log("One Item in Array")}

else {
//  console.log(previousLocation[secondtolastitem].x)
//ctx.moveTo(previousLocation[secondtolastitem].x,previousLocation[secondtolastitem].y);

ctx.moveTo(LocationOfTochka.x,LocationOfTochka.y)
ctx.lineTo(100,100);
ctx.stroke();
}






}
