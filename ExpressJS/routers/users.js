const express = require("express");
const router = express.Router();

const users = [
    { id : 1, firstname : "Betül", lastname : "Aktoprak", gender: "female"},
    { id : 2, firstname : "Halil İbrahim", lastname : "Karakuş", gender: "male"},
    { id : 3, firstname : "Hatice Kübra", lastname : "Tosun", gender: "female"},
    { id : 4, firstname : "Hüseyin", lastname : "Çiçek", gender: "male"},
    { id : 5, firstname : "İsa Yasin", lastname : "Kuru", gender: "male"},
    { id : 6, firstname : "Mehmet", lastname : "Albayrak", gender: "male"},
    { id : 7, firstname : "Mehmet Fatih", lastname : "Bezan", gender: "male"},
    { id : 8, firstname : "Melih Can", lastname : "Akgüneş", gender: "male"},
    { id : 9, firstname : "Mert", lastname : "Nazlı", gender: "male"},
    { id : 10, firstname : "Mertcan", lastname : "İncioğulları", gender: "male"},
    { id : 11, firstname : "Mutlu", lastname : "Tayfun", gender: "male"},
    { id : 12, firstname : "Orçun", lastname : "Gökoluk", gender: "male"},
    { id : 13, firstname : "Simay", lastname : "Seyman", gender: "female"},
    { id : 14, firstname : "Zehra", lastname : "Varan", gender: "female"},
    { id : 15, firstname : "Silinecek", lastname : "Silinecek", gender: "male"}
];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    users.push(req.body);
    res.json(users);
});

router.delete("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({message: `Kullanıcı silindi`, users});
    }
    else{
        res.status(404).json({message: `Kullanıcı bulunamadı`});
    }
});

router.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex !== -1){
        users[userIndex] = {
            ...users[userIndex], ...req.body
        };
        res.json(users);
    }
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userId = users.find(user = user.id === id);
    res.json(userId);
})

module.exports = router;