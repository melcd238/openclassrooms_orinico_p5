// je stocke l'URL de l'API dans une variable
const url = "http://localhost:3000/api/teddies";
// je crée ma requete
let requete = new XMLHttpRequest;
requete.open('GET', url);
requete.responseType = 'json'; 
requete.send(); // j'envoie ma requete
// Dès qu'on reçoit la réponse, on execute la fonction:
requete.onload = function () { 
    if (requete.readyState === XMLHttpRequest.DONE ) { // je verifie l'état de ma requête. 
        if (requete.status === 200){
            let reponse = requete.response;
            console.log(reponse);

        }
        
    } else {
        alert("Un problème est survenu, merci de réessayer plus tard");
    }
 }