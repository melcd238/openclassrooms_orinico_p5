const confirmOrder = document.getElementById('confirmationOrder');
// recuperation de la reponse de confirmation
let confirmation = JSON.parse(localStorage.getItem("confirm"));
console.log(confirmation);
// affichage de la confirmation de commande