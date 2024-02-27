const fs = require("fs")

class ProducManager {

    constructor(patch) {
        this.products = []
        this.patch = patch
    }

    #getId() {

        if (this.products.length == 0) return 1
        return this.products[this.products.length - 1].id + 1
    }

    addProduct = async (producto) => {

        const product = {
            id: this.#getId(),
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.stock
        }

        this.products.push(product)
        await fs.promises.writeFile(this.patch, JSON.stringify(this.products, null, "\t"))
    }

    getProducts = async () => {

        let respuesta = await fs.promises.readFile(this.patch, "utf-8")
        return (JSON.parse(respuesta))
    }

    getProductById = async (productId) => {

        let respuesta = await fs.promises.readFile(this.patch, "utf-8");
        const products = JSON.parse(respuesta);

        const productsFiltrados = products.find(pro => pro.id == productId)
        if (productsFiltrados) {
            console.log(productsFiltrados)
        } else {
            console.error("Not Found 404, Producto no encontrado", productId);
        }

    }

    deleteProduct = async (productId) => {

        let respuesta = await fs.promises.readFile(this.patch, "utf-8");
        const products = JSON.parse(respuesta)

        let filtrarProduct = products.filter(pr => pr.id != productId)
        console.log(filtrarProduct)

        await fs.promises.writeFile(this.patch, JSON.stringify(filtrarProduct))

        console.log("Producto Eliminado")

    }

    updateProduct = async ({ id, ...products }) => {

        await this.deleteProduct(id)
        let respuesta_1 = await fs.promises.readFile(this.patch, "utf-8");
        const productos = JSON.parse(respuesta_1)

        let productModif = [
            { id, ...products },
            ...productos
        ]
       await fs.promises.writeFile(this.patch, JSON.stringify(productModif,null, "\t"))

    }
}


module.exports = ProducManager








