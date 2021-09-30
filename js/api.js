const url = "https://jsonplaceholder.typicode.com/todos/"
const dateLimite = document.getElementById('date-limit')
const datecreation = document.getElementById('date-creation')
const mytodo = document.querySelector("main")

datecreation.valueAsDate = new Date
const date = datecreation.value
dateLimite.setAttribute("min", date)

const options = { method: 'GET', mode: 'cors', cache: 'default' };

fetch(url, options)
.then((resp) => resp.json())
.then(function(data) {

    let users = data
    return users.map(function(user){

        createTask(user.id, user.title, user.completed)
    })

}).catch(function(error) {

    console.log(error)
});

function createTask(id, title, completed) {
    const taskCol = divCol()

    const taskrow = divRow()
    taskrow.classList.add("todo-list")

    const taskchek = divCol()
    taskchek.classList.replace("col","col-auto")

    const taskcheckinput = input()
    taskcheckinput.setAttribute("type", "checkbox")
    taskcheckinput.setAttribute("class", "form-check-input")
    if (completed) {
        taskcheckinput.checked = true
        taskrow.classList.add("animationList")
    }

    const taskdescription = divCol()
    taskdescription.classList.add('text-break')

    taskdescription.innerHTML = `${title} `

    const taskDateLimit = divCol()
    const taskSpan = span()

    taskDateLimit.innerHTML += `<i class="fas fa-hourglass-half"></i> `
    taskDateLimit.innerHTML += id 

    const taskDateCreation = divCol()
    taskDateCreation.classList.replace("col","col-auto")
    taskDateCreation.innerHTML += `<i class="fas fa-info-circle"></i> `
    taskDateCreation.innerHTML += dateformat(datecreation.value) 

    const taskDelete = divCol()
    taskDelete.classList.replace("col","col-auto")

    taskrow.appendChild(taskchek)
    taskchek.appendChild(taskcheckinput)
    taskrow.appendChild(taskdescription)
    taskrow.appendChild(taskDateLimit)
    taskrow.appendChild(taskDateCreation)
    taskrow.appendChild(taskDelete)
    taskCol.appendChild(taskrow)
    mytodo.appendChild(taskCol)
}


function dateformat(parm) {
    const date = parm.split("-")
    switch (date[1]) {
        case "01":
            return `${date[2]} Jan`
        case "02":
           return `${date[2]} Fev`
        case "03":
           return `${date[2]} Març`
        case "04":
           return `${date[2]} Abril`
        case "05":
          return  `${date[2]} Maio`
        case "06":
          return  `${date[2]} Jun`
        case "07":
          return  `${date[2]} Jul`
        case "08":
          return `${date[2]} Agost`
        case "09":
            return `${date[2]} Set`
        case "10":
           return `${date[2]} Out`
        case "11":
           return `${date[2]} Nov`
        case "12":
            return `${date[2]} Dez`
        default:
            break;
    }
}

function removeList(params) {
    let element = document.getElementById(params)
    element.remove()
}

function animatedList(params) {
    let element = document.getElementById(params)
    let input = element.querySelector('.form-check-input')
    element.classList.remove('animationList')
    if(input.checked){
        element.classList.add('animationList')
    }
}
function a() {
    const a = document.createElement('a')
    return a;
}

function div() {
    const div = document.createElement('div')
    return div;
}
function divRow() {
    const div = document.createElement('div')
    div.setAttribute("class", "row")
    return div;
}
function divCol() {
    const div = document.createElement('div')
    div.setAttribute("class", "col")
    return div;
}
function input() {
    const input = document.createElement('input')
    input.setAttribute('class', 'form-check-input')
    return input;
}
function span() {
    const span = document.createElement('span')
    return span;
}