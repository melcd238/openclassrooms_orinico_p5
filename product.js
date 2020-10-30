const urlApi = "http://localhost:3000/api/teddies";
const searchParams = new URLSearchParams(window.location.search);
const itemId = searchParams.get("id");
const urlApiId = urlApi + "/"+itemId;
console.log(itemId);
const teddiContainer = document.querySelector('#container-teddi');



const appelDeApi = async function ()  {
    let response = await fetch(urlApiId);
    if (response.ok) {
      let item = await response.json();
      console.log(item);
      //fonction pour afficher l ' item
    
      afficherUnItem(item);
     }


}



function afficherUnItem(item) {
  
  let itemTeddie = document.createElement("div");
  itemTeddie.innerHTML = `  <div class="card text-center"> <div class="card-header"><h2> ${item.name}</h2>
  <p> ${item.price/100} € </p> </div>
 <div class="card-body"><img class="card-img-top" src="${item.imageUrl}" alt="">
  <p class="card-text">${item.description} </p> </div>
 <div class="card-footer text-muted">
  <div class="card-footer text-muted">
  <form>
  <div class="form-group">
    <label for="quantité">Choisissez une quantité (<em> Dans la limite de 5 oursons </em>) </label>
    <select class="form-control" id="qte" name="quantité">
    </select>
  </div>
  <div class="form-group">
  <label>Choisissez une couleur </label>
  <select class="form-control" id="choix-couleur">
  </select>
  </div>
  </form>
  <button type="button" class="btn btn-secondary btn-lg btn-block" ><a href="#"> Ajoutez au panier </a> </button>
  </div> </div>`;


teddiContainer.appendChild(itemTeddie);
compteur();
optionCouleur(item);
  
};

// fonction pour la quantité
function compteur() {
  let optionQuantite = document.getElementById("qte");
  for (let nbr = 1; nbr <= 5; nbr++) {
     let newQuantite = document.createElement("option");
     newQuantite.innerText += nbr;
     optionQuantite.append(newQuantite);
   }
}
// fonction pour afficher les options de couleurs.
function optionCouleur(item) {
  let optionCouleur = document.getElementById("choix-couleur")
  for (let i = 0; i < item.colors.length; i++) {
    let newOptionCouleur = document.createElement("option");
    newOptionCouleur.innerText = item.colors[i];
    optionCouleur.append(newOptionCouleur);
  }

  
}


appelDeApi();

