//Now i am going to write all my JS logic inside the domContentLoaded event so that all the JS logic runs once the content has been loaded.
document.addEventListener("DOMContentLoaded", () => {
    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    }

    async function populateProducts() {
        const products = await fetchProducts();
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
            productPrice.textContent = `&#8377; ${product.price}`;

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

    populateProducts();
});