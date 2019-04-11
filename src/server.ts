import app from "./app";

/**
 * Start Express server.
 */
const PORT = process.env.PORT || 5000;
app.set("port", PORT);
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
