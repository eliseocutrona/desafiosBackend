// Importar el módulo fs con promesas para manejar operaciones de archivos.
const fs = require('fs').promises;

// Definir la clase ProductManager.
class ProductManager {
    // Constructor de la clase que toma una ruta de archivo como argumento.
    constructor(path) {
        this.path = path; // Almacenar la ruta del archivo.
        this.init(); // Iniciar la configuración inicial.
    }

    // Método asincrónico para inicializar el archivo de productos si no existe.
    async init() {
        // Verifica si el archivo existe; si no, crea un nuevo archivo con un array vacío.
        if (!await fs.access(this.path).then(() => false).catch(() => true)) {
            await fs.writeFile(this.path, '[]');
        }
    }

    // Método para leer productos desde el archivo.
    async readProducts() {
        const data = await fs.readFile(this.path, 'utf-8'); // Leer datos del archivo.
        return JSON.parse(data); // Convertir los datos de texto a JSON.
    }

    // Método para escribir productos en el archivo.
    async writeProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2)); // Convertir el JSON a texto y escribirlo al archivo.
    }

    // Método para agregar un nuevo producto.
    async addProduct(product) {
        const products = await this.readProducts(); // Leer los productos existentes.
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1; // Asignar un ID al nuevo producto.
        const newProduct = { id, ...product }; // Crear un nuevo objeto de producto.
        products.push(newProduct); // Añadir el nuevo producto al array de productos.
        await this.writeProducts(products); // Guardar los cambios en el archivo.
        return newProduct; // Devolver el nuevo producto.
    }

    // Método para obtener todos los productos.
    async getProducts() {
        return this.readProducts(); // Leer y devolver todos los productos.
    }

    // Método para obtener un producto por su ID.
    async getProductById(id) {
        const products = await this.readProducts(); // Leer todos los productos.
        const product = products.find(prod => prod.id === id); // Encontrar el producto por ID.
        if (!product) throw new Error('Product not found'); // Si no existe, lanzar un error.
        return product; // Devolver el producto encontrado.
    }

    // Método para actualizar un producto.
    async updateProduct(id, productUpdate) {
        const products = await this.readProducts(); // Leer todos los productos.
        const index = products.findIndex(prod => prod.id === id); // Encontrar el índice del producto.
        if (index === -1) throw new Error('Product not found'); // Si no existe, lanzar un error.
        products[index] = { ...products[index], ...productUpdate }; // Actualizar el producto.
        await this.writeProducts(products); // Guardar los cambios en el archivo.
        return products[index]; // Devolver el producto actualizado.
    }

    // Método para eliminar un producto.
    async deleteProduct(id) {
        const products = await this.readProducts(); // Leer todos los productos.
        const newProducts = products.filter(prod => prod.id !== id); // Filtrar el producto a eliminar.
        if (products.length === newProducts.length) throw new Error('Product not found'); // Si no se encuentra, lanzar un error.
        await this.writeProducts(newProducts); // Guardar los cambios en el archivo.
    }
}

// Exportar la clase ProductManager para su uso en otros archivos.
module.exports = ProductManager;
