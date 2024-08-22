// Import our custom CSS
import '../scss/menu.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const apiUrl = 'http://localhost:3000';
const options = {
    method: "GET",
    headers: {
        'Content-Type': "application/json"
    }
}

export async function showProducts() {
    const sectionProducts = document.querySelector("#products");

    try {
        const response = await fetch(`${apiUrl}/carta`, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        renderProducts(data);

        // Añadir evento al campo de búsqueda
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => filterProducts(data));

    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
}

function renderProducts(products) {
    const sectionProducts = document.querySelector("#products");
    sectionProducts.innerHTML = '';
    products.forEach(product => {
        const productCard = `
        <div class="card col-md-4" id="card-products">
            <figure class="figure-img">
                <img src="${product.img}" style="width: 200px; height:200px;" class="card-img-top" alt="${product.nombre}">
            </figure>
            <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">$ ${product.precio}</p>
                <a href="#" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${product.id}" data-name="${product.nombre}" data-description="${product.descripcion}" data-price="${product.precio}" data-img="${product.img}">Ver detalles</a>
            </div>
        </div>
        `;
        sectionProducts.innerHTML += productCard;
    });


    // Añadir evento click a los enlaces de Ver detalles
    const detailLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
    detailLinks.forEach(link => {
        link.addEventListener("click", showProductDetails);
    });
}

function filterProducts(products) {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchInput));
    renderProducts(filteredProducts);
}

function showProductDetails(event) {
    const link = event.currentTarget;
    const modalImg = document.getElementById("modal-img");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");

    modalImg.src = link.getAttribute("data-img");
    modalImg.alt = link.getAttribute("data-name");
    modalName.textContent = link.getAttribute("data-name");
    modalDescription.textContent = link.getAttribute("data-description");
    modalPrice.textContent = link.getAttribute("data-price");
}

showProducts();