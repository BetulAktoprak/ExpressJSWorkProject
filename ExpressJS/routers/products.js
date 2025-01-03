const express = require("express");
const router = express.Router();

const products = [
    {
        id: 1,
        name: "Toshiba Laptop",
        price: 15000,
        stockAmount: 12,
        category: "Bilgisayar"
    },
    {
        id : 2,
        name : "Dell Laptop",
        price : 14000,
        stockAmount : 10,
        category : "Bilgisayar"
    },
    {
        id : 3,
        name : "Casper Desktop",
        price : 10000,
        stockAmount : 7,
        category : "Bilgisayar"
    },
    {
        id : 4,
        name : "Samsung S20",
        price : 13000,
        stockAmount : 17,
        category : "Cep Telefonu"
    },
    {
        id : 5,
        name : "IPhone 15",
        price : 17000,
        stockAmount : 15,
        category : "Cep Telefonu"
    }
];

router.get("/", (req, res) => {
    res.json(products);
});

router.post("/", (req, res) => {
    const id = products[products.length -1].id + 1;
    products.push({id:id, ...req.body});
    // products.push(req.body);
    res.status(201).json(products);
});

router.put("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    if(productIndex !== -1){
        products[productIndex] = {
            ...products[productIndex], ...req.body
        }
        //res.json(products[productIndex]);
        res.json(products);
    } 
});

router.delete("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    if(productIndex !== -1){
        products.splice(productIndex, 1);
        res.status(200).json(products);
    }
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productId = products.find(product => product.id === id);
    res.json(productId);
})

module.exports = router;
