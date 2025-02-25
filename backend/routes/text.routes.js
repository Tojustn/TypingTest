import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { postText,getText } from "../controllers/text.controllers.js";
const router = express.Router();

router.get("/getText", getText);
router.post("/postText",protectRoute,postText);
export default router;
