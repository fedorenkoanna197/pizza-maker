// Ціна піци

let form = document.querySelectorAll("#pizza input");
let price = document.querySelector(".price > p");
let span = document.createElement("span");
let sauces = document.querySelector(".sauces");
let topings = document.querySelector(".topings");
let pizzaPrice = 0;
let soucePrice = 0;
let topingPrice = 0;
let finish = 0;
price.append(span);


const size = (sizeValue) => {
    if (sizeValue === "small") {
        pizzaPrice = 100;
    }
    if (sizeValue === "mid") {
        pizzaPrice = 150;
    }
    if (sizeValue === "big") {
        pizzaPrice = 200;
    }
    return pizzaPrice;
}

const finishPrice = () => {
    finish = pizzaPrice + soucePrice + topingPrice;
    span.innerText = `${finish}`;
}

form.forEach((element) => {
    element.addEventListener("click", (e) => {
        size(e.target.value)
        finishPrice();
    })
    if (element.checked == true) {
        size(element.value);
        finishPrice();
    }
})
// Валідація форми
const validate = (target) => {
    switch (target.name) {
        case "name": return /^[А-яA-z]{2,}$/i.test(target.value);
        case "phone": return /^\+380\d{9}$/.test(target.value);
        case "email": return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(target.value);

    }
}

let [...form2] = document.querySelectorAll(".grid  input");

let input = form2.map((element) => {
    return element;
}).filter((element) => {
    return element.classList != "button";
});

let btn = document.querySelector("[type=button]");

input.forEach((element)=>{
    element.addEventListener("change", (e)=>{
        if(!validate(e.target)){
            e.target.style.backgroundColor = "red";
        } else{
            e.target.style.backgroundColor = "green";
        }
    })
})


btn.addEventListener("click", () => {
    let rezInput = input.map((element) => {
        return validate(element);

    })
    if (!rezInput.includes(false)) {
        document.location = "./thank-you.html";
    } else {
        alert("Помилка в заповненні форми");
    }
})
// Скидання форми
let reset = document.querySelector("[type=reset");

reset.addEventListener("click", () => {
    input.forEach((element) => {
        element.value = "";
        element.style.backgroundColor = "white";
    })
})

// Невловимий банер
let baner = document.querySelector("#banner");
let btnBaner = document.querySelector("#banner button");

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

btnBaner.addEventListener("mouseover", (e) => {
    baner.style.right = Math.floor(getRandomArbitrary(1, 80)) + "%";
    baner.style.bottom = Math.floor(getRandomArbitrary(1, 80)) + "%";
    baner.style.left = "auto";
    baner.style.top = "auto";
})
// Drag & drop

let [...ingridients] = document.querySelectorAll(".draggable");

ingridients.forEach((element) => {
    element.addEventListener("dragstart", function (e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("Text", this.id);
    }, false);
})

let target = document.querySelector(".table");

target.addEventListener("dragover", function (e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}, false)

const souse = (id) => {

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");


    switch (id) {
        case "sauceClassic": div1.innerHTML += "Кетчуп";
            div1.setAttribute("id", id);
            sauces.append(div1);
            break;
        case "sauceBBQ": div2.innerHTML += 'BBQ';
            div2.setAttribute("id", id);
            sauces.append(div2);
            break;
        case "sauceRikotta": div3.innerHTML += "Рiкотта";
            div3.setAttribute("id", id);
            sauces.append(div3);
            break;
        default: return false;

    }
    return true;
}
const toping = (id) => {

    let div4 = document.createElement("div");
    let div5 = document.createElement("div");
    let div6 = document.createElement("div");
    let div7 = document.createElement("div");
    let div8 = document.createElement("div");
    let div9 = document.createElement("div");

    switch (id) {
        case "moc1": div4.innerHTML += "Сир звичайний";
            div4.setAttribute("id", id);
            topings.append(div4);
            break;
        case "moc2": div5.innerHTML += 'Сир фета';
            div5.setAttribute("id", id);
            topings.append(div5);
            break;
        case "moc3": div6.innerHTML += "Моцарелла";
            div6.setAttribute("id", id);
            topings.append(div6);;
            break;
        case "telya": div7.innerHTML += "Телятина";
            div7.setAttribute("id", id);
            topings.append(div7);
            break;
        case "vetch1": div8.innerHTML += "Помiдори";
            div8.setAttribute("id", id);
            topings.append(div8);
            break;
        case "vetch2": div9.innerHTML += "Гриби";
            div9.setAttribute("id", id);
            topings.append(div9);
            break;
        default: return false;
    }
    return true;
}

target.addEventListener("drop", function (e) {

    let id = e.dataTransfer.getData("Text");
    let elem = document.getElementById(id);
    let clon = elem.cloneNode();

    if (this.appendChild(clon)) {
        elem.draggable = false;
        elem.style.opacity = "0.5";
    }
    if (souse(clon.id) == true) {
        soucePrice += 10;
        finishPrice();
    }
    if (toping(clon.id) == true) {
        topingPrice += 15;
        finishPrice();
    }


    // Видалення топінгів і соусів 

    sauces.addEventListener("click", (e) => {

        if (e.target.id === clon.id) {

            e.target.remove();
            clon.remove();
            elem.draggable = true;
            elem.style.opacity = "1";
            soucePrice -= 10;
            finishPrice();

        }
       
    })
    topings.addEventListener("click", (e) => {
        if (e.target.id === clon.id) {
            e.target.remove();
            clon.remove();
            elem.draggable = true;
            elem.style.opacity = "1";
            topingPrice -= 15;
            finishPrice();
        }


    })
}, false)


