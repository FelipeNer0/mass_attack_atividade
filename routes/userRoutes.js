const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

// Rota vulnerável (qualquer usuário pode criar admin!)
router.post("/register-vulnerable", authenticate, async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "Usuário registrado!", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota segura (apenas admin pode criar outros admin)
router.post("/register-secure", authenticate, async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (isAdmin && !req.user.isAdmin) {
      return res.status(403).json({ error: "Apenas admins podem criar admins" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, isAdmin: isAdmin || false });
    res.status(201).json({ message: "Usuário registrado com segurança!", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
