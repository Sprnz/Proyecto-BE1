import { Router } from "express";
const router = Router();

let currentCartId = 1; 
const carts = [];


router.post("/", (req, res) => {
    const newCart = {
        id: currentCartId++,
        products: []
    };

    carts.push(newCart);
    res.send({ status: "success", message: "Carrito creado con éxito"});
});

router.get("/", (req, res) => {
    res.send(carts)
})



router.get("/:cid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});


router.post("/:cid/product/:pid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity = 1 } = req.body;

    const cart = carts.find(c => c.id === cartId);

    if (cart) {
        const existingProduct = cart.products.find(p => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({
                id: productId,
                quantity
            });
        }

        res.send({ status: "success", message: "Producto agregado al carrito" });
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});




export default router;



//http://localhost:8080/api/carts/ --> post y get todos los carritos
//http://localhost:8080/api/carts/1 --> ver carrito según id
//http://localhost:8080/api/carts/1/product/id --> agrega el producto id al carrito 1
