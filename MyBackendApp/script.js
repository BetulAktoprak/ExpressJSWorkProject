const mainContainer = document.querySelector("#mainContainer");

const url = "http://localhost:8080/";

const routers = {
    "Kullanıcılar" : () => getUsers(),
    "Ürünler" : () => getProductsWithCategory(),
    "Müşteriler" : () => getCustomers()
};

document.addEventListener("DOMContentLoaded", () => {
    getUsers();
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.textContent.trim();
        if(routers[page]){
            mainContainer.innerHTML = "";
            routers[page]();
        }
    });
});

const getUsers = async() => {
    try {
        const response = await fetch(url + "users");
    const data = await response.json();
    data.forEach(user => {
        const imagePath = user.gender === "male"
            ? `../32-ExpressJS/images/men${user.id}.jpg`
            : `../32-ExpressJS/images/woman${user.id}.jpg`;
        mainContainer.innerHTML += `
            <div class="card m-3" style="width: 18rem;">
                <img src="${imagePath}" class="card-img-top" alt="User Image">
                <div class="card-body">
                    <h5 class="card-title">${user.firstname} ${user.lastname}</h5>
                </div>
            </div>
        `;
    });
    } catch (error) {
        console.error("Kullanıcılar yüklenirken hata oluştu: ", error);
        mainContainer.innerHTML = "<p>Kullanıcılar yüklenemedi.</p>"
    }
};

const getProductsWithCategory = async() => {
    try {
        const resCategory = await fetch(url + "categories");
        const dataCategory = await resCategory.json();
        const resProduct = await fetch(url + "products");
        const dataProduct = await resProduct.json();

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("col-md-3");
        dataCategory.forEach(category => {
            const categoryCard = document.createElement("div");
            categoryCard.classList.add("card", "m-3");
            categoryCard.innerHTML += `
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${category.name}</li>
                    </ul>
            `;
            categoryContainer.appendChild(categoryCard);
        });

        const productContainer = document.createElement("div");
        productContainer.classList.add("col-md-9");

        const productRow = document.createElement("div");
        productRow.classList.add("row");

        dataProduct.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-4");
            productCard.innerHTML += `
                <div class="card m-3" style="width: 100%;">
                    <div class="card-body">
                    <img class="card-img-top" src="https://picsum.photos/450/300?random=${product.id}" alt="..." />
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${product.id}</li>
                            <li class="list-group-item">Kategori: ${product.category}</li>
                            <li class="list-group-item">Stok: ${product.stockAmount}</li>
                    </ul>
                </div>
            `;
            productRow.appendChild(productCard);
    });
    productContainer.appendChild(productRow);

    mainContainer.appendChild(categoryContainer);
    mainContainer.appendChild(productContainer);
    } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu: ", error);
        mainContainer.innerHTML = "<p>ürünler yüklenemedi</p>";
    }
};

const getCustomers = async() => {
    try {
        const res = await fetch(url + "customers");
        const data = await res.json();
        data.forEach(customer => {
            mainContainer.innerHTML += `
                <div class="card m-3" style="width: 18rem;">
                    <img class="card-img-top" src="https://picsum.photos/450/300?random=${customer.id}" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${customer.firstName} ${customer.lastName}</h5>
                        <p class="card-text">${customer.city} / ${customer.town}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${customer.email}</li>
                        <li class="list-group-item">${customer.phone}</li>
                        <li class="list-group-item">${customer.balance}</li>
                    </ul>
                </div>
            `
        })
    } catch (error) {
        console.error("Hata oluştu: ", error);
        mainContainer.innerHTML = "<p>Müşteri sayfası yüklenemedi</p>";
    }
}