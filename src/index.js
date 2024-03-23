import dotenv from "dotenv";
import colors from "colors";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        colors.yellow.underline(`\nserver listening on PORT: ${PORT}`)
      );
    });
  })
  .catch((err) => {
    console.error(colors.red(`MONGODB connection failed!!! : ${err.message}`));
  });
