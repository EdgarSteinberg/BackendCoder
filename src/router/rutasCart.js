import { Router } from 'express';
import CartManager from '../cartManager.js';

const CartRouter = Router();
const carts = new CartManager("./src/carts.json");

CartRouter.post("/",async (req, res) => {
    res.send( await carts.addCarts());
})

CartRouter.get("/", async (req, res) =>{
    res.send(await carts.getCarts());
} )


CartRouter.get("/:id", async (req, res) => {
    const cartId = parseInt(req.params.id); // Obtener el ID del carrito de los parámetros de la URL
    const cartsAll = await carts.getCarts(); // Obtener todos los carritos

    // Buscar el carrito con el ID especificado
    const cart = cartsAll.find(cart => cart.id === cartId);

    if (cart) {
        res.send(cart); // Si se encuentra el carrito, enviarlo como respuesta en formato JSON
    } else {
        res.status(404).send("Carrito no encontrado"); // Si no se encuentra el carrito, enviar un mensaje de error
    }
});

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    
        const cartId = req.params.cid;
        const productId = req.params.pid;
        
        res.send(await carts.addProductInCart(cartId, productId));
}) 
//aca tal vez falta crear una variable q contenga let carts = await this.getCarts()

// CartRouter.post("/:cid/products/:pid", async (req, res) => {
//     let cartId = req.params.cid;
//     let productId = req.params.pid;
//     //res.send(await carts.addProductToCart(cartId, productId))
//     const resultMessage = await carts.addProductToCart(cartId, productId);
//     res.send(resultMessage);
// })
export default CartRouter