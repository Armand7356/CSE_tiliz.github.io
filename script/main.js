let isAdmin = false;

// Fonction pour afficher le modal de connexion
function showLoginModal() {
    const loginModal = document.getElementById("login-modal");
    if (loginModal) {
        loginModal.style.display = "block";
    } else {
        console.error("Le modal de connexion (login-modal) est introuvable.");
    }
}

// Fonction pour gérer la connexion
function handleLogin(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Veuillez saisir un nom d'utilisateur et un mot de passe.");
        return;
    }

    // Validation simple (ajoutez un backend pour plus de sécurité)
    if (username === "admin" && password === "admin123") {
        isAdmin = true;
        document.getElementById("login-modal").style.display = "none";
        document.getElementById("login-button").innerText = "Déconnexion";
        document.getElementById("admin-controls").style.display = "block";
        alert("Connexion réussie !");
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Fonction pour gérer la déconnexion
function handleLogout() {
    isAdmin = false;
    document.getElementById("login-button").innerText = "Connexion";
    document.getElementById("admin-controls").style.display = "none";
    alert("Déconnecté avec succès.");
}
