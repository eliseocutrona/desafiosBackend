const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path; // Establece la ruta del archivo donde se almacenarán los productos.
        this.init(); // Llama al método init para inicializar el archivo si no existe.
    }

    init() {
        if (!fs.existsSync(this.path)) { // Verifica si el archivo no existe en la ruta especificada.
            fs.writeFileSync(this.path, JSON.stringify([])); // Si el archivo no existe, crea uno nuevo con un array vacío.
        }
    }

    async readProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8'); // Lee los datos del archivo de productos de forma asíncrona.
        return JSON.parse(data); // Convierte los datos de formato JSON a un objeto JavaScript y los retorna.
    }

    async writeProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); // Escribe los productos actualizados en el archivo, formateando el JSON para mejorar la legibilidad.
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = await this.readProducts(); // Lee los productos actuales del archivo.
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1; // Genera un nuevo ID para el producto, siendo consecutivo al último ID o 1 si la lista está vacía.
        const newProduct = { id, title, description, price, thumbnail, code, stock }; // Crea un nuevo objeto de producto con los datos proporcionados y el nuevo ID.
        products.push(newProduct); // Añade el nuevo producto al array de productos.
        await this.writeProducts(products); // Guarda el array de productos actualizado en el archivo.
        return newProduct; // Retorna el nuevo producto.
    }

    async getProducts() {
        return this.readProducts(); // Retorna todos los productos leyéndolos del archivo.
    }

    async getProductById(id) {
        const products = await this.readProducts(); // Lee todos los productos.
        const product = products.find(prod => prod.id === id); // Busca en el array el producto con el ID especificado.
        if (!product) {
            throw new Error('Product not found'); // Si no encuentra el producto, lanza un error.
        }
        return product; // Retorna el producto encontrado.
    }

    async updateProduct(id, productUpdate) {
        let products = await this.readProducts(); // Lee los productos existentes.
        let productIndex = products.findIndex(prod => prod.id === id); // Encuentra el índice del producto a actualizar.
        if (productIndex === -1) {
            throw new Error('Product not found'); // Si no encuentra el producto, lanza un error.
        }
        products[productIndex] = { ...products[productIndex], ...productUpdate }; // Actualiza el producto con los nuevos valores.
        await this.writeProducts(products); // Guarda los cambios en el archivo.
        return products[productIndex]; // Retorna el producto actualizado.
    }

    async deleteProduct(id) {
        let products = await this.readProducts(); // Lee los productos actuales.
        const initialLength = products.length; // Guarda la longitud original del array.
        products = products.filter(prod => prod.id !== id); // Filtra el array eliminando el producto con el ID dado.
        if (initialLength === products.length) {
            throw new Error('Product not found'); // Si la longitud no cambia, significa que no se encontró el producto, y lanza un error.
        }
        await this.writeProducts(products); // Escribe el array actualizado al archivo.
    }
}

module.exports = ProductManager; // Exporta la clase para que pueda ser utilizada en otros archivos.
