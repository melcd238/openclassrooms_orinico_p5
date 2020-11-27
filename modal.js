const body = document.querySelector("body");


let calc;
let modal;
let confirmation;
let cancel;


const createCalc = ()=>{
   calc=document.createElement("div");
   calc.classList.add("calc");
}
const createModal =(question)=>{
    modal = document.createElement("div");
    modal.classList.add("modale");
    modal.innerHTML= `<p> ${question} </p>`;
    confirmation = document.createElement("button");
    confirmation.classList.add("btn", "btn-secondary");
    confirmation.innerText= "Confirmer";
    cancel = document.createElement("button");
    cancel.classList.add("btn", "btn-secondary");
    cancel.innerText = "Panier";
    modal.append(confirmation, cancel);
    confirmation.addEventListener('click', ()=>{
        window.location.href= "index.html";
    });
    cancel.addEventListener('click', ()=>{
        window.location.href= "panier.html";
    });
}


function openModal(question) {
    createCalc();
    createModal(question);
   calc.append(modal);
    body.append(calc);
   
    
}