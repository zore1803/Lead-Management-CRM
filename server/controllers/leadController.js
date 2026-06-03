import {
  createLead,
  deleteLead,
  findLeadById,
  findLeads,
  getLeadStats,
  updateLead
} from "../models/leadModel.js";

export async function getAllLeads(req, res, next) {
  try {
    const data = await findLeads(req.query);
    res.json({ success: true, message: "Leads fetched successfully", data });
  } catch (error) {
    next(error);
  }
}

export async function getSingleLead(req, res, next) {
  try {
    const lead = await findLeadById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead fetched successfully", data: lead });
  } catch (error) {
    next(error);
  }
}

export async function addLead(req, res, next) {
  try {
    const lead = await createLead(req.body);
    res.status(201).json({ success: true, message: "Lead created successfully", data: lead });
  } catch (error) {
    next(error);
  }
}

export async function editLead(req, res, next) {
  try {
    const lead = await updateLead(req.params.id, req.body);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead updated successfully", data: lead });
  } catch (error) {
    next(error);
  }
}

export async function removeLead(req, res, next) {
  try {
    const deleted = await deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead deleted successfully", data: null });
  } catch (error) {
    next(error);
  }
}

export async function searchLeads(req, res, next) {
  try {
    const data = await findLeads({ ...req.query, search: req.query.q || "" });
    res.json({ success: true, message: "Search completed successfully", data });
  } catch (error) {
    next(error);
  }
}

export async function leadStats(req, res, next) {
  try {
    const stats = await getLeadStats();
    res.json({ success: true, message: "Lead statistics fetched successfully", data: stats });
  } catch (error) {
    next(error);
  }
}
