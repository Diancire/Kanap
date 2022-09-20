// Récupération de l'Id 
const cartItems = document.getElementById("cart__items");

// Récupération des données du Local Storage
function localCart(){
    let toCart = JSON.parse(localStorage.getItem("cart"));
    return toCart;
}


let cart = localCart();
// Si le panier est vide 
if(cart === null || cart == 0){
    let emptyCart = "Votre panier est vide";
    cartItems.innerText = emptyCart;
}
// Sinon on affiche les éléments du panier 
else { 
// Récupération des données de l'Api
function retrieveApi (){
    fetch("http://localhost:3000/api/products")
    .then (function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then (function(data){
        let api = data; 
        let cart = localCart();
        appearCart(api, cart);
    });
}

// Fonction pour afficher la page panier 
 function appearCart(api, cart){
    // Boucle qui permet d'aller récupérer tous les produits dans le Local Storage
    for(let products of cart){
        // On créer une variable pour retrouver dans l'API les données correspondant au Local Storage
        let apiData = api.find(e => e._id == products.id);
        // Création de l'élément article
        let cartArticle = document.createElement('article');
        cartArticle.classList.add("cart__item");
        cartArticle.dataset.id = products.id
        cartArticle.dataset.color = products.color;
        cartItems.appendChild(cartArticle);
        // Création de l'élément div cart__item__img
        let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        cartArticle.appendChild(cartItemImg);
        // Création de l'image 
        let cartImg = document.createElement("img");
        cartImg.src = apiData.imageUrl;
        cartImg.alt = apiData.altTxt;
        cartItemImg.appendChild(cartImg);

        // Création de l'élément div cart__item__content
        let cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        cartArticle.appendChild(cartItemContent);
        // Création de l'élément div cart__item__content__description
        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemContentDescription);
        // Création du titre
        let cartDescriptionName = document.createElement('h2');
        cartDescriptionName.textContent = apiData.name;
        cartItemContentDescription.appendChild(cartDescriptionName);
        // Création de la couleur
        let cartDescriptionColor = document.createElement('p');
        cartDescriptionColor.textContent = products.color;
        cartItemContentDescription.appendChild(cartDescriptionColor);
        // Création du prix 
        let cartDescriptionPrice = document.createElement("p");
        cartDescriptionPrice.textContent = apiData.price + "€";
        cartItemContentDescription.appendChild(cartDescriptionPrice);
        // Création de l'élément div cart__item__content__settings
        let cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        cartItemContent.appendChild(cartItemContentSettings);
        // Création de l'élément div cart__item__content__settings__quantity
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        // Création de la Qté
        let cartQte = document.createElement("p");
        cartQte.textContent = "Qté : ";
        cartItemContentSettingsQuantity.appendChild(cartQte);
        // Création de la quantité
        let itemQuantity = document.createElement("input");
        itemQuantity.className = 'itemQuantity';
        itemQuantity.type = "number";
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = 1 ;
        itemQuantity.max = 100 ;
        itemQuantity.value = products.quantity;
        cartItemContentSettingsQuantity.appendChild(itemQuantity);
        // Modification de la quantité d'un produit
        cartItemContentSettingsQuantity.addEventListener("change",function(e){
            // Variable pour trouver l'élément parent "article"
            let getArticle = e.target.closest("article");
            // Variable pour récupérer l'id du produit
            let dataId = getArticle.dataset.id;
            // Variable pour récupérer la couleur du produit
            let dataColor = getArticle.dataset.color;
            // Variable pour rechercher et comparer l'id et la couleur des objets a modifié
            let getModifyProduct = cart.find((e) => e.id == dataId && e.color == dataColor);
            if (getModifyProduct) {
                getModifyProduct.quantity = Number(itemQuantity.value);
                localStorage.setItem("cart", JSON.stringify(getModifyProduct));
            } 
            else {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            cartTotalQuantity(cart);
            cartTotalPrice(api, cart);
        });
        // Création de l'élément div cart__item__content__settings__delete
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.className = 'cart__item__content__settings__delete';
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        // Création de l'élément "Supprimer"
        let itemDelete = document.createElement("p");
        itemDelete.classList.add("deleteItem");
        itemDelete.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(itemDelete);

        // Permet de supprimer un produit au click 
        itemDelete.addEventListener("click",function (e){
            if (window.confirm("Voulez-vous supprimer ce produit")) {
                let getArticle = e.target.closest("article");
                let dataId = getArticle.dataset.id;
                let dataColor = getArticle.dataset.color;
                // Variable qui permet de récupérer l'id et la couleur précise que l'on veut supprimer
                let getDelelteItem = cart.filter(e => e.id != dataId || e.color != dataColor);
                // Permet de supprimer le produit du Local Storage
                cartItems.removeChild(getArticle);
                // On met à jour le panier 
                localStorage.setItem("cart", JSON.stringify(getDelelteItem));
                // On actualise la page
                window.location.reload();
                }
            });
    }
    // Appel des fonctions pour calculer le prix total du panier 
    cartTotalQuantity(cart);
    cartTotalPrice(api, cart);
}

// Permet de récupérer la quantité d'élément dans le panier
function cartTotalQuantity(cart) {
    let totalQuantity = 0;
    for (let products of cart){
        totalQuantity += products.quantity;
    }
    document.getElementById("totalQuantity").textContent = totalQuantity;
}

// Permet de calculer le prix total du panier 
function cartTotalPrice(api, cart){
    let totalPrice = 0;
    for (let products of cart) {
        let apiData = api.find((e) => e._id == products.id);
        totalPrice += Number(products.quantity) * Number(apiData.price);
    }
    document.getElementById("totalPrice").textContent = totalPrice;
}


// Appel de l'Api 
retrieveApi();

}

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const orderSubmit = document.querySelector("#order");

// Création des expressions régulières
// Email
let emailReg = /(^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$)/;
// Nom, prénom et ville
let nameReg = /^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){2,}$/;
// Adresse
let addressReg = /(^.{1,}[a-zA-ZÀ-ÿ0-9]+$)/;

