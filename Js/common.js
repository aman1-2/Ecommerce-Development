function getQueryParams() {
    const queryParam = new URLSearchParams(window.location.search);
    const queryParamObject = Object.fromEntries(queryParam.entries());
    return queryParamObject;
}

function removeLoader() {
    const loaderBackdrop = document.getElementById('loader-backdrop');
    loaderBackdrop.style.display = "none";
}

async function fetchProductById(id) {
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return product.data;
}

//Cart logic implementation from here
async function fetchCartById(id) {
    const cart  = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}