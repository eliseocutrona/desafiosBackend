const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async readProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return [];
        }
    }

    async writeProducts(data) {
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async addProduct(product) {
        const products = await this.readProducts();
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id, ...product };
        products.push(newProduct);
        await this.writeProducts(products);
        return newProduct;
    }

    async getProducts() {
        return await this.readProducts();
    }

    async getProductById(pid) {
        const products = await this.readProducts();
        return products.find(product => product.id === pid);
    }
}

module.exports = ProductManager;
