import fs from 'fs';
import ProductManager from './productManager.js';

const productAll = new ProductManager("./src/producto.json");

class CartManager {

    constructor(path) {
        this.path = path;
    }
    
    async getId() {
        const carts = await this.getCarts();

        if (carts.length > 0) {
            return parseInt(carts[carts.length - 1].id + 1);
        }

        return 1;
    }

    async addCarts() {
        const cartsOld = await this.getCarts();
        let id = await this.getId();

        const newCart = {
            id: id,
            products: []
        };
        const cartConcat = [...cartsOld, newCart];

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(cartConcat, null, "\t"));
            return "Carrito Creado Correctamente";

        } catch (e) {
            return (`Error al crear el carrito`, e);
        }
    }

    async getCarts() {
        try {
            let respuesta = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(respuesta);

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    
    
    async addProductInCart(cartId, productId) {
        let carts = await this.getCarts();
        let products = await productAll.getProducts();

        cartId = parseInt(cartId);
        productId = parseInt(productId)

        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return "Carrito no encontrado";

        const product = products.find(prod => prod.id === productId);
        if (!product) return "Producto no encontrado";

        let cartFilter = carts.filter(cart => cart.id != cartId);
        let cartConcat = [{ id: cartId, products: [{ id: product.id, cantidad: 1 }] }, ...cartFilter];

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(cartConcat, null, "\t"));
            return "Producto Agregado Al Carrito";

        } catch (e) {
            return ("Error al crear un producto en el carrito", e);
        }
    }

}






    // async addProductInCart(cartId, productId) {
    //     try {
    //         // Obtener todos los carritos
    //         const carts = await this.getCarts();

    //         // Buscar el carrito con el ID proporcionado
    //         const cartIndex = carts.findIndex(cart => cart.id === cartId);

    //         if (cartIndex === -1) {
    //             throw new Error("Carrito no encontrado");
    //         }

    //         // Obtener el carrito seleccionado
    //         const cart = carts[cartIndex];

    //         // Verificar si el producto ya está en el carrito
    //         const productIndex = cart.products.findIndex(product => product.id === productId);

    //         if (productIndex !== -1) {
    //             // Si el producto ya existe, incrementar la cantidad
    //             cart.products[productIndex].quantity += 1;
    //         } else {
    //             // Si el producto no existe, agregarlo al carrito con cantidad 1
    //             cart.products.push({ id: productId, quantity: 1 });
    //         }

    //         // Actualizar el carrito en la lista de carritos
    //         carts[cartIndex] = cart;

    //         // Escribir la lista de carritos actualizada en el archivo
    //         await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    //         return "Producto Agregado al Carrito";
    //     } catch (error) {
    //         return (`Error al agregar el producto al carrito: ${error.message}`);
    //     }
    //}

    // async deleteCarts(id) {
    //     const productos = await this.getCarts();

    //     //almaceno los productos 
    //     const initLength = productos.length;
    //     // busco por id y creo un array nuevo con los productos q me quedaron 
    //     const productoProccesed = productos.filter(pr => pr.id != id);

    //     const finalLength = productoProccesed.length;

    //     // aca podria mandar un msj cuando no existe nada en {}
    //     try {
    //         // aca comparamos para filtrar
    //         if (initLength == finalLength) {
    //             throw new Error(`No fue posible eliminar el usuario ${id}`);
    //         }
    //         await fs.promises.writeFile(this.path, JSON.stringify(productoProccesed, null, "\t"));

    //         //msj 200 paso todos los filtros
    //         return `El usuario ${id} fue eliminado correctamente`;

    //     } catch (e) {
    //         return e.message;
    //     }

    // }
    // async updateCarts(id, producto) {
    //     const productos = await this.getCarts(); // Usa this.getCarts() en lugar de this.GetAllUsers()

    //     let CartUpdated = {};

    //     for (let key in productos) {
    //         if (productos[key].id == id) {
    //             productos[key].title = producto.title ? producto.title : productos[key].title;
    //             productos[key].description = producto.description ? producto.description : productos[key].description;
    //             productos[key].price = producto.price ? producto.price : productos[key].price;
    //             productos[key].thumbnail = producto.thumbnail ? producto.thumbnail : productos[key].thumbnail;
    //             productos[key].code = producto.code ? producto.code : productos[key].code;
    //             productos[key].stock = producto.stock ? producto.stock : productos[key].stock;

    //             CartUpdated = productos[key];
    //         }
    //     }

    //     const initLength = productos.length;

    //     const productoProccesed = productos.filter(pr => pr.id != id);

    //     const finalLength = productoProccesed.length;

    //     try {
    //         if (initLength == finalLength) {
    //             throw new Error(`Error: No se encontró ningún producto con el ID ${id}`);
    //         }
    //         await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t")); // Usa this.path en lugar de this.file

    //         return productoUpdated;
    //     } catch (e) {
    //         return e.message

    //     }
    // }




export default CartManager;







