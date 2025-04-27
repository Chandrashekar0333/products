async function products() {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    console.log(data);

    let cards = document.getElementById("card-container");

    function displayProducts(filteredProducts) {
      cards.innerHTML = '';
      filteredProducts.forEach(product => {
        let card = document.createElement('div');
        card.className = 'card';

        let img = document.createElement('img');
        img.src = product.thumbnail; 
        img.alt = product.title;
        img.width = 200;
        img.height = 200;
        card.appendChild(img);

        let title = document.createElement('h2');
        title.textContent = product.title;
        card.appendChild(title);

        let description = document.createElement('p');
        description.textContent = product.description;
        card.appendChild(description);

        let price = document.createElement('p');
        price.textContent = `price: ${product.price}`;
        price.id = "price";
        card.appendChild(price);

        let rating = document.createElement('p');
        rating.id = 'rating';
        rating.textContent = `  ${product.rating}`;
        card.appendChild(rating);

        let reviews = document.createElement("span");
        reviews.textContent = ` (${product.stock} reviews)`; 
        card.appendChild(reviews);

        let button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.id = 'add-to-cart';
        card.appendChild(button);

        cards.appendChild(card);
      });
    }

   
    displayProducts(data.products);

    
    let searchInput = document.getElementById('search');
    let searchbtn = document.getElementById("searchbtn");

    searchbtn.addEventListener("click", function () {
      let searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) { 
        let filteredProducts = data.products.filter(product =>
          product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
      } else {
       
        cards.textContent = 'no results found';
      }
    });
  } catch (err) {
    console.log(err); 
  }
}
products();