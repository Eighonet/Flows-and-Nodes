var currentFlow = 0;
var currentResources = 10000;
var currentVertex = 0;
var currentTableLen = 0;
var currActVertex;
var currVertexSize = new Array(33,33 ,33,33,33 ,33,33,33 ,33,33,33 ,33,33,33 ,33,33,33 ,33,33,33 ,33,33 ,33);
var currResDist = new Array(0,0 ,0,0,0 ,0,0,0 ,0,0,0 ,0,0,0 ,0,0,0 ,0,0,0 ,0,0 ,0);





function reportWindowSize() {

    let carrier = document.getElementById("ac_layer_2y");
    let l = carrier.getElementsByTagName('path');
    carrier = document.getElementById("graph");
    let r = carrier.getElementsByClassName("vertex");

    let i = 22;


    while (i >=0) {
 //   alert($(r[i]).width()/4)
        $(r[i]).offset({top: Math.round(($(l[i]).position().top - $(r[i]).width()/4)),
            left:  Math.round(($(l[i]).position().left - $(r[i]).width()/4))});
        window.resizeTo(964, 573);
        i = i - 1;
    }

    for (let z = 0; z < 22; z++) {
        mbar[z].set((flow[(z+1)*2 - 1][(z+1)*2] / capacityN[(z+1)*2 - 1][(z+1)*2]) * 100, true);
        $(r[22]).height(47);
        $(r[22]).width(47);
        $(r[21]).height(47);
        $(r[21]).width(47);
        $(r[z]).height(currVertexSize[z]);
        $(r[z]).width(currVertexSize[z]);


    }

};


function vertexButtons() {



    $(".field").fadeOut(0);
    let field = document.getElementsByClassName("field");
    let vertexClick = document.getElementsByClassName('vertex');
    for (let i = 0; i < 21; i++) {

        vertexClick[i].onclick = function() {
            currentVertex = i + 1;
            currActVertex = vertexClick[i];
            let position = $(vertexClick[i]).position();
            // /   alert();
            $(".field").fadeIn(400);
            $(field[0]).offset({top: position.top,
                left: (position.left + 25)});

        }
    }
    $(document).mouseup(function (e) {
        var container = $(".field");
        if (container.has(e.target).length === 0){
            $(".field").fadeOut(1);
        }
    });


    $(".modal").fadeOut(0);

    let addClick = document.getElementsByClassName('addButton');
    addClick[0].onclick = function() {
        $(".field").fadeOut(400);
        $(".modal").fadeIn(400);
        $(".modalOverlay").fadeIn(400);
    }
};


function displayFlow() {
    countflow();
    $(".contFlow").replaceWith("<div class ='contFlow'>" + Math.round(currentFlow) + "</div>");
}

function displayResources() {
    $(".contRes").replaceWith("<div class ='contRes'>" + currentResources + "</div>");
}

function Apply () {
    let applyClick = document.getElementsByClassName('applyButton');
    applyClick[0].onclick = function() {
        for (let z = 0; z < 22; z++) {
            capacityN[(z+1) * 2 - 1][(z+1) * 2] += 2*Math.sqrt(currResDist[z]);
            alert(capacityN[(z+1) * 2 - 1][(z+1) * 2]);
        }
        displayFlow();
        alert();
    }
}

