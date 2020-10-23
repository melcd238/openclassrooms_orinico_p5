
const url = "http://localhost:3000/api/teddies";// je stocke l'URL de l'API dans une variable
let teddies=""; 
const teddiesContainer = document.querySelector('#teddies-container');

// je crée ma requete
let requete = new XMLHttpRequest;
requete.open('GET', url);
requete.responseType = 'json'; 
requete.send(); // j'envoie ma requete
// Dès qu'on reçoit la réponse, on execute la fonction:
requete.onload = function () { 
    if (requete.readyState === XMLHttpRequest.DONE ) { // je verifie l'état de ma requête. 
        if (requete.status === 200){
             teddies = requete.response; // je stocke la reponse dans une variable.
            console.log(teddies);
            afficherTeddies(); // J'affiche dynamiquement les teddies en utilisant la fonction.
            }
        
    } else {
        alert("Un problème est survenu, merci de réessayer plus tard");
    }
 }
  // creation de la fonction pour afficher les teddies. 
  function afficherTeddies() {
    teddies.forEach(afficherTeddie);
}
// creation de la fonction pour afficher un teddi
 function afficherTeddie(item) {
     const itemElement = document.createElement('div');  
     itemElement.setAttribute("class","col-lg-5 col-md-6 mb-4 item-card")
     itemElement.innerHTML = `  <div class="card text-center"> <div class="card-header"><h2> ${item.name}</h2>
         <p> ${item.price/100} € </p> </div>
        <div class="card-body"><img class="card-img-top" src="${item.imageUrl}" alt="">
         <p class="card-text">${item.description} </p> </div>
         <div class="card-footer text-muted">
         <button type="button" class="btn btn-secondary btn-lg btn-block" id="${item._id}"><a href="product.html"> Sélectionnez moi </a> </button>
       </div> </div>`;
    teddiesContainer.appendChild(itemElement);
     
 }




