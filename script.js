// Переменные
let FreeTime = 0
let workTime = document.getElementById("work").value;
let sleepTime = document.getElementById("sleep").value;
let stydeTime = document.getElementById("styde").value;
let AllTime = 24
let sallary = 0.25
let credit = 100
var saveGame = {}
var projects = [];
var activeProjects = [];

// let projects = []
// let activeProjects = []
//
let slepTimeDisplay = document.getElementById('sleep_display');
    slepTimeDisplay.innerHTML = sleepTime;
let workTimeDisplay = document.getElementById('work_display');
    workTimeDisplay.innerHTML = workTime;
let  stydeTimeDisplay = document.getElementById('styde_display');
    stydeTimeDisplay.innerHTML = stydeTime;
    document.getElementById("work").max = AllTime - sleepTime - stydeTime
    document.getElementById("sleep").max = AllTime -workTime - stydeTime
    document.getElementById("styde").max = AllTime - sleepTime - workTime
let  free_time = document.getElementById('free_time_display');
    FreeTime =  (24 - sleepTime - workTime - stydeTime) 
    free_time.innerHTML = FreeTime
    
    if(FreeTime< 0) {
        FreeTime = 0
    }
function refresh() {
    document.getElementById('credit').innerHTML
}
function  slepTime() {
    sleepTime = document.getElementById("sleep").value;
    let slepTimeDisplay = document.getElementById('sleep_display');
    slepTimeDisplay.innerHTML = sleepTime;
    document.getElementById("work").max = AllTime - sleepTime - stydeTime
    document.getElementById("styde").max = AllTime - sleepTime - workTime
    countFreeTime()
}
function  workeTime() {
    workTime = document.getElementById("work").value;
    let workTimeDisplay = document.getElementById('work_display');
    workTimeDisplay.innerHTML = workTime;
    document.getElementById("sleep").max = AllTime -workTime - stydeTime
    document.getElementById("styde").max = AllTime - sleepTime - workTime
    countFreeTime()
}
function  stydeeTime() {
    stydeTime = document.getElementById("styde").value;
    let  stydeTimeDisplay = document.getElementById('styde_display');
    stydeTimeDisplay.innerHTML = stydeTime;
    document.getElementById("sleep").max = AllTime -workTime - stydeTime
    document.getElementById("work").max = AllTime - sleepTime - stydeTime
    countFreeTime()
}


function countFreeTime() {
    let  free_time = document.getElementById('free_time_display');
    FreeTime =  (24 - sleepTime - workTime - stydeTime) 
    
    free_time.innerHTML = FreeTime
    
    if(FreeTime< 0) {
        FreeTime = 0
    }
    console.log(FreeTime)
}

if (localStorage.getItem("saveGame") != null) {
    load();
}

// Временной цыкл
let myVar = setInterval(myLoop, 1000);
saveTimer = 0
payTimer = 0
function myLoop() {
    let creditHolder = document.getElementById('credit');
    let salaryInDay = workTime * sallary;
    let creditAll = salaryInDay + credit;
    
    creditHolder.innerHTML = creditAll;
    credit = creditAll
    
    saveTimer++;
    if (saveTimer >= 10) {
        save();
        saveTimer = 0;
    }
    payTimer++
    if(payTimer >= 30) {
        payForAll();
        payTimer = 0;
    }
    manageProjects();
  }
  function refresh() {
    document.getElementById('credit').innerHTML = credit
  }
  function save() {

    var projectsUses = [];
    var projectsFlags = [];
    var projectsActive = [];
    var stratsActive = [];

for(var i=0; i < projects.length; i++){

        projectsUses[i] = projects[i].uses;
        projectsFlags[i] = projects[i].flag;
    
    }

    for(var i=0; i < activeProjects.length; i++){

        projectsActive[i] = activeProjects[i].id;
    
    }
    
       
    saveGame = {
    credit: credit,
    sallary: sallary,
    workTime: workTime,
    stydeTime: stydeTime,
    sleepTime: sleepTime,
     }
    localStorage.setItem("saveGame", JSON.stringify(saveGame));
    localStorage.setItem("saveProjectsUses",JSON.stringify(projectsUses));
    localStorage.setItem("saveProjectsFlags",JSON.stringify(projectsFlags));
    localStorage.setItem("saveProjectsActive",JSON.stringify(projectsActive));
    localStorage.setItem("saveStratsActive",JSON.stringify(stratsActive));
 }


// Загрузка сейва при перезагрузки окна
function load() {

    var loadGame = JSON.parse(localStorage.getItem("saveGame"));
    var loadProjectsUses = JSON.parse(localStorage.getItem("saveProjectsUses"));
    var loadProjectsFlags = JSON.parse(localStorage.getItem("saveProjectsFlags"));
    var loadProjectsActive = JSON.parse(localStorage.getItem("saveProjectsActive"));
    var loadStratsActive = JSON.parse(localStorage.getItem("saveStratsActive"));

    sallary = loadGame.sallary
    workTime = loadGame.workTime
    stydeTime = loadGame.stydeTime
    sleepTime = loadGame.sleepTime
    let slepTimeDisplay = document.getElementById('sleep_display');
    slepTimeDisplay.innerHTML = sleepTime;
let workTimeDisplay = document.getElementById('work_display');
    workTimeDisplay.innerHTML = workTime;
let  stydeTimeDisplay = document.getElementById('styde_display');
    stydeTimeDisplay.innerHTML = stydeTime;
    document.getElementById("work").max = AllTime - sleepTime - stydeTime
    document.getElementById("sleep").max = AllTime -workTime - stydeTime
    document.getElementById("styde").max = AllTime - sleepTime - workTime
let  free_time = document.getElementById('free_time_display');
    FreeTime =  (24 - sleepTime - workTime - stydeTime) 
    free_time.innerHTML = FreeTime
    
    if(FreeTime< 0) {
        FreeTime = 0
    }
    for(var i=0; i < projects.length; i++){

        projects[i].uses = loadProjectsUses[i];
        projects[i].flag = loadProjectsFlags[i];
    
        }
    for(var i=0; i < projects.length; i++){

            if (loadProjectsActive.indexOf(projects[i].id)>=0){
                displayProjects(projects[i]);
                activeProjects.push(projects[i]);
            }
        
     }   
    if(typeof loadGame.credit !== "undefined") credit =  loadGame.credit

}

window.onload = function() {
 load();
}


// Проекты
function displayProjects(project){

    var element = document.getElementById("projectListTop");
    var newProject = document.createElement("button");
    newProject.setAttribute("id", project.id);

    newProject.onclick = function(){project.effect()};

    newProject.setAttribute("class", "projectButton");
    element.appendChild(newProject, element.firstChild);

    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    newProject.appendChild(span);

    var title = document.createTextNode(project.title);
    span.appendChild(title);

    var cost = document.createTextNode(project.priceTag);
    newProject.appendChild(cost);

    var div = document.createElement("div");
    newProject.appendChild(div);

    var description = document.createTextNode(project.description);
    newProject.appendChild(description);

    // blink(project.id);

}

function manageProjects(){

    for(var i = 0; i < projects.length; i++){
        if (projects[i].trigger() && (projects[i].uses > 0)){
            displayProjects(projects[i]);
            projects[i].uses = projects[i].uses - 1;
            activeProjects.push(projects[i]);
        }
    }


    for(var i = 0; i < activeProjects.length; i++){
        if (activeProjects[i].cost()){
            document.getElementById(activeProjects[i].id).disabled = false;
        } else {
            document.getElementById(activeProjects[i].id).disabled = true;
        }
    }
}


// Траты

function payForAll() {
    credit = credit - 60
} 