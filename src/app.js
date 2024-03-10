
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




// import express from "express";
// import ProductManager from "./productManager.js";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const Manager = new ProductManager("./producto.json");

// app.get("/", async (req, res) => {
//     res.send(await Manager.getProducts());
// });

// app.post("/", async (req, res) => {
//     const response = await Manager.addProduct(req.body);
//     res.status(201).send(response);
// });

// app.put("/:pid", async (req, res) => {
//     const pid = req.params.pid;
//     res.send(await Manager.updateProduct(pid, req.body));
// });

// app.delete("/:pid", async (req, res) => {
//     const pid = req.params.pid;
//     res.send(await Manager.deleteProduct(pid));
// });

// const PORT = 8080;

// app.listen(PORT, () => {
//     console.log(`Servidor activo en http://localhost:${PORT}`);
// });
