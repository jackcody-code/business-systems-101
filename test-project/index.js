const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello from my first API 👋");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server stopped");
        process.exit(0);
    });
});