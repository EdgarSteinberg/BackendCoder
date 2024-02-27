const ProducManager = require('./script_desafio2')

const manager = new ProducManager("./products.json")

// const run = async () => {

//     await manager.addProduct({
      
//         title: "Mesa de pool",
//         description: "Mesa de pool profesional",
//         price: 100,
//         thumbnail: "mesaPool.jpg",
//         code: 1234,
//         stock: 5
//     })
//     await manager.addProduct({
    
//         title: "Metegol",
//         description: "Metegol estadio retro",
//         price: 70,
//         thumbnail: "metegol.jpg",
//         code: 12345,
//         stock: 10
//     })
//     await manager.addProduct({
  
//         title: "Metegol2",
//         description: "Metegol estadio retro",
//         price: 70,
//         thumbnail: "metegol.jpg",
//         code: 12345,
//         stock: 10
//     })
// }

// run()



//manager.getProductById(1)

//manager.deleteProduct(2)

manager.updateProduct(
    {
        id: 1,
        title: 'Mesa de pool',
        description: 'Mesa de pool kids',
        price: 10000,
        thumbnail: 'mesaPool.jpg',
        code: 1234,
        stock: 5
    }
)
