import { Router } from "express";
import { deletcartobjact, minusobject, plusobject, readcart, emptycart } from "../controllers/order.controller.js";
var router = new Router();

router.get("/plus/:_id", plusobject)
// savatga element qo'shadi agar element mavjud bo'lsa unga "number:1" +1 beradi  "number:2" va natijani qaytaradi

router.get("/minus/:_id", minusobject)
// savatdan element mavjud bo'lsa -1 beradi agar 1 ta bo'lsa o'chirib tashlaydi

router.get("/cart", readcart)
// savatchani qaytardi

router.delete("/cartobjdelete/:_id", deletcartobjact)
// savatda elementni butunlay o'chiradi

router.delete("/emptycart", emptycart)
// savatni mutloq bo'shatadi

export default router;

