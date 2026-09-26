import express from "express";

import bootstrap from "./src/modules/app.controller.js";

const app = express();
const PORT = 3000;
await bootstrap(app, express);

app.listen(PORT, () => console.log(`Saraha App listening on port ${PORT}!`));
