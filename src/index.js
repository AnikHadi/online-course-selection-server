const app = require("./app");

const port = process.env.PORT || 9001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log("Learning Portal Server is running on port: ", port);
  /* eslint-enable no-console */
});
