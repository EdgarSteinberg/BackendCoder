// import {Router} from 'express';
// import ProductManager from "../productManager.js"

// const Manager = new ProductManager("./src/producto.json");

// const router = Router();

// router.get("/realTimeProducts", async (req, res) => {
//     let allProduct = await Manager.getProducts();
   
//     res.render("home", {   
       
//         products: allProduct, // Pasar la lista de productos al motor de plantillas
//         style: "index.css"
//     });
// });

// export default router

import { Router } from 'express';
import ProductManager from "../productManager.js";

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