let formulaire = document.querySelector("cart__order__form");

// Validation des données saisies par l'utilisateur dans le formulaire
function userForm() {

    // Validation du Nom
    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    firstName.addEventListener("change", function(e){
        let value = e.target.value;
        // On teste la RegExp, si elle renvoie true 
        if (nameReg.test(value)) {
            firstNameErrorMsg.textContent = "";
        } 
        // Sinon elle renvoie false
        else {
            firstNameErrorMsg.textContent = "Le prénom doit être composé de lettre uniquement.";
        }
    })

    // Validation du Prénom
    let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
    lastName.addEventListener("change", function(e){
        let value = e.target.value;
        if (nameReg.test(value)) {
            lastNameErrorMsg.textContent = "";
        } else {
            lastNameErrorMsg.textContent = "Le nom doit être composé de lettre uniquement.";
        }
    })

    // Validation de l'adresse
    let addressErrorMsg = document.querySelector("#addressErrorMsg");
    address.addEventListener("change", function(e){
        let value = e.target.value;
        if (addressReg.test(value)) {
            addressErrorMsg.textContent = "";
        } else {
            addressErrorMsg.textContent = "Veuillez saisir une adresse valide";
        }
    })

    // Validation de la ville
    let cityErrorMsg = document.querySelector("#cityErrorMsg");
    city.addEventListener("change", function(e){
        let value = e.target.value;
        if (nameReg.test(value)) {
            cityErrorMsg.textContent = "";
        } else {
            cityErrorMsg.textContent = "Veuillez saisir une ville valide";
        }
    })
    // Validation de l'email
    let emailErrorMsg = document.querySelector("#emailErrorMsg");
    email.addEventListener("change", function(e){
        let value = e.target.value;
        if (emailReg.test(value)) {
            emailErrorMsg.textContent = "";
        } else {
            emailErrorMsg.textContent = "Veuillez saisir un email valide";
        }
    })
}

userForm();

// Envoie du formulaire au clique du bouton commander 
orderSubmit.addEventListener("click", function(e){
    e.preventDefault();
    // Si le panier est vide 
    if (cart === null || cart == 0){
        alert("Votre panier est vide");
    }
    // Si tous les champs ne sont pas remplis
    else if (firstName.value ==="" || lastName.value ==="" || address.value ==="" || city.value ==="" || email.value ==="") {
        alert("Veuillez remplir tous les champs du formulaire");
    }
    // Sinon envoyer le formulaire
    else {
        let cart = localCart();
        // Création d'un tableau depuis le Local Storage
        let productsInfo = [];
        for (let products of cart){
            productsInfo.push(products.id);
        }
        // Création d'un objet qui contient les informations du client ainsi que l'id des produits commandé
        let userInfo = {
            contact : {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }, 
            products: productsInfo
        };
        // Envoie de la requête POST avec les informations contacts à l'Api
        fetch("http://localhost:3000/api/products/order", {
            method: "POST", 
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(res){
            return res.json();
        })

        .then(function(data){
            // Redirection vers la page confirmation
            document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        })
        .catch(function(err){
            console.log("Nous avons rencontré un problème, veuillez revenir ultérieurement");
        });
    }
})