import { Router } from "express";
import { generateCategory, generateProposal } from "../controllers/ai.controller";

const router = Router();


router.post("/category", generateCategory);
router.post("/proposal", generateProposal);

export default router;