

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
    for (let teddiInStore of teddiesStore) {
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
      <td class="articlePanier">${teddiInStore.tedName} <img src="${teddiInStore.tedImage}" width= 80px heigt= 80px> ${teddiInStore.tedColor}</td>
      <td class="prixPanier">${teddiInStore.tedPrice}€</td>
      <td class="prixPanier">${teddiInStore.tedQuantite}</td>
      <td class="prixPanier totalPrice"> ${teddiInStore.totalPrice}€  </td>
      <td class="prixPanier trash"> <button class="deleteBtn" data-id=" ${teddiInStore.tedId}" data-color="${teddiInStore.tedColor}"><i class="far fa-trash-alt"></i></button></td>
    </tr>
  </tbody>
</table>`
teddiContainerPanier.appendChild(panierPlein);


 }
    // on affiche le prix total de la commande
    let arrayPrixTotal =[];
    for (let teddiInStore of teddiesStore) {
      let prix = teddiInStore.totalPrice;
      arrayPrixTotal.push(prix);
      console.log(arrayPrixTotal);
      
    }
    let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
    const prixTotalCommande = document.querySelector('#totalPricePanier');
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`
    // on incrémente le panier
     let arrayCompteurPanier =[] ;
     for (const teddiInStore of teddiesStore) {
       let itemQte = teddiInStore.tedQuantite;
       arrayCompteurPanier.push(itemQte);
     }
     let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
     let itemInCart = document.querySelector('#cart-qte');
     itemInCart.innerHTML=`${compteurPanier}`

    // on gère le button supprimer l'article
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    console.log(deleteBtn);
    for (let i = 0; i < deleteBtn.length; i++) {
      console.log(deleteBtn[i].dataset.id);
      console.log(deleteBtn[i].dataset.color);
    }

  
    function deleteTeddi(e) {
      e.preventDefault()
      
      if(window.confirm(`Voulez-vous supprimer cet article du panier?`)){
        console.log(teddiesStore); // renvoie mon tableau d'objet 
       
       const index = teddiesStore.findIndex(index => index.TedId == e.currentTarget(deleteBtn.dataset.id)&& index.color == e.currentTarget(deleteBtn.dataset.color));
        console.log(index);
        teddiesStore.splice(index,1); 
      
        location.reload(alert(`Votre article a bien été supprimé`));

        // enregistrement du nouveau localstorage
      localStorage.setItem("teddiesInCart", JSON.stringify(teddiesStore)) 
      JSON.parse(localStorage.getItem("teddiesInCart"));
       
      } 
      else {
        window.location.href = "panier.html";
      }
    
      
    }
    for(let i= 0;i < deleteBtn.length;i++){
      deleteBtn[i].addEventListener('click', deleteTeddi)  
            
      };

      // Gestion du bouton commander avec affichage du formulaire et disparition du bouton commander
     const validation = document.querySelector('#validate');
     const containerForm = document.querySelector("#container-form");
     function form() {
       if (getComputedStyle(containerForm).display == "none" ||getComputedStyle(validation).display == "block" || getComputedStyle(teddiContainerPanier).display == "block" ){
         // on recupere la valeur courante de la propriété display sur les const avec getComputedStyle(const).display
        containerForm.style.display = "block";
        validation.style.display = "none";
        teddiContainerPanier.style.display = "none";
       }
     }
     validation.addEventListener('click',form);

     // recupération des données du formulaire et de mon tableau de produit au click sur le bouton Envoyez votre commande : 
     const submit = document.getElementById('submitorder');
     submit.addEventListener('click',commandePanier);

     function commandePanier(e) {
       e.preventDefault();
       let orderInput = document.getElementsByTagName('input');
         let contact = {
            firstName: orderInput[0].value,
            lastName: orderInput[1].value,
            address: orderInput[2].value,
            city: orderInput[3].value,
            email: orderInput[4].value
          }

        console.log(contact);
        let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
        console.log(teddiesStore);
        let products = [];
        for (const teddiInStore of teddiesStore) {
             let productsId = teddiInStore.tedId;
             products.push(productsId);
             console.log(products);
         }
        let order = { contact, products };
        console.log(order);
        // requete post 
        const reponseOrder =fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
         body: JSON.stringify(order)
        });
        //reponse de la requete
       reponseOrder.then(async response => {
          try {
           console.log(response);
            let confirmation = await response.json();
            console.log(confirmation);
           if (typeof localStorage != "undefined") {
            localStorage.setItem("confirm", JSON.stringify(confirmation));
           } else {
             alert("localStorage n'est pas supporté");
          }
          localStorage.removeItem("teddiesInCart");
           window.location.href ="confirm.html";
         } catch (error) {
           console.log(error);
         }
        });
        

        

       
     }
    }

    


       
  
 
        
    
   
   

    

    

