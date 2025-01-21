let isAdmin = false;

// Vérification de la session via l'adresse IP
async function checkIPSession() {
    const response = await fetch("/api/check-ip");
    const data = await response.json();
    if (data.isAdmin) {
        isAdmin = true;
        enableAdminMode();
    } else {
        disableAdminMode();
    }
}

// Activer le mode administrateur
function enableAdminMode() {
    isAdmin = true;
    document.getElementById("login-button").innerText = "Déconnexion";
    document.getElementById("admin-controls").style.display = "block";
    document.querySelectorAll("[contenteditable='true']").forEach(element => {
        element.style.outline = "2px dashed #007BFF";
        element.style.backgroundColor = "#f0f8ff";
    });
}

// Désactiver le mode administrateur
function disableAdminMode() {
    isAdmin = false;
    document.getElementById("login-button").innerText = "Connexion";
    document.getElementById("admin-controls").style.display = "none";
    document.querySelectorAll("[contenteditable='true']").forEach(element => {
        element.style.outline = "none";
        element.style.backgroundColor = "transparent";
    });
}

// Connexion utilisateur
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
        document.getElementById("login-modal").style.display = "none";
        alert("Connexion réussie !");
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Déconnexion utilisateur
async function handleLogout() {
    const response = await fetch("/api/logout", { method: "POST" });
    const data = await response.json();

    if (data.success) {
        disableAdminMode();
        alert("Déconnecté avec succès.");
    }
}

// Sauvegarder les contenus modifiés
function saveContent() {
    const updates = Array.from(document.querySelectorAll("[contenteditable='true']")).map(element => ({
        id: element.id,
        content: element.innerHTML,
    }));

    fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert("Contenu sauvegardé !");
        } else {
            alert("Erreur lors de la sauvegarde.");
        }
    });
}
