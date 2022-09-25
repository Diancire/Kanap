// Récupération de l'id depuis url 
let url = new URL(window.location.href)
let orderId = url.searchParams.get("orderId");

// Affichage du numéro de commande
function appearOrderId(){
    document.querySelector("#orderId").textContent = orderId;
    localStorage.clear();
}
appearOrderId();