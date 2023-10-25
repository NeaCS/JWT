const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  getEventos,
  deleteEvento,
  verificarCredenciales,
  actualizarEvento,
  registrarUsuario
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
    console.log(req.body)
    const { id } = req.params;
    const { lugar } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    await actualizarEvento(lugar, id);
    res.send(`El usuario ${email} actualizado el evento de id ${id} con ${lugar}`);
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
    jwt.verify(token, "az_AZ");
    const { email } = jwt.decode(token);
    await deleteEvento(id);
    res.send(`El usuario ${email} ha eliminado el evento de id ${id}`);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.post("/usuarios", async (req, res) => {
  try {
  const usuario = req.body
  await registrarUsuario(usuario)
  res.send("Usuario creado con éxito")
  } catch (error) {
  res.status(500).send(error)
  }
  })
   