function addModal(displayFlow, displayResources) {

    $(".modalAdd > .modal").fadeOut(0);

    let addClick = document.getElementsByClassName('addButton');
    addClick[0].onclick = function() {
        $(".field").fadeOut(400);
        $(".modalAdd > .modal").fadeIn(400);
        $(".modalAdd > .modalOverlay").fadeIn(400);
    };
    $(document).mouseup(function (v) {
        let cont = $('.modal');
        if (cont.has(v.target).length === 0) {
            $('.modalAdd > .modal').fadeOut(400);
            $(".modalAdd > .modalOverlay").fadeOut(400);
        }
    });


    let enterClickA = document.getElementById('e1');
    enterClickA.onclick = function () {
        $(".modal").fadeOut(400);
        $(".modalOverlay").fadeOut(400);
        var inputA= document.getElementById("i1").value;
        var resA = 2*Math.sqrt(inputA);
        if ((currentResources >= inputA) && (inputA > 0)) {
            let list = document.getElementsByClassName("firCol");
            let row = document.getElementsByClassName("titleRow");

            let result = -1;
//            alert(list.length);
            for (let i = 0; i < list.length; i++) {
                if (list[i].textContent == currentVertex) {
                    result = i;
                    break;
                }
            }

            if (result != -1) {
                currVertexSize[currentVertex-1] = 40;

                currentResources -= inputA;
                currResDist[currentVertex-1] += inputA;
                displayResources();
//                capacityN[currentVertex * 2 - 1][currentVertex * 2] += resA;
 //               displayFlow();
                let prevA = row[result].getElementsByClassName("secCol");
                $(row[result]).replaceWith("<div class = \"titleRow\">\n" +
                    "            <div class = \"firCol\">" + currentVertex +"</div>\n" +
                    "            <div class = \"secCol\">" + parseFloat(parseFloat(inputA) + parseFloat(prevA[0].textContent)) +"</div>\n" +
                    "            <div class = \"thCol\">" + Math.round(capacityS[(currentVertex)*2 - 1][(currentVertex)*2]) + "</div>\n" +
                    "            <div class = \"fouCol\">" + Math.round(capacity[(currentVertex)*2 - 1][(currentVertex)*2]) + "</div>\n" +
                    "            <div class = \"fifCol\">" + Math.round(flow[(currentVertex)*2 - 1][(currentVertex)*2]) + "</div>\n" +
                    "        </div>");
            } else {
                if (currentTableLen <= 9) {
                    currVertexSize[currentVertex-1] = 40;
                    currentResources -= inputA;
                    currResDist[currentVertex-1] += inputA;
                    displayResources();
//                    capacityN[currentVertex * 2 - 1][currentVertex * 2] += resA;
//                    displayFlow();
                    currentTableLen++;
                    $(".table").append("<div class = \"titleRow\">\n" +
                        "            <div class = \"firCol\">" + currentVertex + "</div>\n" +
                        "            <div class = \"secCol\">" + inputA + "</div>\n" +
                        "            <div class = \"thCol\">" + Math.round(capacityS[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                        "            <div class = \"fouCol\">" + Math.round(capacity[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                        "            <div class = \"fifCol\">" + Math.round(flow[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                        "        </div>");
                } else {
                    alert("Максимальное количество улучшаемых станков достигнуто.");
                }
            }
        result = -1;
        } else {
                alert("Недостаточно ресурсов.");
        }
    };
}


function removeModal() {

    $("modalRemove > .modal").fadeOut(0);

    let addClick = document.getElementsByClassName('removeButton');
    addClick[0].onclick = function() {
        $(".field").fadeOut(400);
        $(".modalRemove > .modal").fadeIn(400);
        $(".modalRemove > .modalOverlay").fadeIn(400);
    };

    $(document).mouseup(function (v) {
        let cont = $('.modalRemove > .modal');
        if (cont.has(v.target).length === 0){
            $('.modalRemove > .modal').fadeOut(400);
            $(".modalRemove > .modalOverlay").fadeOut(400);
        }
    });


    let enterClickR = document.getElementById('e2');
        enterClickR.onclick = function () {
            $(".modal").fadeOut(400);
            $(".modalOverlay").fadeOut(400);
            var inputE = document.getElementById("i2").value;
            var resE = 2*Math.sqrt(inputE);
            if ((currResDist[currentVertex-1] - inputE < 0) || (inputE < 0) || (inputE == "")) {
             //   alert("Невозможно исполнить: " + capacityS[currentVertex*2 - 1][currentVertex*2] + " " + (capacityN[currentVertex*2 - 1][currentVertex*2] - resE) + " " + inputE);
                alert("Невозможно исполнить.");
            } else {
             //   alert(capacityS[currentVertex*2 - 1][currentVertex*2] + " " + (capacityN[currentVertex*2 - 1][currentVertex*2] - resE) + " " + inputE);
                currentResources = currentResources + parseInt(inputE);
                currResDist[currentVertex-1] -= inputE;
                displayResources();
 //               capacityN[currentVertex * 2 - 1][currentVertex * 2] -= resE;
 //               displayFlow();
                let listR = document.getElementsByClassName("firCol");
                let rowR = document.getElementsByClassName("titleRow");

                let resultR = -1;

                for (let i = 0; i < listR.length; i++) {
                    if (listR[i].textContent == currentVertex) {
                        resultR = i;
                        break;
                    }
                }

                if (resultR != -1) {
                    let prevA = rowR[resultR].getElementsByClassName("secCol");
                    if (prevA[0].textContent === inputE) {
                        currVertexSize[currentVertex-1] = 32;
                        $(rowR[resultR]).remove();
                        currentTableLen--;
                    } else {
                        $(rowR[resultR]).replaceWith("<div class = \"titleRow\">\n" +
                            "            <div class = \"firCol\">" + currentVertex + "</div>\n" +
                            "            <div class = \"secCol\">" + parseInt(parseInt(prevA[0].textContent) - parseInt(inputE)) + "</div>\n" +
                            "            <div class = \"thCol\">" + Math.round(capacityS[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                            "            <div class = \"fouCol\">" + Math.round(capacity[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                            "            <div class = \"fifCol\">" + Math.round(flow[(currentVertex) * 2 - 1][(currentVertex) * 2]) + "</div>\n" +
                            "        </div>");
                    }
                }
                resultR = -1;
            }
        };
}


function edgeGeneration() {
    var data = {
        nodes: [
            {id: "s"},
            {id: "1"},
            {id: "2"},
            {id: "3"},
            {id: "4"},
            {id: "5"},
            {id: "6"},
            {id: "7"},
            {id: "8"},
            {id: "9"},
            {id: "10"},
            {id: "11"},
            {id: "12"},
            {id: "13"},
            {id: "14"},
            {id: "15"},
            {id: "16"},
            {id: "17"},
            {id: "18"},
            {id: "19"},
            {id: "20"},
            {id: "21"},
            {id: "t"}
        ],


 /*   var data = {
        nodes: [
            {id: "s", x: 350, y: 300},
            {id: "1", x: 377, y: 195},
            {id: "2", x: 417, y: 153},
            {id: "3", x: 404, y: 167},
            {id: "4", x: 353, y: 163},
            {id: "5", x: 313, y: 113},
            {id: "6", x: 366, y: 139},
            {id: "7", x: 339, y: 187},
            {id: "8", x: 327, y: 97},
            {id: "9", x: 369, y: 81},
            {id: "10", x: 315, y: 155},
            {id: "11", x: 245, y: 72},
            {id: "12", x: 335, y: 45},
            {id: "13", x: 269, y: 149},
            {id: "14", x: 284, y: 183},
            {id: "15", x: 279, y: 101},
            {id: "16", x: 298, y: 71},
            {id: "17", x: 296, y: 21},
            {id: "18", x: 248, y: 134},
            {id: "19", x: 264, y: 57},
            {id: "20", x: 241, y: 105},
            {id: "21", x: 218, y: 86},
            {id: "t", x: 168, y: 70}
        ],
*/
        edges: [
            {from: "s", to: "1"},
            {from: "s", to: "2"},
            {from: "s",   to: "3"},
            {from: "1",   to: "4"},
            {from: "1",    to: "7"},
            {from: "2",    to: "6"},
            {from: "3",    to: "6"},
            {from: "4",   to: "5"},
            {from: "5", to: "15"},
            {from: "5", to: "16"},
            {from: "6",   to: "7"},
            {from: "6",   to: "10"},
            {from: "6",    to: "8"},
            {from: "6",    to: "9"},
            {from: "6",    to: "6"},
            {from: "7",   to: "14"},

            {from: "8",    to: "15"},
            {from: "8",    to: "16"},
            {from: "9",    to: "12"},
            {from: "10",   to: "13"},
            {from: "11", to: "16"},
            {from: "11", to: "21"},
            {from: "12",   to: "16"},
            {from: "12",   to: "17"},
            {from: "13",    to: "18"},
            {from: "13",    to: "20"},
            {from: "14",    to: "18"},
            {from: "15",   to: "18"},

            {from: "15",    to: "19"},
            {from: "15",    to: "20"},
            {from: "16",    to: "19"},
            {from: "17",   to: "19"},
            {from: "18", to: "21"},
            {from: "19", to: "21"},
            {from: "20",   to: "21"},
            {from: "20",   to: "11"},
            {from: "21",    to: "t"}
        ]
    };

    var chart = anychart.graph(data);
//    chart.layout().type("fixed");
    chart.interactivity().enabled(false);
    chart.container("graph");
    chart.draw();

    chart.edges().normal().stroke("lightgray", 2);
    chart.edges().hovered().stroke('darkgray', 3);
    chart.edges().selected().stroke("lightgray", 3);

    var $ch = jQuery("#index1 > svg > defs");
    var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "marker")).attr({
        id: "triangle",
        viewBox: "0 0 5 10",
        refX: 25.6,
        refY: 5,
        markerUnits: "strokeWidth",
        markerWidth: 10,
        markerHeight: 10,
        orient: "auto"
    });
    $ch.append($bar);

    var $pth = jQuery("#index1 > svg > defs > marker");
    var $size = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
        d: "M 0 3 L 3.5 5 L 0 7 z",
        fill: "darkgray"
    });
    $pth.append($size);


}


var WHITE = 0;
var GREY = 1;
var BLACK = 2;

var n, e;

var nt = 100, mt = 100;
var capacity = [];
for (let i = 0; i < mt; i++){
    capacity[i] = [];
    for (let j = 0; j < nt; j++){
        capacity[i][j] = 0;
    }
}

var flow = [];
for (let z = 0; z < 100; z++){
    flow[z] = [];
    for (let f = 0; f < 100; f++){
        flow[z][f] = 0;
    }
}

var color = [];

for (let j = 0; j < 100; j++){
    color[j] = 0;
}

var pred = [];
for (let j = 0; j < nt; j++){
    pred[j] = 0;
}

var q = [];
for (let j = 0; j < nt + 2; j++){
    pred[j] = 0;
}

var head, tail = 0;


function min(x, y)
{
    if (x < y)
        return x;
    else
        return y;
}


function enque(x)
{
    q[tail] = x;
    tail++;
    color[x] = GREY;
}

function deque()
{
    let x = q[head];
    head++;
    color[x] = BLACK;
    return x;
}


function bfs(start, end)
{
    let u,v;
    for(u = 0; u < n; u++) {
        color[u] = WHITE;
    }
    head=0;
    tail=0;
    enque(start);
    pred[start]= -1;
    while(head !== tail)
    {
        u=deque();
        for( v = 0; v < n; v++ )
        {
            if(color[v] === WHITE && (capacity[u][v]-flow[u][v]) > 0) {
                enque(v);
                pred[v]=u;
            }
        }
    }
    if(color[end] == BLACK) {
        return 0;
    }
    else {
        return 1;
    }
}



function max_flow(source, stock)
{
    let i,j,u;
    let maxflow=0;
    for(i = 0; i < n; i++ )
    {
        for( j = 0; j < n; j++)
            flow[i][j]=0;
    }
    while(bfs(source,stock) === 0)
    {
        let delta = 100500;
        for(u = n-1; pred[u] >= 0; u=pred[u])
        {
            delta=min(delta, ( capacity[pred[u]][u] - flow[pred[u]][u] ) );
        }
        for(u = n-1; pred[u] >= 0; u=pred[u])
        {
            flow[pred[u]][u] += delta;
            flow[u][pred[u]] -= delta;
        }
        maxflow+=delta;
    }
    return maxflow;
}

var capacityS = [[0, 100000, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0,
        0, 0, 0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0,
        0, 100000, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 100000, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        150, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 500],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0]];
var capacityN = [[0, 100000, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0,
        0, 0, 0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0,
        0, 100000, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 100000, 0, 100000, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000,
        0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 0, 0,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100,
        0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        150, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 100000, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 500],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0]];

function countflow() {
    n = 43;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++) {
            capacity[i][j] = capacityN[i][j];
        }
    }

    currentFlow = max_flow(0, n-1);
//    alert(max_flow(0, n-1));

}

window.onload = function() {

    $("html").fadeOut(0);
    $("html").fadeIn(1000);

    Apply();
    edgeGeneration();
    setInterval(reportWindowSize,1);
    vertexButtons();
    addModal(displayFlow, displayResources);
    removeModal();
    countflow();



    let buttonClick = document.getElementsByClassName('backButton');
    buttonClick[0].onclick = function() {
        $("body").fadeOut(1000);
        setTimeout('location.href = "menu.html"', 1200);
    };

};