let isAdmin = false;

async function checkIPSession() {
    const response = await fetch("/api/check-ip");
    const data = await response.json();
    isAdmin = data.isAdmin;

    if (isAdmin) {
        enableAdminMode();
    } else {
        disableAdminMode();
    }
}

function enableAdminMode() {
    isAdmin = true;
    document.getElementById("login-button").innerText = "Déconnexion";
    document.getElementById("admin-controls").style.display = "block";
}

function disableAdminMode() {
    isAdmin = false;
    document.getElementById("login-button").innerText = "Connexion";
    document.getElementById("admin-controls").style.display = "none";
}

function showLoginModal() {
    document.getElementById("login-modal").style.display = "block";
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
        enableAdminMode();
        alert("Connexion réussie.");
    } else {
        alert("Échec de la connexion.");
    }
}

async function handleLogout() {
    const response = await fetch("/api/logout", { method: "POST" });
    const data = await response.json();

    if (data.success) {
        disableAdminMode();
        alert("Déconnecté avec succès.");
    }
}
