// Récupérer les données de l'API

function recoverApi(){
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then (function(data){
        appearItems(data)
    })
    .catch(function(err) {
        console.log("Une erreur est survenue lors de la récupération des données depuis l'API");
    });
}

// Fonction pour insérer chaque produit dans le DOM

function appearItems(products){
    let items = document.getElementById("items");
    for (let product of products) {

        // Insertion de l'élément "a"
        let linkProduct = document.createElement("a");
        linkProduct.setAttribute("href", `./product.html?id=${product._id}`);
        items.appendChild(linkProduct);

        // Insertion de l'élément "article"
        let articleProduct = document.createElement("article");
        linkProduct.appendChild(articleProduct);

        // Insertion de l'élément "img"
        let imgProduct = document.createElement("img");
        imgProduct.src = product.imageUrl;
        imgProduct.alt = product.altTxt;
        articleProduct.appendChild(imgProduct);

        // Insertion de l'élément "h3"
        let nameProduct = document.createElement("h3");
        nameProduct.classList.add("productName");
        nameProduct.innerHTML = product.name;
        articleProduct.appendChild(nameProduct);

        // Insertion de l'élément "p"
        let descriptionProduct = document.createElement("p");
        descriptionProduct.classList.add("productDescription");
        descriptionProduct.textContent = product.description;
        articleProduct.appendChild(descriptionProduct);
    }
}

recoverApi();