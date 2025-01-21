function saveContent() {
    const editableElements = document.querySelectorAll("[contenteditable='true']");
    const updates = Array.from(editableElements).map(element => ({
        id: element.id,
        content: element.innerHTML,
    }));

    saveContent(updates).then(response => {
        if (response.success) {
            alert("Contenu sauvegardé !");
        } else {
            alert("Erreur lors de la sauvegarde.");
        }
    });
}

function addUser(event) {
    event.preventDefault();
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const role = document.getElementById("new-role").value;

    // Appel API pour ajouter un utilisateur (exemple)
    fetch("/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert(`Utilisateur ${username} ajouté avec succès.`);
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur.");
        }
    });
}
