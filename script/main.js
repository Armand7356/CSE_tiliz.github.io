
let isAdmin = false;

// Check session on page load
document.addEventListener("DOMContentLoaded", () => {
    checkSession();
});

// Check if the session is active
async function checkSession() {
    const response = await fetch("/api/check-session");
    const data = await response.json();
    if (data.isAdmin) {
        enableEditing();
    } else {
        disableEditing();
    }
}

// Enable editing mode for admins
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

// Disable editing mode for non-admins
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

    const response = await fetch("/api/login", {
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
    const response = await fetch("/api/logout", { method: "POST" });
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

    const response = await fetch("/api/save-content", {
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
