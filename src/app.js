import express from "express";
const app = express();
const PUERTO = 8080;

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);



app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080")
})