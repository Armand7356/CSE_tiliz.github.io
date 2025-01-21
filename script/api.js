// Vérifie la session en cours
async function checkIPSession() {
    const response = await fetch("/api/check-ip");
    return response.json();
}

// Connexion d'un utilisateur
async function login(username, password) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

// Déconnexion d'un utilisateur
async function logout() {
    const response = await fetch("/api/logout", { method: "POST" });
    return response.json();
}

// Sauvegarde des contenus édités
async function saveContent(updates) {
    const response = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
    });
    return response.json();
}
