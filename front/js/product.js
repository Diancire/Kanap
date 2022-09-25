// Récupérer l'Id du produit dans l'URL

let url = new URL(window.location.href)
let idProduct = url.searchParams.get("id");

// Récupérer les données de l'API via l'Id 

function recoverApi(){
    fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then (function(value){
        appearProduct(value)
    })
    .catch(function(err) {
        console.log("Une erreur est survenue lors de la récupération des données depuis l'API");
    });
}

// Afficher les éléments du produit

function appearProduct(product){
    // Afficher l'image
    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    document.querySelector(".item__img").appendChild(img);

    // Afficher le titre
    document.getElementById("title").innerHTML = product.name;
    
    // Afficher le prix 
    document.getElementById("price").innerHTML = product.price;

    // Afficher la description
    document.getElementById("description").innerHTML = product.description;
    
    // Afficher les couleurs 
    let colors = product.colors;
    for (let color of colors) {
        let optionColor = document.createElement("option");
        document.getElementById("colors").appendChild(optionColor);
        optionColor.value = color;
        optionColor.innerHTML = color;     
    };  
};

recoverApi();

// Création d'un produit au panier 
const cart = document.querySelector("#addToCart");
// Ajout d'un événement click sur l'élément cart
cart.addEventListener('click', function(event){
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    // Création d'une variable pour récupérer les données du produit dans la page produit et les stocker dans le Local Storage
    let optionProduct = {
        id: idProduct,
        color: color,
        quantity: parseInt(quantity),
    };
    addToCart(color, quantity, optionProduct);
})

// Récupération du panier 
function localCart() {
    let toCart = JSON.parse(localStorage.getItem("cart"));
    return toCart;
}

function addToCart(color, quantity, optionProduct) {
    // Vérification des données ajoutée par le client 
    if (color !== "" && quantity >= 0 && quantity <= 100) {
        // Récupération des éléments dans le Local Storage
        let cart = localCart();
        // On verifie si le Local Storage existe
        if (cart !== null) {
            // Vérification du produit dans la panier (même Id et même couleur)
            checkProduct = cart.find(element => element.id === idProduct && element.color === color);
            // Si c'est le cas on ajoute la quantité
            if (checkProduct) {
                let finalQuantity = optionProduct.quantity + checkProduct.quantity;
                checkProduct.quantity = finalQuantity;
                // On enregistre les données dans le Local Storage
                localStorage.setItem("cart", JSON.stringify(cart))
            }
            // Sinon on ajoute un nouveau produit au Local Storage 
            else {
                cart.push(optionProduct);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        // Sinon on crée un tableau vide qu'on crée dans la Local Storage 
        } else {
            cart = [];
            cart.push(optionProduct);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Le produit a été ajouté au panier");
    }

}