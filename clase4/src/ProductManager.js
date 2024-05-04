const fs = require('fs'); // Importa el módulo 'fs' para operaciones de archivos.

class ProductManager {
    // Constructor que inicializa una instancia con una ruta de archivo especificada.
    constructor(path) {
        this.path = path; // Guarda la ruta del archivo en una propiedad de la instancia.
    }

    // Método asíncrono para leer los productos desde el archivo.
    async readProducts() {
        try {
            // Intenta leer el archivo y parsear el JSON a un objeto.
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si hay un error (por ejemplo, el archivo no existe), crea un archivo nuevo con un arreglo vacío.
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return [];
        }
    }

    // Método asíncrono para escribir los datos de los productos en el archivo.
    async writeProducts(data) {
        // Escribe en el archivo formateando el JSON para mejorar la legibilidad.
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    // Método asíncrono para agregar un producto al archivo.
    async addProduct(product) {
        const products = await this.readProducts(); // Lee los productos existentes.
        // Genera un nuevo id para el producto basado en el último producto del arreglo, o 1 si está vacío.
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id, ...product }; // Crea un nuevo producto agregando el id.
        products.push(newProduct); // Agrega el nuevo producto al arreglo.
        await this.writeProducts(products); // Escribe el arreglo actualizado de vuelta al archivo.
        return newProduct; // Retorna el nuevo producto.
    }

    // Método asíncrono para obtener todos los productos.
    async getProducts() {
        return await this.readProducts(); // Retorna el resultado de leer los productos.
    }

    // Método asíncrono para obtener un producto por su ID.
    async getProductById(pid) {
        const products = await this.readProducts(); // Lee los productos existentes.
        // Encuentra y retorna el producto que coincida con el ID proporcionado.
        return products.find(product => product.id === pid);
    }
}

module.exports = ProductManager; // Exporta la clase para que pueda ser utilizada en otros archivos.
