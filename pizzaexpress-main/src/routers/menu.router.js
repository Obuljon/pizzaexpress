import { Router } from "express";
import {
  menuobjects,
  readfile,
  readobject,
} from "../controllers/menu.controller.js";
import { dataincorrect } from "../controllers/res.controller.js";
let router = new Router();

router.get("/menu/:_item", menuobjects);
router.get("/readobject/:_id", readobject);
router.get("/download/:filename", readfile);
router.get("/dataincorrect", dataincorrect);

export default router;
