import session from "express-session";
import moment from "moment";
export const middlewaresession = session({
  secret: "qwertyuiop",
  cookie: { maxAge: 1000 * 1800 * 60 },
  saveUninitialized: false,
  resave: false,
});


export const middleware_order = (req, res, next) => {
  if (!req.session.order) {
    req.session.order = []
  }
  res.locals.order = req.session.order
  res.locals.moment = moment;
  next()
}