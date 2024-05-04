const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;
const productManager = new ProductManager('./products.json');

app.use(express.json());

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
