import object from "../models/object.model.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { gfs } from "../middleware/dbconnect.js";

export const menuobjects = asyncHandler(async (req, res) => {
  let _item = req.params._item;
  Number(_item);
  const pageSize = 6;
  _item -= 1;
  if (isNaN(_item)) {
    _item = 0;
  }
  const skip = _item * pageSize;
  const totalCount = await object.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const menu = await object.find().skip(skip).limit(pageSize);
  const pagenetion = Array.from({ length: totalPages }, (_, i) => i + 1);
  res.json({ data: menu, pagenetion });
});

export const readobject = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await object.findById(_id).catch(() => {
    return res.redirect("/api/dataincorrect");
  });
  res.json(data);
});

export const readfile = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const data = await gfs.find({ filename: filename }).toArray();
  if (data.length === 0) return res.redirect("/api/dataincorrect");
  const stream = gfs.openDownloadStreamByName(filename);
  stream.pipe(res);
  stream.on("end", () => res.end());
  stream.on("error", (err) => {
    console.error(err);
    res.status(500).end("SERVER_ERROR");
  });
});
