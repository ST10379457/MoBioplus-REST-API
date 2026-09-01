const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "REST API is running"
    });
});

app.get("/test-db", async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT 1 AS result");

        res.json({
            success: true,
            database: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});