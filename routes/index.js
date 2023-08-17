module.exports = app => {
    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const userRoutes = require("./user.routes");
    app.use("/", userRoutes);

    const eventRoutes = require("./event.routes");
    app.use("/", eventRoutes);

    const apiRoutes = require("./api.routes");
    app.use("/api", apiRoutes);

    const mapRoutes = require("./map.routes")
    app.use("/", mapRoutes)

    const characterRoutes = require("./character.routes");
    app.use('/', characterRoutes)
}