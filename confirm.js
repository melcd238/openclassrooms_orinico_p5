// recuperation de la reponse de confirmation
let confirmation = JSON.parse(sessionStorage.getItem("confirm"));
console.log(confirmation);

// affichage de la confirmation de commande
affichageConfirmOrder();



    function affichageConfirmOrder() {
    const confirmOrder = document.getElementById('confirmationOrder');
     confirmOrder.innerText = ` Merci de votre commande n°: ${confirmation.orderId}.
     Vous allez recevoir un mail de confirmation à cette adresse : ${confirmation.contact.email}.
     Si vous ne recevez pas d'email, merci de contacter notre service client. `; 
     
    }

 // supression du sessionStorage    

 sessionStorage.clear();