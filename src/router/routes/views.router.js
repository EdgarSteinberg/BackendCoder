
import { Router } from 'express';
import ProductManager from "../../managers/productManager.js";

const Manager = new ProductManager("./src/producto.json");

const router = Router();

router.get("/realTimeProducts", async (req, res) => {
    let allProduct = await Manager.getProducts();

    res.render("realTimeProduct", { 
        products: allProduct,
        style: "index.css"
    });
});
export default router;