import express from "express"
import {protectRoute} from "../middleware/protectRoute.js"
import {submitTest } from "../controllers/test.controllers.js";
const router = express.Router();

router.post("/submitTest", submitTest);

export default router;
