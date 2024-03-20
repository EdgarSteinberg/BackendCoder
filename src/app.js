import express from "express";
import rutasProduct from "./router/rutasProduct.js";
import rutasCart from "./router/rutasCart.js";

//Importando Handlebars
import handlebars from "express-handlebars";
import __dirname from "./utils/utils/utils.js"
import ProductManager from "./managers/productManager.js"
import viewsRouter from './router/routes/views.router.js'

//Socket io
import { Server } from 'socket.io';

const app = express();

const Manager = new ProductManager("./src/producto.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//No funciona
//app.use(express.static(`${__dirname}/../public`));

app.use("/api/products", rutasProduct);
app.use("/api/cart", rutasCart);

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
//app.set("views", `${__dirname}/views`);
// Retrocede dos niveles para llegar a la carpeta 'src' y luego accede a 'views'
app.set("views", `${__dirname}/../../views`);


//app.use(express.static(__dirname+'/../../../public'))

//Rutas carpeta public
app.use("/img", express.static(__dirname + "/../../../public/img"));
app.use("/css", express.static(__dirname + "/../../../public/css"));
app.use("/js", express.static(__dirname + "/../../../public/js"));

app.use("/", viewsRouter);

app.get("/", async (req, res) => {
    let allProduct = await Manager.getProducts();

    res.render("home.handlebars", {
        products: allProduct, 
        style: "index.css"
    });
});

//Websocket
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado ------>", socket.id);


    socket.on("nuevoProducto", async data => {
        console.log("Recibido nuevo producto: ", data);
    
        const newProduct = await Manager.addProduct(data);
        // Agregar el ID generado al objeto de datos antes de emitir el evento
        const dataWithID = { id: newProduct.id, ...data };
    
        console.log("Producto enviado al cliente: ", dataWithID);
    
        socketServer.emit("productoAgregado", dataWithID);
    });

    // Escuchar evento para eliminar un producto
    socket.on("eliminarProducto", async productId => {
        console.log("Recibida solicitud para eliminar el producto del servidor con ID :", productId);

        await Manager.deleteProduct(productId);
        
        socketServer.emit("productoEliminado", productId);
    });

});




