const buttonHTML = document.querySelector("#submit-button");
const listOfTodosHTML = document.querySelector("#my-todos");
const warningnTextHTML = document.querySelector("#warning");
const clocktHTML = document.querySelector("#clock");
const deleteButtonHTML = document.querySelector("#delete");
const buttonsWithCheck = document.querySelectorAll(".item-todo")
const motivationalQuoteHTML = document.querySelector("#quote")
let listofTodos = JSON.parse(localStorage.getItem("todos")) || [];
const frasesMotivacionales = [
    {
        "frase": "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
        "autor": "Robert Collier"
    },
    {
        "frase": "La única forma de hacer un gran trabajo es amar lo que haces.",
        "autor": "Steve Jobs"
    },
    {
        "frase": "No cuentes los días, haz que los días cuenten.",
        "autor": "Muhammad Ali"
    },
    {
        "frase": "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
        "autor": "Albert Schweitzer"
    },
    {
        "frase": "No te detengas cuando estés cansado, detente cuando hayas terminado.",
        "autor": "Marilyn Monroe"
    },
    {
        "frase": "La vida es 10% lo que te sucede y 90% cómo reaccionas a ello.",
        "autor": "Charles R. Swindoll"
    },
    {
        "frase": "El fracaso es la oportunidad de comenzar de nuevo con más inteligencia.",
        "autor": "Henry Ford"
    },
    {
        "frase": "No puedes cambiar tu futuro, pero puedes cambiar tus hábitos, y seguramente tus hábitos cambiarán tu futuro.",
        "autor": "A.P.J. Abdul Kalam"
    },
    {
        "frase": "Las grandes cosas nunca vinieron de zonas de confort.",
        "autor": "Neil Strauss"
    },
    {
        "frase": "El mayor riesgo es no tomar ningún riesgo.",
        "autor": "Mark Zuckerberg"
    }
];



const getQuoteFromApiEndpoint = async () => {
    await fetch("https://zenquotes.io/api/random")
        .then((response) => response.json())
        .then((data) => console.log(data))

}



function addElementToList() {

    let inputHTML = document.querySelector("#text-input");

    if (inputHTML.value.trim() === "") {
        warningnTextHTML.textContent = "Necesitas un todo";

        return;
    }

    let idElement = Math.random() * 8;
    warningnTextHTML.textContent = ""

    const array = new Uint32Array(1);

    listofTodos.push({ name: inputHTML.value, id: idElement, styles: "" });

    renderHTMLElements()

    inputHTML.value = ""
    localStorage.setItem("todos", JSON.stringify(listofTodos))
}


const renderHTMLElements = () => {


    if (listofTodos.length === 0) {
        listOfTodosHTML.innerHTML = "<li> Añade tareas</li>"
        return;

    }

    let listOfStringList = "";
    listOfTodosHTML.innerHTML = "";

    for (const list of listofTodos) {
        listOfStringList += `<li
         class="item-todo  ${list.styles}" id="${list.id}"  > 
         <div contenteditable="true" > ${list.name} </div>   <div> 
         <button   class="check" >✅</button>
         <button class="delete">🔴</button>
         
         <button class="favorite">⭐</button>
         
         </div>
           </li>`;
    }

    listOfTodosHTML.innerHTML = listOfStringList;

}



const changeClockTime = () => {

    const date = new Intl.DateTimeFormat('es', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true

    }).format(new Date());

    clocktHTML.innerHTML = date

}

//TODO , tener  que cambiar esta funcion por un worker
setInterval(() => {
    changeClockTime()
}, 1000)



const chooseMotivationalQuote = () => {
    let fraseMotivacional = frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)]

    motivationalQuoteHTML.innerHTML = `<div class="quote-phrase"> "${fraseMotivacional.frase} "</div>  ${fraseMotivacional.autor}`



}

const deleteElements = () => {
    listOfTodosHTML.value = ""
    listofTodos = []
    renderHTMLElements()
    localStorage.setItem("todos", "")
}

buttonHTML.addEventListener("click", addElementToList);
deleteButtonHTML.addEventListener("click", deleteElements)

//Se usa el codigo de "ENTER" para añadir un item
document.querySelector("#text-input").addEventListener("keypress", (event) => {

    if (event.charCode === 13) {
        addElementToList()
    }
})
document.querySelector("#my-todos").addEventListener("click", (event) => {
    const parentElement = event.target.closest(".item-todo")
    let elementId = parentElement.getAttribute("id")


    if (event.target.classList.contains("check")) {
        {

            let styleChange = parentElement.classList.toggle("check-full") ? "check-full" : ""
            const todoFindIdenx = listofTodos.findIndex(todo => todo.id === Number(elementId))

            if (todoFindIdenx !== -1) {
                listofTodos[todoFindIdenx].styles = styleChange

                localStorage.setItem("todos", JSON.stringify(listofTodos));
            }

            return;

        }
    }

    if (event.target.classList.contains("delete")) {
        {



            let newListOfTodos = listofTodos.filter(todo => todo.id != elementId)

            console.log((newListOfTodos));

            listofTodos = newListOfTodos;
            localStorage.setItem("todos", JSON.stringify(listofTodos))
            renderHTMLElements()

            return;

        }
    }


    if (event.target.classList.contains("favorite")) {
        {

            let styleChange = parentElement.classList.toggle("favorite-todo") ? " favorite-todo" : ""

            console.log(elementId)


            const todoFindIdenx = listofTodos.findIndex(todo => todo.id === Number(elementId))

            if (todoFindIdenx !== -1) {
                listofTodos[todoFindIdenx].styles += styleChange
                console.log[listofTodos[todoFindIdenx]]

                localStorage.setItem("todos", JSON.stringify(listofTodos));
            }



            // listofTodos = newListOfTodos;
            // localStorage.setItem("todos",JSON.stringify(listofTodos))
            // renderHTMLElements()


            return;
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    renderHTMLElements()
    chooseMotivationalQuote()
})
