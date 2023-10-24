const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  getEventos,
  deleteEvento,
  verificarCredenciales,
} = require("./consultas");

app.listen(3000, console.log("SERVER ON"));
app.use(cors());
app.use(express.json());

app.get("/eventos", async (req, res) => {
  try {
    const eventos = await getEventos();
    res.json(eventos);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.put("/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recibido:", id);

    const authorization = req.headers["authorization"];
    if (!authorization) {
      throw new Error("Authorization header missing");
    }

    const token = authorization.split("Bearer ")[1];
    console.log("Token recibido:", token);

    // Aquí puedes agregar el código para obtener el payload de un evento a actualizar.
    // Por ejemplo:
    const payload = req.body; // Suponiendo que el payload se envía en el cuerpo de la solicitud.

    // Ahora puedes usar 'payload' para actualizar el evento.

    // Responde con un mensaje de éxito o cualquier otra lógica necesaria.
    res.status(200).send("Evento actualizado exitosamente");
  } catch (error) {
    res.status(error.code || 500).send(error.message);
  }
});

app.delete("/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
