import { supabase } from "../config/db.js";
import { normalizeListQuery, toClientLead, toDbLead } from "../utils/queryBuilder.js";

export async function findLeads(query) {
  const options = normalizeListQuery(query);

  let request = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order(options.sortBy, { ascending: options.order === "asc" })
    .range(options.from, options.to);

  if (options.search) {
    request = request.or(
      `name.ilike.%${options.search}%,email.ilike.%${options.search}%,company_name.ilike.%${options.search}%`
    );
  }

  if (options.status) {
    request = request.eq("status", options.status);
  }

  const { data, count, error } = await request;
  if (error) throw new Error(error.message);

  return {
    leads: data.map(toClientLead),
    total: count || 0,
    page: options.page,
    limit: options.limit
  };
}

export async function findLeadById(id) {
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data ? toClientLead(data) : null;
}

export async function createLead(payload) {
  const lead = toDbLead(payload);

  const { data, error } = await supabase.from("leads").insert(lead).select("*").single();
  if (error) {
    const customError = new Error(error.code === "23505" ? "Email already exists" : error.message);
    customError.statusCode = error.code === "23505" ? 409 : 400;
    throw customError;
  }

  return toClientLead(data);
}

export async function updateLead(id, payload) {
  const lead = { ...toDbLead(payload), updated_at: new Date().toISOString() };

  const { data, error } = await supabase.from("leads").update(lead).eq("id", id).select("*").single();
  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data ? toClientLead(data) : null;
}

export async function deleteLead(id) {
  const existing = await findLeadById(id);
  if (!existing) return false;

  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}

export async function getLeadStats() {
  const { data, error } = await supabase.from("leads").select("status");
  if (error) throw new Error(error.message);

  const source = data || [];

  const stats = {
    total: source.length,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0
  };

  source.forEach((lead) => {
    const key = lead.status.toLowerCase();
    if (key in stats) stats[key] += 1;
  });

  return stats;
}
