import { Images } from "./model/modelCode.js";
import { createStore } from "redux";

console.log("ovladani -> sipky");
console.log("tam/zpet -> j/l");


function render(YA) {
    var divID = "pole";
    var NOP = YA.length * YA.length;
    var D = document.getElementById(divID);
    D.innerHTML = "";
    for (var i = 0; i < YA.length; i++) {
        var ar = YA[i];
        for (var a = 0; a < ar.length; a++) {
            var d = document.createElement("div");
            d.style.width = (String(720 / Math.sqrt(NOP)) + "px");
            d.style.height = d.style.width;
            d.className = "box";
            if (ar[a].Number !== (NOP - 1)) {
                d.style.backgroundColor = "silver";
                d.innerText = ar[a].Number;
            }
            D.appendChild(d);
        }
    }
}

function process(state, action) {
    var images = new Images();
    images.Import(document.getElementsByClassName("box"));

    switch (action.type) {
        case "CREATE":
            {
                images.CreateImages(action.value);
                return { ...state, Items: images.YA, Last: state}
            }
        case "MOVE":
            {
                images.Move(action.value);
                return { ...state, Items: images.YA, Last: state}
            }
        case "REDO":
            {
                return state.Next
            }
        case "UNDO":
            {
                return { ...state.Last, Next: state }
            }
        default:
            return state;
    }
}

function onCreate(val) {
    store.dispatch({ type: "CREATE", value: val });
}
function onUndo() {
    store.dispatch({ type: "UNDO", value: null });
}
function onRedo() {
    store.dispatch({ type: "REDO", value: null });
}
function onMove(val) {
    store.dispatch({ type: "MOVE", value: val });
}

const store = createStore(process, { Items: [], Last: [], Next: [] });
store.subscribe(function () {
    render(store.getState().Items);
});

document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 37: onMove("Left"); break;
        case 38: onMove("Up"); break;
        case 39: onMove("Right"); break;
        case 40: onMove("Down"); break;
        case 74: onUndo(); break;
        case 76: onRedo(); break;

        default: return;
    }
}

document.getElementById("1").addEventListener("click", function(){ onCreate(4); });
document.getElementById("2").addEventListener("click", function(){ onCreate(9); });
document.getElementById("3").addEventListener("click", function(){ onCreate(16); });
document.getElementById("4").addEventListener("click", function(){ onCreate(25); });
document.getElementById("5").addEventListener("click", function(){ onCreate(36); });