// Consigna
// Realizar una clase “ProductManager” que gestione un conjunto de productos.

// Aspectos a incluir

// Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
// Cada producto que gestione debe contar con las propiedades:
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

// Aspectos a incluir:

// Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// Al agregarlo, debe crearse con un id autoincrementable
// Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
// Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// En caso de no coincidir ningún id, mostrar en consola un error “Not found”
// Formato del entregable

// Archivo de Javascript listo para ejecutarse desde node.


// Proceso de Testing
// Se creará una instancia de la clase “ProductManager”
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo



class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0; // Variable para controlar el ID autoincrementable
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean proporcionados
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            throw new Error("All fields are required");
        }

        // Validar que el código no esté repetido
        if (this.products.some(product => product.code === code)) {
            throw new Error("Product code must be unique");
        }

        // Crear el producto con un ID autoincrementable
        const newProduct = {
            id: ++this.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar el producto al arreglo
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Not found");
            return null;
        }
        return product;
    }
}

// Test de la implementación
const productManager = new ProductManager();

console.log(productManager.getProducts()); // Debe devolver []

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(productManager.getProducts()); // Debe mostrar el producto agregado

try {
    // Intentar agregar el mismo producto debe lanzar un error
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
} catch (error) {
    console.error(error.message); // Debe mostrar "Product code must be unique"
}

// Test de getProductById
const product = productManager.getProductById(1);
console.log(product); // Debe mostrar el producto con id 1

const missingProduct = productManager.getProductById(2);
console.log(missingProduct); // Debe ser null y mostrar "Not found" en la consola
