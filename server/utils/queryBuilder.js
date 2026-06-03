export const allowedStatuses = ["New", "Contacted", "Qualified", "Converted", "Lost"];
export const allowedSortFields = ["name", "status", "created_at"];

export function normalizeListQuery(query) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const search = query.search?.trim() || "";
  const status = allowedStatuses.includes(query.status) ? query.status : "";
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : "created_at";
  const order = query.order === "asc" ? "asc" : "desc";

  return {
    page,
    limit,
    search,
    status,
    sortBy,
    order,
    from: (page - 1) * limit,
    to: page * limit - 1
  };
}

export function toDbLead(payload) {
  return {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company_name: payload.companyName || "",
    status: payload.status || "New",
    notes: payload.notes || ""
  };
}

export function toClientLead(lead) {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.company_name,
    status: lead.status,
    notes: lead.notes,
    createdAt: lead.created_at,
    updatedAt: lead.updated_at
  };
}
