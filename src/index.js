import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./config/database.js"; 
import "./models/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { adminMiddleware } from "./middlewares/adminMiddleware.js";
import authRoutes from "./routes/auth.js"; 
import userRoutes from "./routes/users.js";
import tagRoutes from "./routes/tags.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.status(200).json({
    estado: "ok",
    mensaje: "Servidor en funcionamiento con base de datos",
  });
});

app.get("/protegido", authMiddleware, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: req.user });
});

app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ mensaje: "Bienvenido administrador", usuario: req.user });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente (tablas listas).");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar/sincronizar la base de datos:", error.message);
    process.exit(1);
  }
};

startServer();
