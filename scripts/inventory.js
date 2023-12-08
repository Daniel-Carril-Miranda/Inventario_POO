export class Inventory {
    #products;

    constructor() {
        this.#products = []; 
    }

    // Agrega un producto al inventario
    addProduct(product) {
        this.products.push(product); 

        if (product.name && product.quantity && product.price) {
            const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
            const productJson = JSON.stringify(plainProduct);
            localStorage.setItem(`Producto: ${product.id}`, productJson);
        }

        this.displayInventory(); 
        this.calculateTotalValue();
    }

    // Elimina un producto del inventario
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            localStorage.removeItem(`Producto: ${id}`);
            this.displayInventory();
            this.calculateTotalValue();
        }
    }

    // Edita un producto del inventario
    editProduct(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            const editForm = document.createElement('form');
            editForm.innerHTML = `<div class="update-form">
                <label for="editName">Nombre del producto</label>
                <input type="text" id="editName" value="${product.name}">
                <label for="editQuantity">Cantidad</label>
                <input type="number" id="editQuantity" value="${product.quantity}">
                <label for="editPrice">Precio</label>
                <input type="number" id="editPrice" value="${product.price}">
                <input type="hidden" id="editId" value="${product.id}">
                <button type="submit" class="submit-update">Actualizar producto</button>
                </div>
            `;

            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProduct(
                    document.getElementById('editId').value,
                    document.getElementById('editName').value,
                    document.getElementById('editQuantity').value,
                    document.getElementById('editPrice').value
                );
                editForm.remove(); 
            });
            document.body.appendChild(editForm); 
        }
    }

    // Actualiza un producto del inventario
    updateProduct(id, name, quantity, price) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            product.name = name;
            product.quantity = quantity;
            product.price = price;
            this.displayInventory(); 
            this.calculateTotalValue();
        }

        if (product.name && product.quantity && product.price) {
            const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
            const productJson = JSON.stringify(plainProduct);
            localStorage.setItem(`Producto: ${product.id}`, productJson);
        }
    }

    // Busca un producto en el inventario por nombre
    searchProduct(name) {
        const filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        this.displayInventory(filteredProducts); 
    }

    // Muestra el inventario en la tabla
    displayInventory(products = this.products) {
        const tableBody = document.getElementById('add-rows');
        tableBody.innerHTML = ''; 

        products.forEach(product => {
            const row = document.createElement('tr'); 
           
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td class="button-column">
                    <button class="delete-button">Borrar</button>
                    <button class="edit-button">Editar</button>
                </td>
            `;
            
            row.querySelector('button:nth-child(1)').addEventListener('click', () => this.deleteProduct(product.id));
            row.querySelector('button:nth-child(2)').addEventListener('click', () => this.editProduct(product.id));

            tableBody.appendChild(row); 
        });
    }

    // Calcula el valor total del inventario
    calculateTotalValue() {
        const totalValue = this.products.reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);
        
        document.getElementById('total').textContent = `Valor total del inventario: ${totalValue.toFixed(2)}`;
    }

    // Getter para obtener los productos del inventario
    get products() {
        return this.#products;
    }

    // Setter para establecer los productos del inventario
    set products(products) {
        this.#products = products;
    }
}
