import { STATUS_COLORS } from "../utils/constants.js";

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${STATUS_COLORS[status] || ""}`}>{status}</span>;
}
