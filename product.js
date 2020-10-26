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
      function afficherUnItem(item) {
        let itemTeddie = document.createElement("div");
        itemTeddie.innerHTML = `  <div class="card text-center"> <div class="card-header"><h2> ${item.name}</h2>
        <p> ${item.price/100} € </p> </div>
       <div class="card-body"><img class="card-img-top" src="${item.imageUrl}" alt="">
        <p class="card-text">${item.description} </p> </div>
        <div class="card-footer text-muted">
        <button type="button" class="btn btn-secondary btn-lg btn-block" ><a href="#"> Ajoutez au panier </a> </button>
      </div> </div>`;
      teddiContainer.appendChild(itemTeddie);
        
      }
      afficherUnItem(item);
     
}

}

appelDeApi();

