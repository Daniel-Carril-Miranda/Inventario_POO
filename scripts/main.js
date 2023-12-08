// Author: Daniel Carril Miradna (Student)
// GitHub: 

import { Product } from './product.js';
import { Inventory } from './inventory.js';
import { storeProducts } from './localStorage.js';


const inventory = new Inventory();

function getRandomQuantity() {
    return Math.floor(Math.random() * 20) + 1;
};

let defaultProducts = [
    new Product(1, "Martillo", getRandomQuantity(), 10.99),
    new Product(2, "Destornillador", getRandomQuantity(), 3.99),
    new Product(3, "Taladro", getRandomQuantity(), 39.99),
    new Product(4, "Llave inglesa", getRandomQuantity(), 12.99),
    new Product(5, "Sierra", getRandomQuantity(), 19.99),
    new Product(6, "Clavos", getRandomQuantity(), 2.99),
    new Product(7, "Tornillos", getRandomQuantity(), 1.99),
    new Product(8, "Madera", getRandomQuantity(), 10.99),
    new Product(9, "Cemento", getRandomQuantity(), 39.99),
    new Product(10, "Azulejos", getRandomQuantity(), 29.99),
    new Product(11, "Pintura", getRandomQuantity(), 19.99),
    new Product(12, "Cerámica", getRandomQuantity(), 29.99),
    new Product(13, "Vidrio", getRandomQuantity(), 19.99),
    new Product(14, "Puertas", getRandomQuantity(), 99.99),
    new Product(15, "Ventanas", getRandomQuantity(), 79.99),
    new Product(16, "Iluminación", getRandomQuantity(), 29.99),
    new Product(17, "Herramientas eléctricas", getRandomQuantity(), 39.99),
    new Product(18, "Equipo de seguridad", getRandomQuantity(), 19.99),
    new Product(19, "Materiales de construcción", getRandomQuantity(), 19.99),
    new Product(20, "Herramientas manuales", getRandomQuantity(), 29.99),
    new Product(21, "Materiales de decoración", getRandomQuantity(), 19.99),
    new Product(22, "Materiales de jardinería", getRandomQuantity(), 19.99),
    new Product(23, "Materiales de bricolaje", getRandomQuantity(), 19.99),
    new Product(24, "Materiales de fontanería", getRandomQuantity(), 19.99),
    new Product(25, "Materiales eléctricos", getRandomQuantity(), 19.99),
];


defaultProducts.forEach(product => inventory.addProduct(product));

storeProducts(defaultProducts);


const addForm = document.getElementById('form-add');

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('stockInput').value;
    const price = document.getElementById('priceInput').value;
    const id = Date.now(); 
    const product = new Product(id, name, quantity, price);
    
    inventory.addProduct(product);
    this.reset(); 
});


const editForm = document.getElementById('form-edit');

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('stockInput').value;
    const price = document.getElementById('priceInput').value;
    const id = document.getElementById('editId').value;

    
    inventory.updateProduct(id, name, quantity, price);
    this.reset();
});


const searchInput = document.getElementById('product-search');

searchInput.addEventListener('input', function(e) {
    const searchValue = e.target.value; 
    inventory.searchProduct(searchValue);
});

