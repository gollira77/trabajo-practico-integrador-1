import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./config/database.js"; 

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

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    process.exit(1);
  }
};

startServer();
