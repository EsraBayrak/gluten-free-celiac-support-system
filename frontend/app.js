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
                localStorage.setItem("token", data.token);
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
function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}
const productForm = document.getElementById("productForm");

if (productForm) {
    loadProducts();

    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const editId = localStorage.getItem("editProductId");

        const product = {
            name: document.getElementById("name").value,
            brand: document.getElementById("brand").value,
            category: document.getElementById("category").value,
            glutenStatus: document.getElementById("glutenStatus").value,
            ingredients: document.getElementById("ingredients").value,
            notes: document.getElementById("notes").value
        };

        await fetch(
            `${API_URL}/api/products${editId ? `/${editId}` : ""}`,
            {
                method: editId ? "PUT" : "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(product)
            }
        );

        productForm.reset();

        localStorage.removeItem("editProductId");

        document.querySelector("#productForm button").innerText = "Add Product";

        loadProducts();
    });
}

async function loadProducts() {
    
    const response = await fetch(`${API_URL}/api/products`, {
        headers: getAuthHeaders()
    });
    const products = await response.json();

    const productTable = document.getElementById("productTable");

    if (!productTable) return;

    productTable.innerHTML = "";

    let safeCount = 0;
    let riskyCount = 0;
    

    const searchInput = document.getElementById("searchInput");

let filteredProducts = products;

if (searchInput && searchInput.value.trim() !== "") {

    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.value.toLowerCase())
    );
}

   filteredProducts.forEach(product => {
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
                <td>
                <button onclick='editProduct(${JSON.stringify(product)})'>
                Edit
                </button>
                <button onclick="deleteProduct(${product.id})">
                Delete
                </button>
            </td>
            </tr>
        `;
    });

    document.getElementById("totalProducts").innerText = products.length;
    document.getElementById("safeProducts").innerText = safeCount;
    document.getElementById("riskyProducts").innerText = riskyCount;
    let safePercentage = 0;

if (products.length > 0) {
    safePercentage = Math.round((safeCount / products.length) * 100);
}

document.getElementById("safePercentage").innerText =
    safePercentage + "%";
}
async function deleteProduct(id) {

    await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
});

    loadProducts();
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("user");

        window.location.href = "login.html";
    });
}

const searchInputElement = document.getElementById("searchInput");

if (searchInputElement) {

    searchInputElement.addEventListener("input", () => {
        loadProducts();
    });
}

function editProduct(product) {
    document.getElementById("name").value = product.name;
    document.getElementById("brand").value = product.brand;
    document.getElementById("category").value = product.category;
    document.getElementById("glutenStatus").value = product.glutenStatus;
    document.getElementById("ingredients").value = product.ingredients || "";
    document.getElementById("notes").value = product.notes || "";

    localStorage.setItem("editProductId", product.id);

    document.querySelector("#productForm button").innerText = "Update Product";
}
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        const message = document.getElementById("registerMessage");

        if (response.ok) {
            message.style.color = "green";
            message.innerText = "Registration successful!";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            message.style.color = "red";
            message.innerText = data.message || "Registration failed.";
        }
    });
}