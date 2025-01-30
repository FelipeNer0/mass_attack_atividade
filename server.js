const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./models/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());

// Função para criar um usuário admin padrão
const createAdminIfNotExists = async () => {
  const admin = await User.findOne({ where: { isAdmin: true } });
  if (!admin) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    await User.create({
      username: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      isAdmin: true,
    });
    console.log("Usuário admin padrão criado.");
  }
};

// Conectar ao banco de dados e verificar/registrar o admin
sequelize.sync().then(async () => {
  console.log("Banco de dados sincronizado");
  await createAdminIfNotExists();  // Verifica e cria o admin, se necessário
});

// Rotas da API
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
