const ProductManager = require('./ProductManager');
const productManager = new ProductManager('./products.json');

async function testProductManager() {
    console.log(await productManager.getProducts()); // Debería mostrar inicialmente un array vacío
    await productManager.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    });
    console.log(await productManager.getProducts()); // Debería mostrar el producto añadido
    console.log(await productManager.getProductById(1)); // Debería retornar el producto con id 1
    await productManager.updateProduct(1, { price: 300 }); // Actualizar el precio del producto con id 1
    console.log(await productManager.getProductById(1)); // Debería mostrar el precio actualizado
    
    await productManager.deleteProduct(1); // Elimina el producto con id 1
    console.log(await productManager.getProducts()); // Debería mostrar un array vacío nuevamente
    
}

testProductManager().catch(console.error);
