const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Set the port for the server

app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(express.static("public")); // Serve static files from the "public" directory

// Serve index.html on root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Mock database for demonstration
let users = [
    { name: "Alice", email: "alice@example.com", password: "alice123", points: 120 },
    { name: "Bob", email: "bob@example.com", password: "bob123", points: 180 },
    { name: "Charlie", email: "charlie@example.com", password: "charlie123", points: 150 }
];

// Sign-up endpoint
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        return res.status(400).send("Missing name, email, or password.");
    }

    // Save user to mock database
    users.push({ name, email, password, points: 0 });
    res.status(200).send("Sign-up successful!");
});

// Leaderboard endpoint
app.get("/leaderboard", (req, res) => {
    res.json(users);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
    console.log({PORT});
});