import { Router } from 'express';
const router = Router();

let currentId = 1;
const products = [];

export default (io) => {
    router.post('/', (req, res) => {
        const { nombre, descripción, codigo, precio, status = true, stock, categoria } = req.body;

        const newProduct = {
            id: currentId++,
            nombre,
            descripción,
            codigo,
            precio,
            status,
            stock,
            categoria
        };

        products.push(newProduct);
        io.emit('newProduct', newProduct); 
        res.send({ status: 'success', message: 'Producto creado con éxito' });
    });

    router.get('/', (req, res) => {
        res.send(products);
    });

    router.get('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const findProduct = products.find(p => p.id === id);

        if (findProduct) {
            res.json(findProduct);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });

    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { nombre, descripción, codigo, precio, status, stock, categoria } = req.body;

        const productIndex = products.findIndex(p => p.id === parseInt(id));
        if (productIndex !== -1) {
            products[productIndex].nombre = nombre;
            products[productIndex].descripción = descripción;
            products[productIndex].precio = precio;
            products[productIndex].stock = stock;
            products[productIndex].categoria = categoria;

            io.emit('updateProduct', products[productIndex]); 
            res.send({ status: 'success', message: 'Producto actualizado' });
        } else {
            res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
    });

    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        const productIndex = products.findIndex(p => p.id === parseInt(id));
        if (productIndex !== -1) {
            const deletedProduct = products.splice(productIndex, 1)[0];
            io.emit('deleteProduct', deletedProduct); 
            res.send({ status: 'success', message: 'Producto eliminado' });
        } else {
            res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
    });

    return router;
};
export { products };
