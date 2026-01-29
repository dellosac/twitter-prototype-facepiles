const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "build"); // CRA: build, Vite: dist
    app.use(express.static(buildPath));

    // Fallback for React Router
    app.use((req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
} else {
    console.log(
        "Running in development mode. Use npm run dev to start the React dev server.",
    );
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
