
// Simple mock database for demonstration (you should use a backend server in a real-world scenario)
let users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "user123", role: "user" },
];

let currentUser = null;

// Show login modal
function showLoginModal() {
    document.getElementById("login-modal").style.display = "block";
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        alert(`Bienvenue, ${user.username}!`);
        document.getElementById("login-modal").style.display = "none";
        if (user.role === "admin") {
            enableAdminFeatures();
        }
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Enable admin features
function enableAdminFeatures() {
    document.querySelectorAll("[contenteditable='true']").forEach(element => {
        element.style.outline = "2px dashed #007BFF";
        element.style.backgroundColor = "#f0f8ff";
    });

    document.getElementById("admin-controls").style.display = "block";
}

// Save editable content (mock implementation)
function saveContent() {
    const editableElements = document.querySelectorAll("[contenteditable='true']");
    editableElements.forEach(element => {
        console.log(`Saved content: ${element.innerHTML}`);
    });
    alert("Contenu sauvegardé.");
}

// Add a new user (admin only)
function addUser(event) {
    event.preventDefault();
    if (currentUser && currentUser.role === "admin") {
        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        const newRole = document.getElementById("new-role").value;

        users.push({ username: newUsername, password: newPassword, role: newRole });
        alert(`Utilisateur ${newUsername} ajouté avec succès!`);
        document.getElementById("add-user-form").reset();
    } else {
        alert("Vous n'avez pas l'autorisation d'ajouter des utilisateurs.");
    }
}
