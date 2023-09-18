import { asyncHandler } from "../helpers/asyncHandler.js";
import object from "../models/object.model.js";


export const plusobject = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    let session_order = req.session.order;
    const extant = session_order.findIndex(item => item._id == _id)
    if (extant == -1) {
        const { name, price, deskimg, planshetyimg, phoneimg } = await object.findById(_id).catch(() => {
            return res.redirect("/api/dataincorrect");
        })
        session_order.push({ _id, name, price, deskimg, planshetyimg, phoneimg, number: 1 })
        req.session.order = session_order
    } else
        session_order[extant].number += 1

    const obj = req.session
    res.json(obj)
})
export const minusobject = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    let session_order = req.session.order
    const extend = session_order.findIndex(item => item._id == _id);
    if (extend != -1)
        if (session_order[extend].number == 1)
            session_order.splice(extend, 1);
        else {
            session_order[extend].number -= 1;
        }
    req.session.order = session_order;
    const obj = req.session
    res.json(obj)
})