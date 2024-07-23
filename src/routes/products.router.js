import {Router} from "express"
const router = Router()

let currentId = 1; 

const products = [];


router.post("/", (req, res) => {
    const { nombre, descripción, codigo, precio, status = true, stock, categoria} = req.body;

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
    res.send({ status: "success", message: "Producto creado con éxito" });
})

router.get("/", (req, res) => {
    res.send(products)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const findProduct = products.find(p => p.id === id);

    if (findProduct) {
        res.json(findProduct);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const { nombre, descripción, codigo, precio, status, stock, categoria } = req.body; 

    
    const productsIndex = products.findIndex(p => p.id === parseInt(id));
    if(productsIndex !== -1){
        products[productsIndex].nombre = nombre;
        products[productsIndex].descripción = descripción;
        products[productsIndex].precio = precio;
        products[productsIndex].stock = stock;
        products[productsIndex].categoria = categoria;
        console.log(products);
        res.send({status: "success", message: "Producto actualizado"})
    } else {
        res.status(404).send({status: "error", message: "Producto no encontrado"})
    }
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    const productsIndex = products.findIndex(p => p.id === parseInt(id));
    if(productsIndex !== -1){
        console.log(products);
        products.splice(productsIndex, 1);
        res.send({status: "success", message: "Producto eliminado"})
    } else {
        res.status(404).send({status: "error", message: "Producto no encontrado"})
    }
})


export default router;