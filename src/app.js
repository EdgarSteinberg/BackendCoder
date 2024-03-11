
import express from "express";
import rutasProduct from "./router/rutasProduct.js"
import rutasCart from "./router/rutasCart.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/products", rutasProduct);
app.use("/api/cart", rutasCart);

//const PORT = 8080
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})

