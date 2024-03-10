import { Router } from 'express';
import ProductManager from "../productManager.js"

const Productrouter = Router();
const Manager = new ProductManager("./src/producto.json");

Productrouter.get("/", async (req, res) => {
    res.send(await Manager.getProducts());
});

Productrouter.post("/", async (req, res) => {
    const response = await Manager.addProduct(req.body);
    res.status(201).send(response);
});

Productrouter.put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await Manager.updateProduct(pid, req.body));
});

Productrouter.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await Manager.deleteProduct(pid));
});
// Obtener un producto específico por su ID

Productrouter.get("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    const productAll = await Manager.getProducts();
    
    const product = productAll.find(prod => prod.id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});
export default Productrouter;

