const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Administrator, Support} = require ("../models/models")

class AdminController {
    static async loginAdmin(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("Введите email и пароль");
        }
        try {
            const admin = await Administrator.findOne({ where: { email: email } }); // SELECT * FROM ADMINISTRATOR WHERE EMAIL = admin@gmail.com LIMIT 1;
            if (!admin) {
                return res.status(404).json("Admin не найден");
            }
            
            if (password != admin.password) {
                return res.status(400).json("Неверный пароль");
            }
            const token = jwt.sign({ id: admin.id }, "secret_key", { expiresIn: "24h" });
            return res.status(200).json({ token });
        } catch (error) {
            console.error("Error in loginAdmin:", error);
            res.status(500).json({ error: error.message });
        }
    }
    
    static async reloginAdmin(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Вы не авторизованы" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Токен отсутствует" });
        }
        try {
            const payload = jwt.verify(token, "secret_key");
            const newToken = jwt.sign(payload, "secret_key");
            return res.status(200).json({ token: newToken });
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: "Токен недействителен" });
        }
    }
    static async showSupportTicket(req, res) {
        const tickets = await Support.findAll();
        if(tickets) {
            return res.status(200).json(tickets);
        } else (error) => {
            console.error("Error:", error);
            res.status(500).json({ error: error.message });
        }
        return res.status(404).json("Тикеты не найдены");
    }
}

module.exports = AdminController;