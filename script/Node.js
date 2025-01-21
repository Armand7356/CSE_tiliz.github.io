const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let activeSessions = {}; // { IP: { role: 'admin', lastActive: timestamp } }

// Vérifier la session via l'adresse IP
app.get("/api/check-ip", (req, res) => {
    const ip = req.ip;
    const session = activeSessions[ip];
    if (session && Date.now() - session.lastActive < 30 * 60 * 1000) {
        session.lastActive = Date.now(); // Mise à jour de l'horodatage
        res.json({ isAdmin: session.role === "admin" });
    } else {
        delete activeSessions[ip]; // Expire la session
        res.json({ isAdmin: false });
    }
});

// Connexion utilisateur
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        activeSessions[req.ip] = { role: "admin", lastActive: Date.now() };
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Déconnexion utilisateur
app.post("/api/logout", (req, res) => {
    delete activeSessions[req.ip];
    res.json({ success: true });
});

// Sauvegarder le contenu
app.post("/api/save-content", (req, res) => {
    const updates = req.body.updates;

    updates.forEach(update => {
        console.log(`ID: ${update.id}, Content: ${update.content}`);
    });

    res.json({ success: true });
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
