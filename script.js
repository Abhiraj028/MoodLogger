renderMap();
const btn = document.querySelector(".log-btn");


btn.addEventListener("click",collectData);
document.addEventListener("keydown",e =>{
    if(e.key == "Enter"){
        collectData();
    }
})

function collectData(){
const note = document.querySelector(".note-input").value;
const mood = document.querySelector(".mood-select").value;
const createdAt = new Date().toISOString().split("T")[0];

const element = {note,mood};

const logs = JSON.parse(localStorage.getItem("storeLogs")||"{}");
logs[createdAt] = element;
localStorage.setItem("storeLogs",JSON.stringify(logs));

renderMap();
}

function renderMap(){
    const heatMap = document.querySelector(".heatmap-grid");
    heatMap.innerHTML = "";
    const logs = JSON.parse(localStorage.getItem("storeLogs"));
    
    const colors = {
        happy: "mood-happy",
        neutral: "mood-neutral",
        sad: "mood-sad",
        angry: "mood-angry",
        loved: "mood-loved",
    };

    for(let i = 0;i<49;i++){
        const date = new Date();
        date.setDate(date.getDate() -(48-i));
        const dateStr = date.toISOString().split("T")[0];

        const data = logs[dateStr];
        const square = document.createElement("div");
        square.classList.add("day-square");

        if(data){
            square.classList.add(colors[data.mood]);
            square.title = `Date:${dateStr}\nMood:${data.mood}\nNote:${data.note}`;
        }else{
            square.title = `No entry for the day`;

        }
        heatMap.appendChild(square);
    }
}
