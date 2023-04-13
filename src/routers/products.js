import express  from "express";
import { create, get, getAll, remove, update } from "../controllers/products";
import { checkPermission } from "../middleware/checkPermission";

const routes = express.Router()
routes.get("/products",getAll)
routes.get("/products/:id",get)
routes.post("/products",checkPermission,create)
routes.patch("/products/:id",checkPermission,update)
routes.delete("/products/:id",checkPermission,remove)


export default routes