const express = require("express");
const routers = require("./routers");
const cors = require("cors")
const {accessControl, denemeMiddleware} = require("./middleware");

const app = express();

const port = 8080;

app.use(cors());
app.use(accessControl);
app.use(denemeMiddleware);

app.use(express.json());
app.use("/", routers);


app.listen(port, () => {
    console.log(`Server ${port} port üzerinden yayında`);
});