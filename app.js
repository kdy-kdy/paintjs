const canvas = document.querySelector("#jsCanvas"),
      colors = document.getElementsByClassName("jsColor"),
      range = document.getElementById("jsRange"),
      mode = document.getElementById("jsMode"),
      save = document.getElementById("jsSave");



// context > canvas 안에서 픽셀을 다루는것
// 자세한 정보 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 우선 white로 초기화
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
}

function handleModeChange() {
    if(filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasFill() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleSaveClick() {
    // 이미지를 데이터로 가져옴 toDataURL()
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    // download > anchor("a") 태그의 attribute. 링크로 가는것 말고 다운로드 하게 함
    link.href = image;
    link.download = "PaintJS[download]";
    link.click();
    
}

// 우클릭 방지
function handleCM(event) {
    event.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    // mousedown 마우스 클릭시 발생하는 event, 클릭하고 떼지 않을때
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasFill);
    canvas.addEventListener("contextmenu", handleCM);
}

// Array.from > object로 부터 array를 만듦.
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeChange);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}
