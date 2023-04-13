import express  from "express";
import { signIn, signUp } from "../controllers/auth";

const routes = express.Router()
routes.post("/auth/signUp",signUp)
routes.post("/auth/signIn",signIn)

export default routes