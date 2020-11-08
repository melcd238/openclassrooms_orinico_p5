// recuperer les données stocker dans le localstorage 
function recupTeddies() {
    let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
    if (teddiesStore === null || teddiesStore === "undefined") {
        teddiesStore = [];
    }
    return teddiesStore;  
}
// 
const teddiContainerPanier = document.querySelector("#container-panier");


let teddiesStore = recupTeddies();
// affichage des articles dans le panier 
// si le panier est vide
if (teddiesStore.length === 0 || teddiesStore === null) {
    let panierVide = document.createElement("div");
    panierVide.innerHTML = `<p> Votre panier est vide </p>
    <button type="button" class="btn btn-secondary btn-lg btn-block" > <a href = "index.html"> Retour au store</a> </button> `
    teddiContainerPanier.appendChild(panierVide);

} else {
    // si il y a des produits dans le panier
    // on affiche les articles dans le panier
    for (const teddiInStore of teddiesStore) {
        console.log(teddiInStore);
        let panierPlein = document.createElement("table");
panierPlein.setAttribute("class","table table-striped")
panierPlein.innerHTML = ` 
  <thead>
    <tr>
      <th scope="col">Article</th>
      <th scope="col">Prix unitaire</th>
      <th scope="col">Quantité</th>
      <th scope="col"> Prix total</th>
      <th scope="col">Supprimer l'article</th>
    </tr>
  </thead>
  <tbody>
    <tr class="list-products-panier">
      <td class="articlePanier">${teddiInStore.name} <img src="${teddiInStore.image}" width= 80px heigt= 80px> ${teddiInStore.color}</td>
      <td class="prixPanier">${teddiInStore.price}€</td>
      <td class="prixPanier">${teddiInStore.quantite}</td>
      <td class="prixPanier totalPrice"> ${teddiInStore.totalPrice}€  </td>
      <td class="prixPanier trash"> <button class="deleteItem"><i class="far fa-trash-alt"></i></button></td>
    </tr>
  </tbody>
</table>`
teddiContainerPanier.appendChild(panierPlein);

 }
    // on affiche le prix total de la commande
    let arrayPrixTotal =[];
    for (const teddiInStore of teddiesStore) {
      let prix = teddiInStore.totalPrice;
      arrayPrixTotal.push(prix);
      console.log(arrayPrixTotal);
    }
    let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
    console.log(prixTotal);
    const prixTotalCommande = document.querySelector('#totalPricePanier');
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`
    // on incrémente le panier
     let arrayCompteurPanier =[] ;
     for (const teddiInStore of teddiesStore) {
       let itemQte = teddiInStore.quantite;
       arrayCompteurPanier.push(itemQte);
       console.log(arrayCompteurPanier);
     }
     let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
     console.log(compteurPanier);
     let itemInCart = document.querySelector('#cart-qte');
     console.log(itemInCart)
     itemInCart.innerHTML=`${compteurPanier}`

    // on gère le button supprimer l'article
    const deleteItem = document.querySelector(".deleteItem");
    console.log(deleteItem);
    deleteItem.addEventListener('click', ()=>{
      for (const teddiInStore of teddiesStore) {
        let teddiName= teddiInStore.name;
        window.confirm(`Voulez-vous supprimer ${teddiName} du panier?`);
      }
      
    })
        
    }
   
   

    

    

