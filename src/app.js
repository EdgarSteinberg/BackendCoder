import express from "express";
import rutasProduct from "./router/rutasProduct.js";
import rutasCart from "./router/rutasCart.js";

//Importando Handlebars
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import ProductManager from "./productManager.js"
import viewsRouter from './routes/views.router.js'

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
app.set("views", `${__dirname}/views`);
//app.use(express.static(__dirname+'/public'))

//Rutas carpeta public
app.use("/img", express.static(__dirname + "/../public/img"));
app.use("/css", express.static(__dirname + "/../public/css"));
app.use("/js", express.static(__dirname + "/../public/js"));

app.use("/", viewsRouter);

app.get("/", async (req, res) => {
    let allProduct = await Manager.getProducts();

    res.render("home", {
        products: allProduct, // Pasar la lista de productos al motor de plantillas
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

    // Escuchar evento para crear un producto
    socket.on("nuevoProducto", data => {
        console.log("Recibido nuevo producto: ", data);

        Manager.addProduct(data);
        // Luego, envías una actualización a todos los clientes con el nuevo producto
        socketServer.emit("productoAgregado", data);

    });
    // Escuchar evento para eliminar un producto
    socket.on("eliminarProducto", productId => {
        console.log("Recibida solicitud para eliminar el producto del servidor con ID :", productId);

        Manager.deleteProduct(productId);
        // Emitir un evento 'productoEliminado' a todos los clientes para informarles sobre la eliminación del producto
        socketServer.emit("productoEliminado", productId);
    });

});




