import session from "express-session";
import moment from "moment";
export const middlewaresession = session({
  secret: "qwertyuiop",
  cookie: { maxAge: 1000 * 1800 * 60 },
  saveUninitialized: false,
  resave: false,
});


export const middleware_cart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  res.locals.cart = req.session.cart
  res.locals.moment = moment;
  next()
}