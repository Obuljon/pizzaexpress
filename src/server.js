import express from "express";
import { fileURLToPath } from "url";
import path, { join, dirname } from "path";
import { config } from "dotenv";
import { notfound } from "./middleware/notfound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { db } from "./middleware/dbconnect.js";
import { middlewaresession, middleware_cart } from "./middleware/middlewareSession.js";
import menu_router from "./routers/menu.router.js";
import order_router from "./routers/order.router.js"
import moment from "moment";
const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

const app = express();
config({ path: join(__dirname + ".env") });
const PORT = process.env.PORT || 9000;

app.set("port", PORT);

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewaresession);
app.use(middleware_cart);

app.use("/api", menu_router);
app.use("/api", order_router)

app.use(notfound);
app.use(errorHandler);

app.listen(app.get("port"), () => {
	db;
	console.info(`Server is running on PORT: ${app.get("port")}`);
});
