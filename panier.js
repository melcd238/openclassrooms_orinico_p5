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
      <td class="prixPanier trash"> <button class="deleteBtn" data-id=" ${teddiInStore.id}" data-color="${teddiInStore.color}"><i class="far fa-trash-alt"></i></button></td>
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
      
    }
    let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
    const prixTotalCommande = document.querySelector('#totalPricePanier');
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`
    // on incrémente le panier
     let arrayCompteurPanier =[] ;
     for (const teddiInStore of teddiesStore) {
       let itemQte = teddiInStore.quantite;
       arrayCompteurPanier.push(itemQte);
     }
     let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
     let itemInCart = document.querySelector('#cart-qte');
     itemInCart.innerHTML=`${compteurPanier}`

    // on gère le button supprimer l'article
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    console.log(deleteBtn);

    function deleteTeddi(e) {
      e.preventDefault()
      if(window.confirm(`Voulez-vous supprimer cet article du panier?`)){
        let targetId = e.target.getAttribut('data-id');
        console.log(targetId);
        let targetColor = e.target.getAttribut('data-color');
        console.log(targetColor);
      const teddiInStore = teddiesStore.filter(teddi  => teddi.id == targetId && teddi.color == targetColor)[0];
      const index = teddiesStore.indexOf(teddiInStore);
      teddiesStore.splice(index,1); 

        // enregistrement du nouveau localstorage
      localStorage.setItem("teddiesInCart", JSON.stringify(teddiesStore)) 
      JSON.parse(localStorage.getItem("teddiesInCart"));
       
       window.alert(`Votre article a bien été supprimé`);
      } 
      else {
        window.location.href = "panier.html"
      }
      
    }
    for(var i = 0;i < deleteBtn.length-1;i++){
      deleteBtn[i].addEventListener('click', deleteTeddi)  
            
      };
     
     
      
    

    // Gestion du bouton commander avec affichage du formulaire

    // requete Post avec envoi du formulaire et de la commande 
        
    }
   
   

    

    

