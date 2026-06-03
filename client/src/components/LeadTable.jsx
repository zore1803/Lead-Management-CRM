import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { LEAD_STATUSES } from "../utils/constants.js";

export default function LeadTable({ leads, onDelete, onStatusChange }) {
  if (leads.length === 0) {
    return <div className="empty-state">No leads found. Add your first lead to get started.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.companyName || "-"}</td>
              <td>
                <select
                  className="status-select"
                  value={lead.status}
                  onChange={(event) => onStatusChange(lead, event.target.value)}
                  aria-label={`Update status for ${lead.name}`}
                >
                  {LEAD_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="row-actions">
                  <Link className="icon-button" to={`/edit/${lead.id}`} title="Edit lead">
                    <Pencil size={17} />
                  </Link>
                  <button className="icon-button danger" onClick={() => onDelete(lead.id)} title="Delete lead">
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
