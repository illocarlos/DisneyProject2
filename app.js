
require("dotenv").config();


require("./db");


const express = require("express");

const { updateLoggedUser } = require('./middlewares/loggedUser.middleware')

const hbs = require("hbs");

const app = express();


require("./config")(app);
require("./config/session.config")(app)

const capitalize = require("./utils/capitalize");
const projectName = "Moovie-character";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use(updateLoggedUser)



const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const apiRoutes = require("./routes/api.routes");
app.use("/api", apiRoutes);

const mapRoutes = require("./routes/map.routes")
app.use("/", mapRoutes)




const characterRoutes = require("./routes/character.routes");
app.use('/', characterRoutes)

const { loggedUser } = require("./middlewares/loggedUser.middleware");






require("./error-handling")(app);

module.exports = app;
