async function products() {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    console.log(data);

    let cards = document.getElementById("card-container");

    function displayProducts(filteredProducts) {
      cards.innerHTML = '';
      filteredProducts.forEach(product => {
        cards.innerHTML+=` <div class="card">
              <img src=${ product.thumbnail} alt=${product.title}>
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <P id="price">${product.price}</P>
              <p id="rating"> ${product.rating}</p>

              <span>(${product.stock} reviews)</span>
              <button id="add-to-cart">Add to Cart</button>
    </div>`

       
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