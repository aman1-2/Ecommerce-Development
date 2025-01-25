console.log("Welcome");
async function fetchCategories() {
    //This function is marked asnyc therefore it will return a Promise object. 
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
}

async function populateCategories() {
    const categories = await fetchCategories(); //This will given an array and we have to iterate on our array and populate the DOM.
    const loaderBackdrop = document.getElementById('loader-backdrop');
    loaderBackdrop.style.display = "none";
    const categoryList = document.getElementById("categoryList");
    categories.forEach((category) => {
        const categoryHolder = document.createElement('div');
        const categoryLink = document.createElement('a');
        categoryLink.href = `productList.html?category=${category}`;
        categoryLink.textContent = category; //Setting the category name as the text of the anchor tag.
        categoryHolder.classList.add("category-items", "d-flex", "align-items-center", "justify-content-center");
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);
    });
}

populateCategories();