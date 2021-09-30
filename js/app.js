const dropdown = document.getElementById('dropdown')
const ullimit = document.querySelector('.ul-limit')
const tasktext = document.getElementById('task-text')
const form = document.querySelector('form')
const mytodo = document.querySelector(".todo-body")

// criar datas personalizadas
const date = new Date
const ddMMyyyy = date.toLocaleDateString()

// atribuir data ao input data de criacao
const datecreation = document.getElementById('date-creation')
datecreation.valueAsDate = date

// data formato yyy-MM-dd
const yyyMMdd = datecreation.value

// atribuir data ao input data final
const dateFinal = document.getElementById('input-limit')
dateFinal.setAttribute("min", yyyMMdd)

// atribuir id unico as tarefas
let idStorage
if (!localStorage.getItem('idStorage')) {
    localStorage.setItem('idStorage', 1)
    idStorage = 1
} else {
    idStorage = localStorage.getItem('idStorage')
}

// funcoes para criar elementos html
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

// funcao para gerar a tarefa
function createTask() {

    const taskrow = divRow()
    taskrow.classList.add("todo-list")
    taskrow.setAttribute("id", idStorage)
    const taskchek = divCol()
    taskchek.classList.replace("col", "col-auto")

    const taskcheckinput = input()
    taskcheckinput.setAttribute("type", "checkbox")
    taskcheckinput.setAttribute("onclick", `animatedList(${idStorage})`)

    const taskdescription = divCol()
    taskdescription.classList.add('text-break')

    taskdescription.innerHTML = tasktext.value

    const taskDateLimit = divCol()
    const taskSpan = span()

    taskDateLimit.appendChild(taskSpan)
    taskSpan.classList.add('date-limit')
    taskSpan.innerHTML += `<i class="fas fa-hourglass-half"></i> `
    taskSpan.innerHTML += dateformat(dateFinal.value)

    const taskDateCreation = divCol()
    taskDateCreation.classList.replace("col", "col-auto")
    taskDateCreation.innerHTML += `<i class="fas fa-info-circle"></i> `
    taskDateCreation.innerHTML += dateformat(datecreation.value)

    const taskDelete = divCol()
    taskDelete.classList.replace("col", "col-auto")

    const taskAncora = a()
    taskAncora.setAttribute('href', '#')
    taskAncora.setAttribute('onclick', `removeList(${idStorage})`)
    taskAncora.innerHTML += `<i class="fas fa-trash-alt"></i>`

    taskrow.appendChild(taskchek)
    taskchek.appendChild(taskcheckinput)
    taskDelete.appendChild(taskAncora)
    taskrow.appendChild(taskdescription)
    taskrow.appendChild(taskDateLimit)
    taskrow.appendChild(taskDateCreation)
    taskrow.appendChild(taskDelete)

    mytodo.appendChild(taskrow)

    const dados = { desc: tasktext.value, datFinal: dateFinal.value, datCreat: datecreation.value }
    localStorage.setItem(idStorage, JSON.stringify(dados))

    ++idStorage
    localStorage.idStorage = idStorage
    form.reset()
    datecreation.valueAsDate = date
}

// form onsubmit criar tarefa
form.onsubmit = (event) => {
    event.preventDefault();
    createTask()
}

// funcao para formatar data 28 Set
function dateformat(parm) {
    const mmDD = parm.split("-")
    switch (mmDD[1]) {
        case "01":
            return `${mmDD[2]} Jan`
        case "02":
            return `${mmDD[2]} Fev`
        case "03":
            return `${mmDD[2]} Març`
        case "04":
            return `${mmDD[2]} Abril`
        case "05":
            return `${mmDD[2]} Maio`
        case "06":
            return `${mmDD[2]} Jun`
        case "07":
            return `${mmDD[2]} Jul`
        case "08":
            return `${mmDD[2]} Agost`
        case "09":
            return `${mmDD[2]} Set`
        case "10":
            return `${mmDD[2]} Out`
        case "11":
            return `${mmDD[2]} Nov`
        case "12":
            return `${mmDD[2]} Dez`
        default:
            break;
    }
}

// validar alteracoes nos inputs
form.onchange = () => {
    ullimit.classList.remove('is-invalid')
    dropdown.classList.remove('is-invalid')
    tasktext.classList.remove('is-invalid')
    if (!tasktext.checkValidity()) {
        tasktext.classList.add('is-invalid')
    }
    if (!dateFinal.checkValidity()) {
        dropdown.classList.add('is-invalid')
        ullimit.classList.add('is-invalid')
    }
}

// função que remove a tarefa caso o confirm retorne positivo
function removeList(id) {
    let result = confirm("To delete a task, press OK");
    if (result) {
        let element = document.getElementById(id)
        localStorage.removeItem(id)
        element.remove()
    }
}



// animacao para a tarefa
function animatedList(params) {
    let element = document.getElementById(params)
    let input = element.querySelector('.form-check-input')
    element.classList.remove('animationList')
    if (input.checked) {
        element.classList.add('animationList')
    }
}
// Carregar informaçõs do localstorage quando página carregada
window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "idStorage") { continue }

        let dadosJson = JSON.parse(localStorage.getItem(localStorage.key(i)))
        onLoadcreateTask(dadosJson.datFinal, dadosJson.desc, dadosJson.datCreat, localStorage.key(i))
    }
}

// funcão para capturar objetos no local storage
function onLoadcreateTask(datefin, descric, datecreat, idStor) {

    const taskCol = divCol()

    const taskrow = divRow()
    taskrow.classList.add("todo-list")
    taskrow.setAttribute("id", `${idStor}`)

    const taskchek = divCol()
    taskchek.classList.replace("col", "col-auto")

    const taskcheckinput = input()
    taskcheckinput.setAttribute("type", "checkbox")
    taskcheckinput.setAttribute("class", "form-check-input")
    taskcheckinput.setAttribute("onclick", `animatedList(${idStor})`)

    const taskdescription = divCol()
    taskdescription.classList.add('text-break')

    taskdescription.innerHTML = `${descric} `

    const taskDateLimit = divCol()
    const taskSpan = span()

    taskDateLimit.appendChild(taskSpan)
    taskSpan.classList.add('date-limit')
    taskSpan.innerHTML += `<i class="fas fa-hourglass-half"></i> `
    taskSpan.innerHTML += dateformat(datefin)

    const taskDateCreation = divCol()
    taskDateCreation.classList.replace("col", "col-auto")
    taskDateCreation.innerHTML += `<i class="fas fa-info-circle"></i> `
    taskDateCreation.innerHTML += dateformat(datecreat)

    const taskDelete = divCol()
    taskDelete.classList.replace("col", "col-auto")

    const taskAncora = a()
    taskAncora.setAttribute('href', '#')
    taskAncora.setAttribute('onclick', `removeList(${idStor})`)
    taskAncora.innerHTML += `<i class="fas fa-trash-alt"></i>`

    taskrow.appendChild(taskchek)
    taskchek.appendChild(taskcheckinput)
    taskDelete.appendChild(taskAncora)
    taskrow.appendChild(taskdescription)
    taskrow.appendChild(taskDateLimit)
    taskrow.appendChild(taskDateCreation)
    taskrow.appendChild(taskDelete)

    mytodo.appendChild(taskrow)
}