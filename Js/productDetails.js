document.addEventListener("DOMContentLoaded", async () => {
    async function populateProduct() {
        const queryParams = getQueryParams();
        if(queryParams['id']) {
            const productId = queryParams['id'];
            const product = await fetchProductById(productId); 
            
            const productName = document.getElementById('product-name');
            const productPrice = document.getElementById('product-price');
            const productDescData = document.getElementById('product-desc-data');
            const productImg = document.getElementById('product-img');

            productName.textContent = product.title;
            productDescData.textContent = product.description;
            productImg.src = product.image;
            productPrice.textContent = product.price;

            removeLoader();
        }
    }

    populateProduct();
});