import express from "express";
import cors from "cors";

// Env
import { config } from "./config";

// Controllers
import { getAvailableCountries, getCountryInfo } from "./controllers";

const app = express();
const port = config.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/countries", getAvailableCountries);
app.get("/api/countries/:countryCode", getCountryInfo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
