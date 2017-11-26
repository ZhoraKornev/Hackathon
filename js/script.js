var commands = [];  //  сохраняет все команды с относительными координатами [{x, y}, {x_v, y_v}, "raisePen", "SetPenDown" ]
var storage = {};   //  "1_1": {x = 273.1, y: 44.0}  ( реальные координаты в точке (1,1) )
var vector_point = {}; // хранить координаты начальной точки для вектора
var PenRaised = 0;
var isFirstVector = 0;

window.onload = function () {

    table = document.getElementById("main_table");
    drow_grid(10, 10, table);
    set_aim(0, 0);
};

function drow_grid(gridWidth, gridHeight, table){
    var grid = [];
    var i = gridWidth - 2;
    var n = -1;

    for (var y = 0; y < gridHeight; y++) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        grid.push([]);

        td = document.createElement('td');
        tr.appendChild(td);

        td.id = "line_right";
        if (i != -1) {
            td.innerHTML = i;           // номера вертикально
        }

        for (var x = 0; x < gridWidth; x++) {
            td = document.createElement('td');
            tr.appendChild(td);

            if (y == gridHeight - 1) {
                td.id = "line_top";
                td.innerHTML = n + 1;   // номера горизонтально
                n++;

            } else {
                span = document.createElement('span');
                span.innerHTML = "&#9679;";                 // точка
                td.appendChild(span);

                rect = span.getBoundingClientRect();        // получаем координаты точки
                inner = document.getElementById("inner").getBoundingClientRect();

                real_y = rect.top + span.offsetWidth / 2;   // относительные кординаты (247.50, 79.3)
                real_x = rect.left + span.offsetWidth / 2;

                ref_cootds = i + ", " + x;                  // относительные кординаты (1, 1)
                span.id =  ref_cootds;

                storage[ref_cootds] = {"x": real_x, "y": real_y};
                grid[y].push(0);
            }
        }
        i--;
    }
}

function raisePen() {
    PenRaised = 1;
    document.getElementById("finish").disabled = false;
    document.getElementById("start").disabled = true;
    document.getElementById("aim").style.display = "block";
    document.getElementById("finish_img").style.display = "none";
    document.getElementById("start_img").style.display = "block";
    commands.push({"raisePen": "ok"});
    info("ПОДНЯТЬ ПЕРО ");
}

function SetPenDown() {
    PenRaised = 0;
    document.getElementById("finish").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("aim").style.display = "none";
    document.getElementById("finish_img").style.display = "block";
    document.getElementById("start_img").style.display = "none";
    commands.push({"SetPenDown": "ok"});
    info("ОПУСТИТЬ ПЕРО ");
}

function set_aim(x, y) {  // устанавливает перо

    var td_aim = document.getElementById(x + ", " + y);
    var coords = document.getElementById(x + ", " + y).getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    // ввысчитывает координату с условиями прокрутки и размеров окна
    document.getElementById("aim").style.top = coords.top + scrollTop - clientTop - td_aim.offsetWidth / 2 + "px";
    document.getElementById("aim").style.left = coords.left + scrollLeft - clientLeft - td_aim.offsetWidth / 2 + "px";
}

function MovePen() {

    var x = document.getElementById("x_input").value;
    var y = document.getElementById("y_input").value;

    if (!PenRaised) {
        alert("Сначала снимите перо!");
    } else if (x == "" || y == "") {
        alert("Введите координаты!");
    } else {

        if (PenRaised == 1) {               // если первая координата
            set_aim(x, y);
            PenRaised = 2;

            commands.push({"x": x, "y": y});
            info("СМЕСТИТЬСЯ В ТОЧКУ ", x, y);

        } else if (commands.length > 1) {   // что б не было ошибки ниже проверяет к-во элементов
            from_x = commands[commands.length - 1].x;
            from_y = commands[commands.length - 1].y;

            if (from_x && from_y) {         // если последний элемент массива содержит координаты

                result = drowLine(from_x, from_y, x, y);

                if (result){                // если отрисовалось норм - добавляем команду в историю
                    commands.push({"x": x, "y": y});
                    info("СМЕСТИТЬСЯ В ТОЧКУ ", x, y);
                }

            } else alert("Неверные данные!");
        }
    }
}

