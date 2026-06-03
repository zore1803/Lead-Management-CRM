import express from "express";
import {
  addLead,
  editLead,
  getAllLeads,
  getSingleLead,
  leadStats,
  removeLead,
  searchLeads
} from "../controllers/leadController.js";
import { leadValidationRules, validateRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", getAllLeads);
router.get("/stats", leadStats);
router.get("/search", searchLeads);
router.get("/:id", getSingleLead);
router.post("/", leadValidationRules, validateRequest, addLead);
router.put("/:id", leadValidationRules, validateRequest, editLead);
router.delete("/:id", removeLead);

export default router;
