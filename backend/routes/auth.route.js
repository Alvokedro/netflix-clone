import express from "express"
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protecteRoute.js";

const route = express.Router();

route.post("/signup",signup);
route.post("/login",login);
route.post("/logout",logout);
route.get("/authCheck",protectedRoute,authCheck);

export default route