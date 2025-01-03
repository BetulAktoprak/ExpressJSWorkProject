const express = require("express");
const router = express.Router();

const categories = [
    {
        id : 1,
        name : "Bilgisayar"
    },
    {
        id : 2,
        name : "Cep Telefonu"
    }
];

router.get("/", (req, res) => {
    res.status(200).json(categories);
});

router.post("/", (req, res) => {
    const id = categories[categories.length - 1].id + 1;
    categories.push({
        id:id, ...req.body
    });
    res.status(201).json(categories);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(category => category.id === id);
    if(index !== -1){
        categories[index] = {
            ...categories[index], ...req.body
        }
        res.status(201).json(categories[index]);
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(category => category.id === id);
    if(index !== -1){
        categories.splice(index, 1);
        res.json(categories);
    }
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoryId = categories.find(category => category.id === id);
    res.json(categoryId);
})

module.exports = router;