module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);
    //const macro = require("../integration/macro");
    //app.use(macro);
  }
}
