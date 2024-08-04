const socket = io();

socket.on('newProduct', (product) => {
    const container = document.getElementById('products-container');
    const productCard = document.createElement('div');
    productCard.className = 'card';
    productCard.id = `product-${product.id}`;
    productCard.innerHTML = `
        <p>${product.nombre}</p>
        <p>${product.descripción}</p>
        <p>${product.categoria}</p>
        <p>${product.precio}</p>
        <p>${product.stock}</p>
        <button>Comprar</button>
    `;
    container.appendChild(productCard);
});

socket.on('updateProduct', (product) => {
    const productCard = document.getElementById(`product-${product.id}`);
    if (productCard) {
        productCard.innerHTML = `
            <p>${product.nombre}</p>
            <p>${product.descripción}</p>
            <p>${product.categoria}</p>
            <p>${product.precio}</p>
            <p>${product.stock}</p>
            <button>Comprar</button>
        `;
    }
});

socket.on('deleteProduct', (product) => {
    const productCard = document.getElementById(`product-${product.id}`);
    if (productCard) {
        productCard.remove();
    }
});
