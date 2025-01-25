//Now i am going to write all my JS logic inside the domContentLoaded event so that all the JS logic runs once the content has been loaded.
document.addEventListener("DOMContentLoaded", async () => {

    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    }

    async function fetchCategories() {
        //This function is marked asnyc therefore it will return a Promise object. 
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }

    const downloadedProducts = await fetchProducts();

    async function fetchProductsByCategory(category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    }
    
    async function populateProducts(flag, customProducts) { //Here we are calling the populate products with paramter as flag and customProduct
        let products = customProducts;

        const queryParam = new URLSearchParams(window.location.search);
        const queryParamObject = Object.fromEntries(queryParam.entries());

        if(!flag) { //If the flag is false then we need to call the normal fetch function for fetching all the products
            if(queryParamObject['category']) {
                products = await fetchProductsByCategory(queryParamObject['category']);
            } else {
                products = downloadedProducts;
            }
        } //If the flag value is true then it means there is some filter options that applied for the products
        products.forEach((product) => {
            const productList = document.getElementById("productList");
            const productItem = document.createElement('a');
            const ProductImage = document.createElement('div');
            const image = document.createElement('img');
            const productName = document.createElement('div');
            const productPrice = document.createElement('div');

            productItem.href = "productDetails.html";
            productItem.target = "_blank";
            image.src = product.image;
            productName.textContent = (product.title.length > 12) ? product.title.substring(0, 12) + '...' : product.title;
            productPrice.textContent = `$ ${product.price}`;

            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
            ProductImage.classList.add("product-img");
            productName.classList.add("product-name", "text-cente");
            productPrice.classList.add("product-price", "text-center");

            productList.appendChild(productItem);
            productItem.appendChild(ProductImage);
            ProductImage.appendChild(image);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

        });
    }

    const filterSearch = document.getElementById('search');
    filterSearch.addEventListener('click', async () => {
        const productList = document.getElementById('productList'); //Before populating the filtered product we need to remove the already present product list.
        const minPrice = Number(document.getElementById('minPrice').value);
        const maxPrice = Number(document.getElementById('maxPrice').value);
        const products = downloadedProducts; //This will do filtering even more faster because now we are fetching the complete products again and again.
        productList.innerHTML = '';
        filterProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        populateProducts(true, filterProducts);
    });

    const clearFilter = document.getElementById('clearFilter');
    clearFilter.addEventListener('click', async () => {
        window.location.reload(); // Refresh the page
    });

    async function populateCategories() {
        const categories = await fetchCategories();
        const categoriesList = document.getElementById('categoryList');
        categories.forEach((category) => {
            const categoryElement = document.createElement('a');
            categoryElement.href = `productList.html?category=${category}`;
            categoryElement.textContent = category;

            categoryElement.classList.add("d-flex", "text-decoration-none");

            categoriesList.appendChild(categoryElement);
        });
    }

    populateCategories();
    populateProducts(false);
});