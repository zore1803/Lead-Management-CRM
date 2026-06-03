import { useMemo, useState } from "react";
import { deleteLead, updateLead } from "../api/leadApi.js";
import FilterBar from "../components/FilterBar.jsx";
import LeadCharts from "../components/LeadCharts.jsx";
import LeadTable from "../components/LeadTable.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import StatisticsCards from "../components/StatisticsCards.jsx";
import useLeads from "../hooks/useLeads.js";

const limit = 10;

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const filters = useMemo(
    () => ({ page, limit, search, status, sortBy, order }),
    [page, search, status, sortBy, order]
  );

  const { leads, stats, total, loading, error, refetch } = useLeads(filters);

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;
    await deleteLead(id);
    refetch();
  }

  async function handleStatusChange(lead, statusValue) {
    await updateLead(lead.id, { ...lead, status: statusValue });
    refetch();
  }

  return (
    <div className="stack">
      <section className="page-heading">
        <div>
          <p>CRM Dashboard</p>
          <h1>Lead Management</h1>
        </div>
      </section>

      <StatisticsCards stats={stats} />
      <LeadCharts stats={stats} />

      <section className="toolbar">
        <SearchBar value={search} onChange={changeSearch} />
        <FilterBar
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          order={order}
          onOrderChange={setOrder}
        />
      </section>

      {error && <div className="alert">{error}</div>}
      {loading ? (
        <div className="empty-state">Loading leads...</div>
      ) : (
        <LeadTable leads={leads} onDelete={handleDelete} onStatusChange={handleStatusChange} />
      )}

      <Pagination page={page} limit={limit} total={total} onPageChange={setPage} />
    </div>
  );
}
