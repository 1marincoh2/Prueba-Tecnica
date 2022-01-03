const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const app = require("express")();

const db = jsonServer.router("db.json");

app.use(bodyParser.json());
app.use("/server", jsonServer.defaults(), db);

app.get("/getJSON", (req: any, res: any) => {
  const consulta = db.db.get("usuario").find({ user: "si" }).value();
  if (consulta) {
    console.log("si existo");
  } else {
    console.log("esto es un error");
  }
  res.json({ data: "data", consulta });
});

app.get("/users", (req: any, res: any) => {
  const usuarios = db.db.get("usuario");
  res.json({ data: "data", usuarios });
});

app.get("/reportes", (req: any, res: any) => {
  const reportes = db.db.get("reportes");
  res.json({ data: "data", reportes });
});
app.post("/auth/login", (req: any, res: any) => {
  const data = req.body;

  const consulta = db.db
    .get("usuario")
    .find({
      email: data.email,
      password: data.password,
      // id: data.id,
      //name: data.name,
      //lastName: data.lastName,
      //  rol: data.rol,
    })
    .value();

  if (consulta) {
    res.status(200);
    res.send({
      data: req.body,
      isloggin: true,
    });
  } else {
    res.status(401);
    res.json({ isloggin: false });
  }
});

module.exports = app;
