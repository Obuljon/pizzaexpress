import { asyncHandler } from "../helpers/asyncHandler.js";
import object from "../models/object.model.js";


export const plusobject = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    let session_cart = req.session.cart;
    const extant = session_cart.findIndex(item => item._id == _id)
    if (extant == -1) {
        const { name, price, deskimg, planshetyimg, phoneimg } = await object.findById(_id).catch(() => {
            return res.redirect("/api/dataincorrect");
        })
        session_cart.push({ _id, name, price, deskimg, planshetyimg, phoneimg, number: 1 })
        req.session.cart = session_cart
    } else
        session_cart[extant].number += 1

    const obj = req.session
    res.json(obj)
})
export const minusobject = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    let session_cart = req.session.cart
    const extend = session_cart.findIndex(item => item._id == _id);
    if (extend != -1)
        if (session_cart[extend].number == 1)
            session_cart.splice(extend, 1);
        else {
            session_cart[extend].number -= 1;
        }
    req.session.cart = session_cart;
    const obj = req.session
    res.json(obj)
})

export const deletcartobjact = asyncHandler((req, res) => {
    const { _id } = req.params;
    let cart = req.session.cart
    const extend = cart.findIndex((item) => item._id == _id);
    if (extend !== -1) {
        cart.splice(extend, 1);
        req.session.cart = cart
    }
    res.json({ cart })
})

export const readcart = asyncHandler((req, res) => {
    res.json({ cart: req.session.cart })
})

export const emptycart = asyncHandler((req, res) => {
    req.session.cart = []
    res.status(201).json({ message: "shopping cart has been emptied" })
})
