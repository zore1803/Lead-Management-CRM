import { LEAD_STATUSES } from "../utils/constants.js";

export default function FilterBar({ status, onStatusChange, sortBy, onSortByChange, order, onOrderChange }) {
  return (
    <div className="filter-bar">
      <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="">All Status</option>
        {LEAD_STATUSES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
        <option value="created_at">Created Date</option>
        <option value="name">Name</option>
        <option value="status">Status</option>
      </select>

      <select value={order} onChange={(event) => onOrderChange(event.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
