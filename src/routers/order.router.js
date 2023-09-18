import { Router } from "express";
import { minusobject, plusobject } from "../controllers/order.controller.js";
var router = new Router();

router.get("/plus/:_id", plusobject)
router.get("/minus/:_id", minusobject)

export default router;

