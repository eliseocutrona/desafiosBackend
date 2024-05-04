const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;
const productManager = new ProductManager('./products.json');

app.use(express.json());

// Ruta raíz que da la bienvenida al API
app.get('/', (req, res) => {
    res.send('Welcome to the Product Manager API!');
});

// Define una ruta GET en la dirección '/products'. Esta ruta puede aceptar un query param 'limit'.
app.get('/products', async (req, res) => {
    try {
        // Obtiene todos los productos a través del productManager.
        const products = await productManager.getProducts();
        // Intenta obtener el valor del query param 'limit' y convertirlo a un número entero.
        const limit = parseInt(req.query.limit, 10);
        // Si el limit es un número válido y es mayor a 0, retorna solamente la cantidad limitada de productos.
        if (!isNaN(limit) && limit > 0) {
            return res.json(products.slice(0, limit));
        }
        // Si no hay 'limit', o es inválido, retorna todos los productos.
        res.json(products);
    } catch (error) {
        // Maneja cualquier error durante la obtención de los productos con un estado 500.
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

// Define una ruta GET en la dirección '/products/:id' para obtener un producto por su ID.
app.get('/products/:id', async (req, res) => {
    // Convierte el ID obtenido de los parámetros de la ruta a un entero.
    const id = parseInt(req.params.id, 10);
    // Busca un producto por su ID a través del productManager.
    const product = await productManager.getProductById(id);
    if (product) {
        // Si el producto existe, lo retorna.
        res.json(product);
    } else {
        // Si no existe un producto con ese ID, retorna un error 404.
        res.status(404).json({ error: `Product with ID ${id} does not exist` });
    }
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
