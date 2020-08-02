var projects = [];
var activeProjects = [];

var project1 = {
    id: "projectButton1",
    title: "Повышение квалификации",
    priceTag: "(110 кредитов)",
    description: "Увеличивает зарплату",
    trigger: function(){return credit>=102},
    uses: 1,
    cost: function(){return credit>=110},
    flag: 0,
    effect: function(){
        project1.flag = 1;
        sallary = 0.5
        var element = document.getElementById("projectButton1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(project1);
        activeProjects.splice(index, 1);
    }
}

projects.push(project1);

