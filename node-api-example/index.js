const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// In-memory data store
let products = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Smartphone', price: 400 }
];

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helper function to find product by ID
const findProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

// GET /products (Read all Products)
app.get('/products', (req, res) => {
    res.json(products);
});

// GET /products/:id (Read a specific product)
app.get('/products/:id', (req, res) => {
    const product = findProductById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' }); 
    }
    res.json(product);
});

// POST /products (Create a product)
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1, 
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct); // 201 Created
});

// PUT /products/:id (Update a product)
app.put('/products/:id', (req, res) => {
    const product = findProductById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' }); 
    }

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

// DELETE /products/:id (Delete a product)
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' }); 
    }

    products.splice(productIndex, 1);
    res.status(204).send(); // 204 No Content 
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
