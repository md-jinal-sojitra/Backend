//require('dotenv').config()
import Express from "express";
const app = Express();
import { Router } from "express";
import { create } from "ipfs-http-client";
import fs from "fs";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/ipfs");

const port=3000;
let ipfs = create({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});

app.post("/push/:file", async(req, res) => {
  const result = await saveText(req.params.file);
  const object = {
    name: req.params.filename,
    path: process.env.IPFS_BASE + result.path,
    cid: result.cid.toString(),
    size: result.size, 
  };
  res.send(result);
  const data = await postData(object);
  console.log(data)
})

async function saveText(_filename) {
  const buffer = fs.readFileSync("C:\\backendIPFS\\"+_filename);
  let result = await ipfs.add(buffer);
  return result
}

// saveText();

const FileSchema = mongoose.Schema({
  name: String,
  path: { type: String },
  cid: String,
  size: Number,
});

const File = new mongoose.model("File", FileSchema);

//post data to mongodb

const postData = (data) => {
  try {
    const result = File.insertMany(data);
    return result;
  } catch (err) {
    console.log("An error occured... " + err.message);
  }
};

const getAllData = () => {
  const data = File.find();
  return data;
};

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
