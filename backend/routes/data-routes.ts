import { Router } from "express";

import { getData } from "../controllers/data-controllers";



const router = Router();

router.get("/", getData);