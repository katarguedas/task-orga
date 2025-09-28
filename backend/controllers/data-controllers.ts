
const mongoose = require("mongoose");

const Topics = require("../models/topic-model");

import { Request, Response } from "express";


export const getData = async (req: Request, res: Response) => {
  
  await Topics.find({})
    .then((res: Response) => {
      console.log(res.json());
      return res.status(200).json(res);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    })
};