function MoveVector() {
    var x = document.getElementById("x_input").value;           // введенные пользователем значения
    var y = document.getElementById("y_input").value;

    var x_v = document.getElementById("x_v_input").value;
    var y_v = document.getElementById("y_v_input").value;

    if (!PenRaised) {
        alert("Сначала снимите перо!");
    } else if (x == "" || y == "") {
        alert("Введите начальные координаты!");
    } else if (x_v == "" || y_v == "") {
        alert("Введите вектор!");
    } else {

        var comm_x = commands[commands.length - 1].x;
        var comm_y = commands[commands.length - 1].y;

        // TODO проверка введенные кординаты == последним в массиве

        if (!comm_x || !comm_y) {
            alert("СМЕСТИТЕСЬ В ТОЧКУ!");
            return;

        } else if (!isFirstVector) {    // если "сместиться на вектор" нажата впервые, устанавливает начальную точку
            vector_point.x = x;
            vector_point.y = y;
            isFirstVector = 1;
        }

        to_x = parseInt(vector_point.x) + parseInt(x_v);
        to_y = parseInt(vector_point.y) + parseInt(y_v);

        result = drowLine(vector_point.x, vector_point.y, to_x, to_y);

        if (result){                    // если отрисовалось норм - добавляем команду в историю
            commands.push({"x_v": x_v, "y_v": y_v});
            info("СМЕСТИТЬСЯ НА ВЕКТОР ", x_v, y_v);
        }
    }
}

function drowLine(from_x, from_y, to_x, to_y) {
    /*  <canvas id="internalcanvas">
    * зазмещать обязательно внизу html (перед </body>, что б был поверх всех окон)
    * z-index не работает для canvas
    *
    * style: width: 500px; height: 500px;
    * (в стилях можно задать конкретный размер)
    *
    * но точки, на которые разобьется этот canvas, только в атрибутах (это не пиксели!!!)
    * <canvas id="internalcanvas"> width="500" height="500">
    * что б совпадало с пикселями, укажи одинаковое значение, иначе полотно в 100pх при width="50" , 1 точка = 2pх
    *
    * при рисование началом координат является правая левая точка canvas, что не совпадает с реальными координатами окна
    * что б совпало с реальными, поставь его в начало окна: style:  position:absolute; top:0; left:0;
    *
    * </canvas> */

    var c = document.getElementById("internalcanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 2;      // толщина линии

    real_coords_from = storage[from_x + ", " + from_y]; // storage['3_0'] = {"x": 125.0, "y": 63}

    real_coords_to = storage[to_x + ", " + to_y];

    if (!real_coords_from || !real_coords_to){
        alert("Точка вышла за границы графика!");

        return false;

    } else {
        ctx.moveTo(real_coords_from.x, real_coords_from.y);
        ctx.lineTo(real_coords_to.x, real_coords_to.y);
        ctx.stroke();

        return true;
    }
}

function info(text, to_x, to_y) {   // печатает текст с успешно выполненными командами
    theDiv = document.getElementById("task");

    if (to_x && to_y) { // если есть координаты, пишим
        convertitemtiString = "<p> " + text + "(<span> " + to_y + ", " + to_x + ")</span></p>";

    } else { // для лога с обычным текстом
        convertitemtiString = "<p> " + text + "</p>";
    }

    theDiv.innerHTML += convertitemtiString;
}

// TODO водидация в input - ввод только чисел    \d [0-9]     -  знак (-)    /^\-?[0-9]*$/

// TODO сдвинуться на вектор (от какой точки, начальной (пера) или последней введенной?
// после введения сместиться на вектор перестает работать сместиться на точку !!!!

// TODO реализовать загрузку к юзеру массива storage

// TODO реализовать загрузку в браузер массива commands, распарсить данные и нарисовать

