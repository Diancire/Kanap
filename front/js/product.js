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

function appearProduct(article){
    // Afficher l'image
    let img = document.createElement("img");
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    document.querySelector(".item__img").appendChild(img);

    // Afficher le titre
    document.getElementById("title").innerHTML = article.name;
    
    // Afficher le prix 
    document.getElementById("price").innerHTML = article.price;

    // Afficher la description
    document.getElementById("description").innerHTML = article.description;
    
    // Afficher les couleurs 
    let colors = article.colors;
    for (let color of colors) {
        let optionColor = document.createElement("option");
        document.getElementById("colors").appendChild(optionColor);
        optionColor.value = color;
        optionColor.innerHTML = color;     
    };  
};

recoverApi();

