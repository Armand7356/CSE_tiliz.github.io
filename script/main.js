
let isAdmin = false;

// Check session on page load
document.addEventListener("DOMContentLoaded", () => {
    checkSession();
});


// Vérifier la session
async function checkSession() {
    try {
        const response = await simulateAPI("/api/check-session");
        const data = await response.json();
        if (data.isAdmin) {
            enableEditing();
        } else {
            disableEditing();
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);
    }
}

// Activer le mode édition
function enableEditing() {
    isAdmin = true;
    document.getElementById("login-button").innerText = "Déconnexion";
    document.getElementById("save-button").style.display = "inline-block";
    document.querySelectorAll("[data-editable]").forEach(el => {
        el.setAttribute("contenteditable", "true");
        el.style.border = "1px dashed #007BFF";
        el.style.backgroundColor = "#f9f9f9";
    });
}

// Désactiver le mode édition
function disableEditing() {
    isAdmin = false;
    document.getElementById("login-button").innerText = "Connexion";
    document.getElementById("save-button").style.display = "none";
    document.querySelectorAll("[data-editable]").forEach(el => {
        el.removeAttribute("contenteditable");
        el.style.border = "none";
        el.style.backgroundColor = "transparent";
    });
}



// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await simulateAPI("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (data.success) {
        enableEditing();
        document.getElementById("login-modal").style.display = "none";
        alert("Connexion réussie !");
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Handle logout
async function handleLogout() {
    const response = await simulateAPI("/api/logout", { method: "POST" });
    const data = await response.json();

    if (data.success) {
        disableEditing();
        alert("Déconnecté avec succès.");
    }
}

// Save content
async function saveContent() {
    const updates = Array.from(document.querySelectorAll("[data-editable]")).map(el => ({
        id: el.id,
        content: el.innerHTML
    }));

    const response = await simulateAPI("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
    });

    if (response.ok) {
        alert("Contenu sauvegardé avec succès !");
    } else {
        alert("Erreur lors de la sauvegarde.");
    }
}

// Simuler les appels API
async function simulateAPI(url, options) {
    if (url === "/api/check-session") {
        return { json: async () => ({ isAdmin: isAdmin }) };
    }
    if (url === "/api/login") {
        const body = JSON.parse(options.body);
        if (body.username === "admin" && body.password === "admin123") {
            isAdmin = true;
            return { json: async () => ({ success: true }) };
        } else {
            return { json: async () => ({ success: false }) };
        }
    }
    if (url === "/api/logout") {
        isAdmin = false;
        return { json: async () => ({ success: true }) };
    }
}

// Afficher le modal de connexion
function showLoginModal() {
    const modal = document.getElementById("login-modal");
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error("Le modal de connexion n'a pas été trouvé.");
    }
}
