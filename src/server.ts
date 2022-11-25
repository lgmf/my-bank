import displayRoutes from "express-routemap";

import app from "./app";
import environment from "./config/environment";

const port = environment.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  displayRoutes(app);
});
