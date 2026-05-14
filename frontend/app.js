const API_URL = "http://localhost:8000";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginMessage = document.getElementById("loginMessage");

        try {

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                loginMessage.style.color = "green";
                loginMessage.innerText = data.message;

                localStorage.setItem("user", JSON.stringify(data.user));

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);

            } else {

                loginMessage.style.color = "red";
                loginMessage.innerText = data.message;
            }

        } catch (error) {

            loginMessage.style.color = "red";
            loginMessage.innerText = "Server connection error.";
        }
    });
}

const productForm = document.getElementById("productForm");

if (productForm) {
    loadProducts();

    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            brand: document.getElementById("brand").value,
            category: document.getElementById("category").value,
            glutenStatus: document.getElementById("glutenStatus").value,
            ingredients: document.getElementById("ingredients").value,
            notes: document.getElementById("notes").value
        };

        await fetch(`${API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        productForm.reset();
        loadProducts();
    });
}

async function loadProducts() {
    const response = await fetch(`${API_URL}/api/products`);
    const products = await response.json();

    const productTable = document.getElementById("productTable");

    if (!productTable) return;

    productTable.innerHTML = "";

    let safeCount = 0;
    let riskyCount = 0;

    products.forEach(product => {
        if (product.glutenStatus === "Safe") safeCount++;
        if (product.glutenStatus === "Risky") riskyCount++;

        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${product.category}</td>
                <td>${product.glutenStatus}</td>
                <td>${product.ingredients || "-"}</td>
                <td>${product.notes || "-"}</td>
            </tr>
        `;
    });

    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("safeProducts").innerText = safeCount;
    document.getElementById("riskyProducts").innerText = riskyCount;
}