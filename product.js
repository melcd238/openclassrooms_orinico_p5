const urlApi = "http://localhost:3000/api/teddies";
const searchParams = new URLSearchParams(window.location.search);
const itemId = searchParams.get("id");
const urlApiId = urlApi + "/"+itemId;
console.log(itemId);
const teddiContainer = document.querySelector('#container-teddi');
let btn = document.querySelector(".add-to-cart");
  console.log(btn);



const appelDeApi = async function ()  {
    let response = await fetch(urlApiId);
    if (response.ok) {
      let item = await response.json();
      console.log(item);
      //fonction pour afficher l ' item
      afficherUnItem(item);
      btn.addEventListener("click",()=>{
        let choixTeddi = {
          name : item.name,
          id   : item._id,
          image: item.imageUrl,
          price: item.price/100,
          color: document.getElementById("choix-couleur").value,
          quantite : document.getElementById("qte").value
        };
        if(typeof localStorage != "undefined"){
          // on recupère la valeur dans le Web Storage
        let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
              if (teddiesStore === null || teddiesStore === "undefined") {
                teddiesStore = []; // on crée le tableau 
               
                 } 
               if(teddiesStore) {
                teddiesStore.push(choixTeddi); // si le tableau existe on push le choix du teddi
               } 
              localStorage.setItem("teddiesInCart", JSON.stringify(teddiesStore));
              if (window.confirm(`${item.name} a bien été ajouté au panier. Voulez-vous continuer vos achat?`)) {
                window.location.href = "index.html";
                
              } else {
                window.location.href = "panier.html";
              }
            } else {
              alert("localStorage n'est pas supporté");
            }
           
      });
  
      
     }
};

//fonction pour afficher l'item
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
};
// fonction pour afficher les options de couleurs.
function optionCouleur(item) {
  let optionCouleur = document.getElementById("choix-couleur")
  for (let i = 0; i < item.colors.length; i++) {
    let newOptionCouleur = document.createElement("option")
    newOptionCouleur.innerText = item.colors[i];
    optionCouleur.append(newOptionCouleur);
  }
};
appelDeApi();

