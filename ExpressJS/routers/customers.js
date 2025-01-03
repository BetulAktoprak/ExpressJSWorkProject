const express = require("express");
const router = express.Router();

const customers = [
    {
        id: 1,
        firstName: "Ahmet",
        lastName: "Efendi",
        email: "ahmet.blabla@example.com",
        city: "İstanbul",
        town: "Kadıköy",
        phone: "+90 555 555 55 55",
        balance: 1250.75
    },
    {
        id: 2,
        firstName: "Ayşe",
        lastName: "Hanım",
        email: "ayse.blabla@example.com",
        city: "Ankara",
        town: "Çankaya",
        phone: "+90 555 555 55 55",
        balance: 850.50
    },
    {
        id: 3,
        firstName: "Mehmet",
        lastName: "Efendi",
        email: "mehmet.blabla@example.com",
        city: "İzmir",
        town: "Bornova",
        phone: "+90 555 555 55 55",
        balance: 1500.00
    },
    {
        id: 4,
        firstName: "Elif",
        lastName: "Hanım",
        email: "elif.blabla@example.com",
        city: "Bursa",
        town: "Nilüfer",
        phone: "+90 555 555 55 55",
        balance: 950.25
    },
    {
        id: 5,
        firstName: "Fatma",
        lastName: "Hanım",
        email: "fatma.blabla@example.com",
        city: "Antalya",
        town: "Muratpaşa",
        phone: "+90 555 555 55 55",
        balance: 1100.00
    }
];

router.get("/", (req, res) => {
    res.json(customers);
});

router.post("/", (req, res) => {
    customers.push(req.body);
    res.json(customers);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(customer => customer.id === id);
    if(customerIndex !== -1){
        customers[customerIndex] = {
            ...customers[customerIndex], ...req.body
        };
        res.json(customers);
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(customer => customer.id == id);
    if(customerIndex !== -1){
        customers.splice(customerIndex, 1);
        
    }
    res.json(customers);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customerId = customers.find(customer => customer.id === id);
    res.json(customerId);
});

module.exports = router;